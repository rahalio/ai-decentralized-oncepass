import { useEffect, useState } from 'react';
import { api, type DataEnvelope, type ListEnvelope } from '../lib/api';

type ExportJob = {
  id: string;
  status: string;
  downloadUrl?: string;
  pdNeverOnLedgerAttestation: boolean;
};

type Metrics = {
  grants: number;
  accessCompleted: number;
  amlDecided: number;
  onboarded: number;
  abandonCount: number;
  costPerReuseEstimate?: number;
};

export function AuditMetricsPage() {
  const [jobs, setJobs] = useState<ExportJob[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const [ex, m] = await Promise.all([
      api<ListEnvelope<ExportJob>>('/v1/audit-exports'),
      api<DataEnvelope<Metrics>>('/v1/reuse-metrics'),
    ]);
    setJobs(ex.data.items);
    setMetrics(m.data);
  }

  useEffect(() => {
    void load().catch((e) => setError(String(e.message || e)));
  }, []);

  async function requestExport() {
    await api('/v1/audit-exports', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    await load();
  }

  return (
    <div>
      <h1 className="page-title">Audit exports & reuse metrics</h1>
      <p className="page-sub">Lawful-basis artefacts within one business day; funnel excludes abandoned flows.</p>
      {error && <div className="banner coral">{error}</div>}
      <div className="tracks" style={{ marginBottom: '1rem' }}>
        <div className="track">
          <h3>Grants</h3>
          <p>{metrics?.grants ?? 0}</p>
        </div>
        <div className="track">
          <h3>Access completed</h3>
          <p>{metrics?.accessCompleted ?? 0}</p>
        </div>
        <div className="track">
          <h3>AML decided</h3>
          <p>{metrics?.amlDecided ?? 0}</p>
        </div>
        <div className="track">
          <h3>Onboarded</h3>
          <p>{metrics?.onboarded ?? 0}</p>
        </div>
        <div className="track">
          <h3>Abandoned</h3>
          <p>{metrics?.abandonCount ?? 0}</p>
        </div>
      </div>
      <div className="panel">
        <button type="button" onClick={() => void requestExport()}>
          Request audit export
        </button>
      </div>
      <div className="panel">
        {jobs.map((j) => (
          <div key={j.id} className="row">
            <div className="mono">{j.id}</div>
            <span className={`chip ${j.status === 'ready' ? 'ready' : 'pending'}`}>{j.status}</span>
            <span className="chip mint">
              {j.pdNeverOnLedgerAttestation ? 'PD-never-on-ledger attestation' : 'missing attestation'}
            </span>
            <div>
              {j.downloadUrl && (
                <a href={j.downloadUrl} onClick={(e) => e.preventDefault()}>
                  Download pack
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

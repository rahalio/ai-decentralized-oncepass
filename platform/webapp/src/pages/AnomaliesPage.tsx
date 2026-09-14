import { useEffect, useState } from 'react';
import { api, type ListEnvelope } from '../lib/api';

type Anomaly = {
  id: string;
  participantId: string;
  severity: string;
  status: string;
  summary: string;
  accessVolume?: number;
};

export function AnomaliesPage() {
  const [items, setItems] = useState<Anomaly[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await api<ListEnvelope<Anomaly>>('/v1/anomaly-alerts');
    setItems(res.data.items);
  }

  useEffect(() => {
    void load().catch((e) => setError(String(e.message || e)));
  }, []);

  async function clear(id: string) {
    await api(`/v1/anomaly-alerts/${id}/clear`, {
      method: 'POST',
      body: JSON.stringify({ reason: 'False positive — batch job' }),
    });
    await load();
  }

  async function suspend(participantId: string) {
    await api(`/v1/participants/${participantId}/suspend`, {
      method: 'POST',
      body: JSON.stringify({ reason: 'Breach containment', notifyDpo: true }),
    });
    await load();
  }

  return (
    <div>
      <h1 className="page-title">Anomaly alerts</h1>
      <p className="page-sub">Contain abnormal relying-party access and fire breach notification hooks.</p>
      {error && <div className="banner coral">{error}</div>}
      {items.length === 0 && <div className="banner mint">Healthy network — no open anomalies.</div>}
      <div className="panel">
        {items.map((a) => (
          <div key={a.id} className="row">
            <div>
              <strong>{a.summary}</strong>
              <div className="muted">volume {a.accessVolume ?? 0}</div>
              <div className="mono muted">{a.id}</div>
            </div>
            <span className={`chip ${a.severity === 'high' || a.severity === 'critical' ? 'denied' : 'active'}`}>
              {a.severity}
            </span>
            <span className={`chip ${a.status}`}>{a.status}</span>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {a.status === 'open' && (
                <>
                  <button className="danger" type="button" onClick={() => void suspend(a.participantId)}>
                    Suspend participant
                  </button>
                  <button className="secondary" type="button" onClick={() => void clear(a.id)}>
                    Clear false positive
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

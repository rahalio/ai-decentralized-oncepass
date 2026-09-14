import { useEffect, useState } from 'react';
import { api, type DataEnvelope, type ListEnvelope } from '../lib/api';

type Vault = {
  id: string;
  institutionId: string;
  subjectRef: string;
  completeness: string;
  attributeCount?: number;
};

export function VaultsPage() {
  const [items, setItems] = useState<Vault[]>([]);
  const [institutionId, setInstitutionId] = useState('home-bank-1');
  const [subjectRef, setSubjectRef] = useState('subj_demo_002');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await api<ListEnvelope<Vault>>('/v1/vaults');
    setItems(res.data.items);
  }

  useEffect(() => {
    void load().catch((e) => setError(String(e.message || e)));
  }, []);

  async function register() {
    await api<DataEnvelope<Vault>>('/v1/vaults', {
      method: 'POST',
      body: JSON.stringify({ institutionId, subjectRef }),
    });
    await load();
  }

  async function refresh(id: string) {
    await api(`/v1/vaults/${id}`, { method: 'PATCH', body: '{}' });
    await load();
  }

  return (
    <div>
      <h1 className="page-title">Home vaults</h1>
      <p className="page-sub">Institution-held identity attributes stay off-chain as the reuse source of truth.</p>
      {error && <div className="banner coral">{error}</div>}
      <div className="panel">
        <div className="form-grid">
          <label>
            Institution id
            <input value={institutionId} onChange={(e) => setInstitutionId(e.target.value)} />
          </label>
          <label>
            Subject ref (opaque)
            <input value={subjectRef} onChange={(e) => setSubjectRef(e.target.value)} />
          </label>
        </div>
        <button type="button" onClick={() => void register()}>
          Register vault
        </button>
      </div>
      <div className="panel">
        {items.map((v) => (
          <div key={v.id} className="row">
            <div>
              <strong className="mono">{v.subjectRef}</strong>
              <div className="muted">{v.institutionId}</div>
              <div className="mono muted">{v.id}</div>
            </div>
            <span className={`chip ${v.completeness === 'ready' ? 'ready' : 'pending'}`}>{v.completeness}</span>
            <div className="muted">{v.attributeCount ?? 0} attributes (no PD)</div>
            <button className="secondary" type="button" onClick={() => void refresh(v.id)}>
              Refresh completeness
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

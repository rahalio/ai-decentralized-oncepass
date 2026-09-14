import { useEffect, useState } from 'react';
import { api, type ListEnvelope } from '../lib/api';

type Access = {
  id: string;
  grantId: string;
  status: string;
  denyReason?: string;
  payloadRef?: string;
  amlOutcome?: string;
};

type Grant = { id: string; status: string; purpose: string };

export function AccessPage() {
  const [items, setItems] = useState<Access[]>([]);
  const [grants, setGrants] = useState<Grant[]>([]);
  const [grantId, setGrantId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  async function load() {
    const [acc, cns] = await Promise.all([
      api<ListEnvelope<Access>>('/v1/access-requests'),
      api<ListEnvelope<Grant>>('/v1/consents'),
    ]);
    setItems(acc.data.items);
    const active = cns.data.items.filter((g) => g.status === 'active');
    setGrants(active);
    if (!grantId && active[0]) setGrantId(active[0].id);
  }

  useEffect(() => {
    void load().catch((e) => setError(String(e.message || e)));
  }, []);

  async function requestAccess() {
    try {
      const res = await api<{ data: Access }>('/v1/access-requests', {
        method: 'POST',
        body: JSON.stringify({ grantId, purpose: 'onboarding' }),
      });
      if (res.data.status === 'denied') {
        setBanner(`Access denied (${res.data.denyReason}) — no document images leaked.`);
      } else {
        setBanner(null);
      }
      setError(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  async function aml(id: string, outcome: string) {
    await api(`/v1/access-requests/${id}/aml-decision`, {
      method: 'POST',
      body: JSON.stringify({ outcome, notes: 'Local MLRO judgment' }),
    });
    await load();
  }

  return (
    <div>
      <h1 className="page-title">Relying access queue</h1>
      <p className="page-sub">Pull verification evidence only under an active, purpose-matching grant.</p>
      {banner && <div className="banner coral">{banner}</div>}
      {error && <div className="banner coral">{error}</div>}
      <div className="panel">
        <div className="form-grid">
          <label>
            Active grant
            <select value={grantId} onChange={(e) => setGrantId(e.target.value)}>
              {grants.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.purpose} ({g.id})
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="button" onClick={() => void requestAccess()} disabled={!grantId}>
          Request access
        </button>
      </div>
      <div className="panel">
        {items.map((a) => (
          <div key={a.id} className="row">
            <div>
              <div className="mono">{a.id}</div>
              <div className="muted mono">grant {a.grantId}</div>
              {a.payloadRef && <div className="mono">payload {a.payloadRef}</div>}
              {!a.payloadRef && a.status === 'denied' && (
                <div className="muted">No payload — BR-9 no image leak</div>
              )}
            </div>
            <span className={`chip ${a.status}`}>{a.status}</span>
            <div className="muted">{a.denyReason && a.denyReason !== 'none' ? a.denyReason : a.amlOutcome || '—'}</div>
            <div>
              {a.status === 'allowed' && !a.amlOutcome && (
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button type="button" onClick={() => void aml(a.id, 'approve')}>
                    AML approve
                  </button>
                  <button className="secondary" type="button" onClick={() => void aml(a.id, 'refer')}>
                    Refer
                  </button>
                  <button className="danger" type="button" onClick={() => void aml(a.id, 'reject')}>
                    Reject
                  </button>
                </div>
              )}
              {a.amlOutcome && <span className="chip mint">AML {a.amlOutcome}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { api, type ListEnvelope } from '../lib/api';

type Grant = {
  id: string;
  relyingPartyName?: string;
  relyingPartyId: string;
  purpose: string;
  expiresAt: string;
  status: string;
};

export function CustomerGrantsPage() {
  const [items, setItems] = useState<Grant[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await api<ListEnvelope<Grant>>('/v1/consents');
      setItems(res.data.items);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function decide(id: string, decision: 'grant' | 'deny') {
    await api(`/v1/consents/${id}/decide`, {
      method: 'POST',
      body: JSON.stringify({ decision }),
    });
    await load();
  }

  async function withdraw(id: string) {
    await api(`/v1/consents/${id}/withdraw`, { method: 'POST', body: '{}' });
    await load();
  }

  const active = items.filter((g) => g.status === 'active' || g.status === 'pending');
  const history = items.filter((g) => g.status === 'withdrawn' || g.status === 'expired' || g.status === 'denied');

  return (
    <div>
      <h1 className="page-title">Active grants</h1>
      <p className="page-sub">Who can request your KYC evidence right now — revoke instantly.</p>
      <div className="pd-seal">PD never on-chain — evidence hashes and consent receipts only</div>
      {error && <div className="banner coral">{error}</div>}
      {active.length === 0 && (
        <div className="banner mint">No active shares — you control reuse.</div>
      )}
      <div className="panel">
        {active.map((g) => (
          <div key={g.id} className={`row ${g.status === 'withdrawn' ? 'sealed' : ''}`}>
            <div>
              <strong>{g.relyingPartyName || g.relyingPartyId}</strong>
              <div className="muted">{g.purpose}</div>
              <div className="mono muted">{g.id}</div>
            </div>
            <div>
              <span className={`chip ${g.status}`}>{g.status}</span>
            </div>
            <div className="muted">Expires {new Date(g.expiresAt).toLocaleString()}</div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {g.status === 'pending' && (
                <>
                  <button type="button" onClick={() => void decide(g.id, 'grant')}>
                    Grant
                  </button>
                  <button className="secondary" type="button" onClick={() => void decide(g.id, 'deny')}>
                    Deny
                  </button>
                </>
              )}
              {g.status === 'active' && (
                <button className="danger" type="button" onClick={() => void withdraw(g.id)}>
                  Withdraw
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <h2 className="page-title" style={{ fontSize: '1.25rem' }}>
        Grant history
      </h2>
      <div className="panel">
        {history.length === 0 && <p className="muted">No withdrawn or expired grants yet.</p>}
        {history.map((g) => (
          <div key={g.id} className="row sealed">
            <div>
              <strong>{g.relyingPartyName || g.relyingPartyId}</strong>
              <div className="muted">{g.purpose}</div>
            </div>
            <span className={`chip ${g.status}`}>{g.status}</span>
            <div className="muted">{new Date(g.expiresAt).toLocaleString()}</div>
            <div />
          </div>
        ))}
      </div>
    </div>
  );
}

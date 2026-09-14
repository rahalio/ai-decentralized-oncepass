import { useEffect, useState } from 'react';
import { api, type ListEnvelope } from '../lib/api';

type Erasure = {
  id: string;
  vaultId: string;
  status: string;
  hashesOrphaned: number;
  pdNeverOnLedger: boolean;
  orphanedEvidenceIds?: string[];
};

type Vault = { id: string; subjectRef: string };

export function ErasuresPage() {
  const [items, setItems] = useState<Erasure[]>([]);
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [vaultId, setVaultId] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const [er, vt] = await Promise.all([
      api<ListEnvelope<Erasure>>('/v1/erasures'),
      api<ListEnvelope<Vault>>('/v1/vaults'),
    ]);
    setItems(er.data.items);
    setVaults(vt.data.items);
    if (!vaultId && vt.data.items[0]) setVaultId(vt.data.items[0].id);
  }

  useEffect(() => {
    void load().catch((e) => setError(String(e.message || e)));
  }, []);

  async function execute() {
    await api('/v1/erasures', {
      method: 'POST',
      body: JSON.stringify({ vaultId }),
    });
    await load();
  }

  return (
    <div>
      <h1 className="page-title">Erasures & orphaning</h1>
      <p className="page-sub">Delete vault PD and unlink on-chain hashes — without claiming the ledger was deleted.</p>
      {error && <div className="banner coral">{error}</div>}
      <div className="panel">
        <div className="form-grid">
          <label>
            Vault
            <select value={vaultId} onChange={(e) => setVaultId(e.target.value)}>
              {vaults.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.subjectRef} ({v.id})
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="danger" type="button" onClick={() => void execute()} disabled={!vaultId}>
          Execute erasure
        </button>
      </div>
      <div className="panel">
        {items.map((e) => (
          <div key={e.id} className="row">
            <div>
              <div className="mono">{e.id}</div>
              <div className="muted mono">vault {e.vaultId}</div>
            </div>
            <span className={`chip ${e.status}`}>{e.status}</span>
            <div className="muted">{e.hashesOrphaned} hashes orphaned</div>
            <span className="chip mint">{e.pdNeverOnLedger ? 'PD never on ledger' : 'check failed'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

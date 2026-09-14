import { useEffect, useState } from 'react';
import { api, type DataEnvelope, type ListEnvelope } from '../lib/api';

type Evidence = {
  id: string;
  vaultId: string;
  evidenceHash: string;
  pdBanPassed: boolean;
  orphaned: boolean;
};

type Vault = { id: string; subjectRef: string };

export function EvidencePage() {
  const [items, setItems] = useState<Evidence[]>([]);
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [vaultId, setVaultId] = useState('');
  const [hash, setHash] = useState('sha256:demo_hash_never_pd');
  const [pdBanPassed, setPdBanPassed] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ssi, setSsi] = useState<{ enabled: boolean; pdBanEnforced: boolean } | null>(null);

  async function load() {
    const [ev, vt, st] = await Promise.all([
      api<ListEnvelope<Evidence>>('/v1/evidence'),
      api<ListEnvelope<Vault>>('/v1/vaults'),
      api<DataEnvelope<{ enabled: boolean; pdBanEnforced: boolean }>>('/v1/ssi-template'),
    ]);
    setItems(ev.data.items);
    setVaults(vt.data.items);
    if (!vaultId && vt.data.items[0]) setVaultId(vt.data.items[0].id);
    setSsi(st.data);
  }

  useEffect(() => {
    void load().catch((e) => setError(String(e.message || e)));
  }, []);

  async function notarise() {
    try {
      await api('/v1/evidence', {
        method: 'POST',
        body: JSON.stringify({ vaultId, evidenceHash: hash, pdBanPassed }),
      });
      setError(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  async function toggleSsi() {
    const next = !(ssi?.enabled);
    await api('/v1/ssi-template', {
      method: 'PUT',
      body: JSON.stringify({ enabled: next, credentialTemplate: 'oncepass-kyc-v1' }),
    });
    await load();
  }

  return (
    <div>
      <h1 className="page-title">Evidence notarise</h1>
      <p className="page-sub">Write cryptographic evidence to the shared plane — never personal data.</p>
      <div className="pd-seal">PD-ban checklist must pass before submit</div>
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
          <label>
            Evidence hash
            <input className="mono" value={hash} onChange={(e) => setHash(e.target.value)} />
          </label>
          <label>
            PD-ban passed
            <select value={pdBanPassed ? 'yes' : 'no'} onChange={(e) => setPdBanPassed(e.target.value === 'yes')}>
              <option value="yes">Yes — no PD in payload</option>
              <option value="no">No — block submit</option>
            </select>
          </label>
        </div>
        <button type="button" onClick={() => void notarise()}>
          Notarise
        </button>
      </div>
      <div className="panel">
        {items.map((e) => (
          <div key={e.id} className="row">
            <div>
              <div className="mono">{e.evidenceHash}</div>
              <div className="mono muted">{e.id}</div>
            </div>
            <span className={`chip ${e.pdBanPassed ? 'mint' : 'denied'}`}>
              {e.pdBanPassed ? 'PD-ban pass' : 'blocked'}
            </span>
            <span className={`chip ${e.orphaned ? 'withdrawn' : 'ready'}`}>
              {e.orphaned ? 'orphaned' : 'live'}
            </span>
            <div className="muted mono">{e.vaultId}</div>
          </div>
        ))}
      </div>
      <div className="panel">
        <h2 className="page-title" style={{ fontSize: '1.2rem' }}>
          Optional SSI mode
        </h2>
        <p className="page-sub">Same PD ban on public-network credential presentations.</p>
        <p>
          Status:{' '}
          <span className={`chip ${ssi?.enabled ? 'active' : 'pending'}`}>
            {ssi?.enabled ? 'enabled' : 'disabled'}
          </span>{' '}
          · PD ban enforced: {ssi?.pdBanEnforced ? 'yes' : 'no'}
        </p>
        <button className="secondary" type="button" onClick={() => void toggleSsi()}>
          {ssi?.enabled ? 'Disable SSI template' : 'Enable SSI template'}
        </button>
      </div>
    </div>
  );
}

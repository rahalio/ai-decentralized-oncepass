import { useEffect, useState } from 'react';
import { api, type ListEnvelope } from '../lib/api';

type Participant = {
  id: string;
  name: string;
  role: string;
  controllership: string;
  status: string;
  dpoContact?: string;
};

export function ParticipantsPage() {
  const [items, setItems] = useState<Participant[]>([]);
  const [name, setName] = useState('New Relying FI');
  const [role, setRole] = useState('relying');
  const [controllership, setControllership] = useState('controller');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await api<ListEnvelope<Participant>>('/v1/participants');
    setItems(res.data.items);
  }

  useEffect(() => {
    void load().catch((e) => setError(String(e.message || e)));
  }, []);

  async function register() {
    await api('/v1/participants', {
      method: 'POST',
      body: JSON.stringify({ name, role, controllership, dpoContact: 'dpo@example.com' }),
    });
    await load();
  }

  async function suspend(id: string) {
    await api(`/v1/participants/${id}/suspend`, {
      method: 'POST',
      body: JSON.stringify({ reason: 'Anomalous access volume', notifyDpo: true }),
    });
    await load();
  }

  return (
    <div>
      <h1 className="page-title">Participants</h1>
      <p className="page-sub">Record which legal entity is controller or processor for shared components.</p>
      {error && <div className="banner coral">{error}</div>}
      <div className="panel">
        <div className="form-grid">
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="home">home</option>
              <option value="relying">relying</option>
              <option value="operator">operator</option>
            </select>
          </label>
          <label>
            Controllership
            <select value={controllership} onChange={(e) => setControllership(e.target.value)}>
              <option value="controller">controller</option>
              <option value="processor">processor</option>
              <option value="joint_controller">joint_controller</option>
            </select>
          </label>
        </div>
        <button type="button" onClick={() => void register()}>
          Onboard org
        </button>
      </div>
      <div className="panel">
        {items.map((p) => (
          <div key={p.id} className="row">
            <div>
              <strong>{p.name}</strong>
              <div className="muted">{p.dpoContact}</div>
              <div className="mono muted">{p.id}</div>
            </div>
            <span className="chip pending">{p.role}</span>
            <span className="chip mint">{p.controllership}</span>
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <span className={`chip ${p.status}`}>{p.status}</span>
              {p.status === 'active' && (
                <button className="danger" type="button" onClick={() => void suspend(p.id)}>
                  Suspend
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

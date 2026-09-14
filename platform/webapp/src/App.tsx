import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRole, setRole, type OperatorRole } from './lib/api';
import { LoginPage } from './pages/LoginPage';
import { CustomerGrantsPage } from './pages/CustomerGrantsPage';
import { VaultsPage } from './pages/VaultsPage';
import { EvidencePage } from './pages/EvidencePage';
import { AccessPage } from './pages/AccessPage';
import { ErasuresPage } from './pages/ErasuresPage';
import { ParticipantsPage } from './pages/ParticipantsPage';
import { AnomaliesPage } from './pages/AnomaliesPage';
import { AuditMetricsPage } from './pages/AuditMetricsPage';

const NAV = [
  { to: '/grants', label: 'Customer grants' },
  { to: '/vaults', label: 'Home vaults' },
  { to: '/evidence', label: 'Evidence notarise' },
  { to: '/access', label: 'Access requests' },
  { to: '/erasures', label: 'Erasures' },
  { to: '/participants', label: 'Participants' },
  { to: '/anomalies', label: 'Anomaly alerts' },
  { to: '/audit', label: 'Audit & metrics' },
];

const ROLE_HOME: Record<OperatorRole, string> = {
  customer: '/grants',
  home_kyc: '/evidence',
  relying: '/access',
  mlro: '/access',
  dpo: '/audit',
  operator: '/anomalies',
};

function Shell({ onSignOut }: { onSignOut: () => void }) {
  const [role, setRoleState] = useState<OperatorRole>(getRole());
  const navigate = useNavigate();

  useEffect(() => {
    setRole(role);
  }, [role]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-seal" aria-hidden />
          Oncepass
        </div>
        <label>
          Role
          <select
            value={role}
            onChange={(e) => {
              const next = e.target.value as OperatorRole;
              setRoleState(next);
              navigate(ROLE_HOME[next]);
            }}
          >
            <option value="customer">Customer</option>
            <option value="home_kyc">Home bank KYC</option>
            <option value="relying">Relying onboarding</option>
            <option value="mlro">MLRO delegate</option>
            <option value="dpo">DPO / auditor</option>
            <option value="operator">Network operator</option>
          </select>
        </label>
        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="secondary" type="button" onClick={onSignOut}>
          Sign out
        </button>
      </aside>
      <main className="main">
        <Routes>
          <Route path="/grants" element={<CustomerGrantsPage />} />
          <Route path="/vaults" element={<VaultsPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/access" element={<AccessPage />} />
          <Route path="/erasures" element={<ErasuresPage />} />
          <Route path="/participants" element={<ParticipantsPage />} />
          <Route path="/anomalies" element={<AnomaliesPage />} />
          <Route path="/audit" element={<AuditMetricsPage />} />
          <Route path="*" element={<Navigate to={ROLE_HOME[getRole()]} replace />} />
        </Routes>
      </main>
    </div>
  );
}

export function App() {
  const [authed, setAuthed] = useState(
    () => localStorage.getItem('oncepass_authed') === '1'
  );

  if (!authed) {
    return (
      <LoginPage
        onSuccess={() => {
          localStorage.setItem('oncepass_authed', '1');
          setAuthed(true);
        }}
      />
    );
  }

  return (
    <Shell
      onSignOut={() => {
        localStorage.removeItem('oncepass_authed');
        setAuthed(false);
      }}
    />
  );
}

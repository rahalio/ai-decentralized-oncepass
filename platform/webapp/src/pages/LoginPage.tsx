export function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="brand">
          <span className="brand-seal" aria-hidden />
          Oncepass
        </div>
        <p>Share KYC evidence once — revoke anytime</p>
        <div className="actions">
          <button type="button" onClick={onSuccess}>
            Enter grant console
          </button>
        </div>
        <p className="muted" style={{ marginTop: '1.25rem', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
          Demo uses <span className="mono">oncepass_demo_local_dev_key</span>. Personal data never leaves the home vault.
        </p>
      </div>
    </div>
  );
}

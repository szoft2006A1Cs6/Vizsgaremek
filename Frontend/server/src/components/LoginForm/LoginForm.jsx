import './LoginForm.css';

export default function LoginForm({
  fetchingUsers, users, selectedUser, setSelectedUser,
  password, setPassword, error, isLoading, onSubmit
}) {
  return (
    <form onSubmit={onSubmit} className="auth-form">
      <div>
        <label className="form-label">Felhasználó</label>
        {fetchingUsers ? (
          <div className="auth-loading-text">Betöltés...</div>
        ) : (
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="form-control"
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label className="form-label">Jelszó</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••"
          className={`form-control ${error ? 'error' : ''}`}
        />
        {error && <div className="form-error">{error}</div>}
      </div>

      <button type="submit" className="btn btn-primary auth-submit-btn" disabled={isLoading || fetchingUsers}>
        {isLoading ? 'Belépés...' : 'Bejelentkezés'}
      </button>
    </form>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';

const API_BASE_URL = 'https://localhost:7235';

export default function Login() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/users`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          if (data.length > 0) setSelectedUser(data[0].id);
        } else {
          setError('Nem sikerült lekérni a felhasználói listát.');
        }
      } catch (err) {
        setError('Hiba a szerverrel való kapcsolat során.');
      } finally {
        setFetchingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const currentUser = users.find(u => u.id === selectedUser);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUser.name, password: password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        if (data.role === 'Staff') navigate('/kitchen');
        else navigate('/home');
      } else {
        setError(data.message || 'Hibás jelszó!');
      }
    } catch (err) {
      setError('Szerver hiba történt.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-layout bg-dark flex-center">
      <div className="card auth-card">
        <div className="auth-header">
          <div className="auth-logo-bg">
            <span className="material-icons auth-logo-icon">restaurant</span>
          </div>
          <h1 className="font-display auth-title">Gusto Bistro</h1>
          <p className="auth-subtitle">Bejelentkezés</p>
        </div>
        <LoginForm
          fetchingUsers={fetchingUsers} users={users}
          selectedUser={selectedUser} setSelectedUser={setSelectedUser}
          password={password} setPassword={setPassword}
          error={error} isLoading={isLoading} onSubmit={handleLogin}
        />
      </div>
    </div>
  );
}
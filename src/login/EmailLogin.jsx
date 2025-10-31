import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function EmailLogin({ onBack, onDone }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { login, signUp } = useAuth();

  const submitLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      const name = email.split('@')[0] || 'User';
      onDone && onDone(name);
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const displayName = email.split('@')[0] || 'User';
      await signUp(email, password, displayName);
      onDone && onDone(displayName);
    } catch (err) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="text-sm opacity-80">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3"
          disabled={loading}
        />
      </div>
      <div>
        <label className="text-sm opacity-80">Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3"
          disabled={loading}
        />
      </div>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button onClick={onBack} className="btn-secondary" disabled={loading}>Back</button>
        <div className="flex gap-2">
          <button onClick={submitLogin} className="btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <button onClick={submitCreate} className="btn-secondary" disabled={loading}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

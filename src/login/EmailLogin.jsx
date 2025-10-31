import React from 'react';

export default function EmailLogin({ onBack, onDone }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submitLogin = (e) => { e.preventDefault(); const name = email.split('@')[0] || 'User'; onDone && onDone(name); };
  const submitCreate = (e) => { e.preventDefault(); const name = email.split('@')[0] || 'User'; onDone && onDone(name); };

  return (
    <div className="grid gap-4">
      <div>
        <label className="text-sm opacity-80">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3" />
      </div>
      <div>
        <label className="text-sm opacity-80">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3" />
      </div>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button onClick={onBack} className="btn-secondary">Back</button>
        <div className="flex gap-2">
          <button onClick={submitLogin} className="btn-primary">Login</button>
          <button onClick={submitCreate} className="btn-secondary">Create Account</button>
        </div>
      </div>
    </div>
  );
}



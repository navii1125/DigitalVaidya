import React from 'react';

const OptionCard = ({ icon, title, onClick }) => (
  <button onClick={onClick} className="group rounded-2xl p-5 border border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-900/60 transition shadow-soft hover:shadow-xl text-left">
    <div className="text-3xl mb-3">{icon}</div>
    <div className="font-semibold">{title}</div>
    <div className="mt-1 text-sm opacity-70">Continue</div>
  </button>
);

export default function LoginOptions({ onSelect, onBack }) {
  return (
    <div className="grid gap-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <OptionCard icon="📧" title="Login / Create Account using Email" onClick={() => onSelect && onSelect('email')} />
        <OptionCard icon="🪪" title="Login using Aadhaar Upload" onClick={() => onSelect && onSelect('aadhaar')} />
        <OptionCard icon="👤" title="Face Login (Existing Users)" onClick={() => onSelect && onSelect('face')} />
      </div>
      <div className="flex justify-end">
        <button onClick={onBack} className="btn-secondary">Back</button>
      </div>
    </div>
  );
}



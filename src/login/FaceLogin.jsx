import React from 'react';

export default function FaceLogin({ onBack, onDone }) {
  const [scanning, setScanning] = React.useState(false);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onDone && onDone('Returning User');
    }, 1200);
  };

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl p-5 border border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/40">
        <div className="text-sm opacity-80">Webcam Preview (placeholder)</div>
        <div className="mt-3 aspect-video rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 grid place-items-center">
          <div className="text-center opacity-70">
            <div className="text-4xl">📷</div>
            <div className="mt-2 text-sm">Camera view will appear here</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-secondary">Back</button>
        <button onClick={startScan} className="btn-primary" disabled={scanning}>{scanning ? 'Scanning…' : 'Start Scan'}</button>
      </div>
    </div>
  );
}



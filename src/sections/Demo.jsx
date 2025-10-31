import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { auth } from '../config/firebase';

export default function Demo() {
  const [description, setDescription] = React.useState('Sharp pain on the lower right abdomen for 3 hours.');
  const [healthParams, setHealthParams] = React.useState({
    temperature: '',
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    oxygenLevel: ''
  });
  const [result, setResult] = React.useState(null);
  const [listening, setListening] = React.useState(false);
  const [supported, setSupported] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const recognitionRef = React.useRef(null);
  const { user } = useAuth();

  React.useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    let finalTranscript = '';
    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interim += transcript;
        }
      }
      const combined = (description + ' ' + finalTranscript + ' ' + interim).trim();
      setDescription(combined);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognition.onerror = () => {
      setListening(false);
    };
    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (!listening) {
      try {
        rec.start();
        setListening(true);
      } catch {}
    } else {
      rec.stop();
      setListening(false);
    }
  };

  const analyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = user ? await auth.currentUser?.getIdToken() : null;
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          description,
          healthParams
        })
      });
      
      const data = await response.json();
      
      if (data.ok && data.result) {
        setResult(data.result);
      } else {
        setResult({
          condition: 'Unable to analyze',
          urgency: 'Please try again',
        });
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setResult({
        condition: 'Error during analysis',
        urgency: 'Please try again',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateHealthParam = (key, value) => {
    setHealthParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Live Demo</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Enter your symptoms and health parameters for AI analysis.</p>
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-4 sm:p-6"
        >
          <h3 className="font-semibold">Sketch Area</h3>
          <div className="mt-3 aspect-[4/3] rounded-xl border border-white/40 dark:border-white/10 bg-white dark:bg-slate-900 grid place-items-center">
            <div className="text-center opacity-70">
              <div className="text-5xl">✏️</div>
              <p className="mt-2 text-sm">Tap or click to mark the area that hurts</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-4 sm:p-6"
        >
          <h3 className="font-semibold mb-3">Health Parameters</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs opacity-80">Temperature (°C)</label>
              <input 
                type="number" 
                step="0.1"
                placeholder="37.0"
                value={healthParams.temperature}
                onChange={(e) => updateHealthParam('temperature', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-2 text-sm"
              />
            </div>
            
            <div>
              <label className="text-xs opacity-80">Heart Rate (bpm)</label>
              <input 
                type="number"
                placeholder="75"
                value={healthParams.heartRate}
                onChange={(e) => updateHealthParam('heartRate', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-2 text-sm"
              />
            </div>
            
            <div>
              <label className="text-xs opacity-80">BP Systolic</label>
              <input 
                type="number"
                placeholder="120"
                value={healthParams.systolicBP}
                onChange={(e) => updateHealthParam('systolicBP', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-2 text-sm"
              />
            </div>
            
            <div>
              <label className="text-xs opacity-80">BP Diastolic</label>
              <input 
                type="number"
                placeholder="80"
                value={healthParams.diastolicBP}
                onChange={(e) => updateHealthParam('diastolicBP', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-2 text-sm"
              />
            </div>
            
            <div className="col-span-2">
              <label className="text-xs opacity-80">Oxygen Saturation (%)</label>
              <input 
                type="number"
                placeholder="98"
                value={healthParams.oxygenLevel}
                onChange={(e) => updateHealthParam('oxygenLevel', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-2 text-sm"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.form
        onSubmit={analyze}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-6 glass rounded-2xl p-4 sm:p-6"
      >
        <h3 className="font-semibold">Describe Your Symptoms</h3>
        <textarea
          className="mt-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3 outline-none focus:ring-2 focus:ring-brand-400 min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <button type="button" onClick={toggleListening} className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 ${listening ? 'bg-red-500 text-white' : 'bg-emerald-600 text-white'} shadow-lg hover:opacity-95 transition`}>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M12 14a4 4 0 0 0 4-4V7a4 4 0 1 0-8 0v3a4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M19 11a7 7 0 0 1-14 0m7 7v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {listening ? 'Listening… Click to stop' : 'Speak Symptoms'}
          </button>
          {!supported && <span className="text-sm opacity-70">Voice input not supported in this browser.</span>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-6 glass rounded-2xl p-4 sm:p-6"
      >
        <h3 className="font-semibold">Analysis Results</h3>
        {result ? (
          <div className="mt-3 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-emerald-300/40 dark:border-emerald-700/40 bg-emerald-50/60 dark:bg-emerald-900/20 p-4">
                <div className="text-sm opacity-70">Predicted Condition</div>
                <div className="mt-1 font-semibold">{result.condition}</div>
              </div>
              <div className="rounded-xl border border-amber-300/40 dark:border-amber-700/40 bg-amber-50/60 dark:bg-amber-900/20 p-4">
                <div className="text-sm opacity-70">Urgency Level</div>
                <div className="mt-1 font-semibold">{result.urgency}</div>
              </div>
            </div>
            {result.user && (
              <div className="rounded-xl border border-blue-300/40 dark:border-blue-700/40 bg-blue-50/60 dark:bg-blue-900/20 p-4">
                <div className="text-sm opacity-70">Analyzed for user</div>
                <div className="mt-1 font-semibold">{result.user.email}</div>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm opacity-70">Run an analysis to see results.</p>
        )}
      </motion.div>
    </div>
  );
}

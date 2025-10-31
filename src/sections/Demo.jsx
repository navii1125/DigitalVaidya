import React from 'react';
import { motion } from 'framer-motion';

export default function Demo() {
  const [description, setDescription] = React.useState('Sharp pain on the lower right abdomen for 3 hours.');
  const [result, setResult] = React.useState(null);
  const [listening, setListening] = React.useState(false);
  const [supported, setSupported] = React.useState(true);
  const recognitionRef = React.useRef(null);

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

  const analyze = (e) => {
    e.preventDefault();
    setResult({
      condition: 'Possible Appendicitis',
      urgency: 'Seek medical attention within 24 hours',
    });
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Live Demo</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Sketch + describe your symptoms to get quick insights.</p>
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
              <p className="mt-2 text-sm">Placeholder canvas for body sketch</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={analyze}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-4 sm:p-6 flex flex-col"
        >
          <h3 className="font-semibold">Describe Your Symptoms</h3>
          <textarea
            className="mt-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3 outline-none focus:ring-2 focus:ring-brand-400 min-h-[150px]"
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
            <button type="submit" className="btn-primary">Analyze</button>
          </div>
        </motion.form>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-6 glass rounded-2xl p-4 sm:p-6"
      >
        <h3 className="font-semibold">Mock Results</h3>
        {result ? (
          <div className="mt-3 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-300/40 dark:border-emerald-700/40 bg-emerald-50/60 dark:bg-emerald-900/20 p-4">
              <div className="text-sm opacity-70">Predicted Condition</div>
              <div className="mt-1 font-semibold">{result.condition}</div>
            </div>
            <div className="rounded-xl border border-amber-300/40 dark:border-amber-700/40 bg-amber-50/60 dark:bg-amber-900/20 p-4">
              <div className="text-sm opacity-70">Urgency Level</div>
              <div className="mt-1 font-semibold">{result.urgency}</div>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-sm opacity-70">Run an analysis to see example results.</p>
        )}
      </motion.div>
    </div>
  );
}



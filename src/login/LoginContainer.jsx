import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelect from './LanguageSelect.jsx';
import LoginOptions from './LoginOptions.jsx';
import EmailLogin from './EmailLogin.jsx';
import AadhaarUpload from './AadhaarUpload.jsx';
import FaceLogin from './FaceLogin.jsx';
import WelcomeScreen from './WelcomeScreen.jsx';

const steps = [
  { key: 'language', label: 'Language' },
  { key: 'method', label: 'Method' },
  { key: 'email', label: 'Email' },
  { key: 'aadhaar', label: 'Aadhaar' },
  { key: 'face', label: 'Face' },
  { key: 'welcome', label: 'Welcome' },
];

export default function LoginContainer({ onComplete }) {
  const [step, setStep] = React.useState(0); // index in steps
  const [method, setMethod] = React.useState(null); // 'email' | 'aadhaar' | 'face'
  const [language, setLanguage] = React.useState('en');
  const [userName, setUserName] = React.useState('');

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  // Determine which step to show after method selection
  const goToMethod = (m) => {
    setMethod(m);
    if (m === 'email') setStep(2);
    if (m === 'aadhaar') setStep(3);
    if (m === 'face') setStep(4);
  };

  const variants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  };

  const Stepper = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {steps.slice(0, 5).map((s, i) => (
        <div key={s.key} className={`h-2 rounded-full transition-all ${i <= step ? 'bg-gradient-to-r from-brand-500 to-sky-600 w-10' : 'bg-slate-300 dark:bg-slate-700 w-6'}`} />
      ))}
    </div>
  );

  return (
    <div className="container-max py-12 sm:py-16">
      <div className="max-w-2xl mx-auto glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-sky-600" />
          <h1 className="text-2xl font-bold">DigitalVaidya</h1>
        </div>
        <p className="opacity-80 text-sm mb-4">AI Symptom Sketcher — secure, quick sign-in.</p>

        <Stepper />

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="language" variants={variants} initial="initial" animate="animate" exit="exit">
              <LanguageSelect value={language} onChange={setLanguage} onContinue={next} />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="options" variants={variants} initial="initial" animate="animate" exit="exit">
              <LoginOptions onSelect={goToMethod} onBack={back} />
            </motion.div>
          )}
          {step === 2 && method === 'email' && (
            <motion.div key="email" variants={variants} initial="initial" animate="animate" exit="exit">
              <EmailLogin onBack={() => setStep(1)} onDone={(name) => { setUserName(name || 'User'); setStep(5); }} />
            </motion.div>
          )}
          {step === 3 && method === 'aadhaar' && (
            <motion.div key="aadhaar" variants={variants} initial="initial" animate="animate" exit="exit">
              <AadhaarUpload onBack={() => setStep(1)} onDone={(name) => { setUserName(name || 'Aadhaar User'); setStep(5); }} />
            </motion.div>
          )}
          {step === 4 && method === 'face' && (
            <motion.div key="face" variants={variants} initial="initial" animate="animate" exit="exit">
              <FaceLogin onBack={() => setStep(1)} onDone={(name) => { setUserName(name || 'Returning User'); setStep(5); }} />
            </motion.div>
          )}
          {step === 5 && (
            <motion.div key="welcome" variants={variants} initial="initial" animate="animate" exit="exit">
              <WelcomeScreen name={userName || 'User'} onContinue={onComplete} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}



import React from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [values, setValues] = React.useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);

  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 sm:p-8 max-w-3xl"
    >
      <h2 className="text-2xl font-semibold">Contact Us</h2>
      <p className="mt-1 text-sm opacity-80">We respond within 1-2 business days.</p>
      <form onSubmit={onSubmit} className="mt-5 grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-1">
          <label className="text-sm opacity-80">Name</label>
          <input name="name" value={values.name} onChange={onChange} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3 outline-none focus:ring-2 focus:ring-brand-400" />
        </div>
        <div className="sm:col-span-1">
          <label className="text-sm opacity-80">Email</label>
          <input type="email" name="email" value={values.email} onChange={onChange} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3 outline-none focus:ring-2 focus:ring-brand-400" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm opacity-80">Message</label>
          <textarea name="message" rows={5} value={values.message} onChange={onChange} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3 outline-none focus:ring-2 focus:ring-brand-400" />
        </div>
        <div className="sm:col-span-2 flex items-center justify-between">
          <button className="btn-primary">Connect with Us</button>
          {submitted && <span className="text-sm text-emerald-600 dark:text-emerald-400">Thanks! We'll get back to you soon.</span>}
        </div>
      </form>
    </motion.div>
  );
}



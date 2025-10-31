import React from 'react';
import { motion } from 'framer-motion';

export default function FeedbackForm() {
  const [values, setValues] = React.useState({ rating: '5', feedback: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 sm:p-8 max-w-3xl"
    >
      <h2 className="text-2xl font-semibold">Share Your Feedback</h2>
      <p className="mt-1 text-sm opacity-80">Help us improve your experience.</p>
      <form onSubmit={onSubmit} className="mt-5 grid gap-4">
        <div>
          <label className="text-sm opacity-80">Rating</label>
          <select name="rating" value={values.rating} onChange={onChange} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3">
            <option value="5">Excellent</option>
            <option value="4">Good</option>
            <option value="3">Okay</option>
            <option value="2">Poor</option>
            <option value="1">Very Poor</option>
          </select>
        </div>
        <div>
          <label className="text-sm opacity-80">Feedback</label>
          <textarea name="feedback" rows={5} value={values.feedback} onChange={onChange} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3" />
        </div>
        <div className="flex items-center justify-between">
          <button className="btn-primary">Submit Feedback</button>
          {submitted && <span className="text-sm text-emerald-600 dark:text-emerald-400">Thanks for your feedback!</span>}
        </div>
      </form>
    </motion.div>
  );
}



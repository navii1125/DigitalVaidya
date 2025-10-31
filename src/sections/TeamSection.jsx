import React from 'react';
import { motion } from 'framer-motion';

const team = [
  { name: 'Member One', role: 'AI Engineer' },
  { name: 'Member Two', role: 'Frontend Developer' },
  { name: 'Member Three', role: 'Product Designer' },
  { name: 'Member Four', role: 'Backend Engineer' },
];

export default function TeamSection() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Team HackSkills</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">We build AI that cares.</p>
      </div>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            viewport={{ once: true }}
            className="group glass rounded-2xl p-6 text-center"
          >
            <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-brand-500 to-sky-600" />
            <div className="mt-4 font-semibold">{m.name}</div>
            <div className="text-sm opacity-70">{m.role}</div>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition">
              <button className="btn-secondary w-full">Connect</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}



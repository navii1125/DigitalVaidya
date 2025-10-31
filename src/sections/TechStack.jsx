import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Frontend', items: ['React', 'Tailwind CSS'] },
  { name: 'Backend', items: ['Flask', 'Python'] },
  { name: 'AI/ML', items: ['TensorFlow', 'scikit-learn', 'NLP Transformers'] },
  { name: 'Database', items: ['MongoDB'] },
  { name: 'Cloud', items: ['AWS'] },
];

export default function TechStack() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Our Technology Stack</h2>
      </div>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-semibold">{cat.name}</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {cat.items.map((name) => (
                <div key={name} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 text-sm">
                  {name}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}



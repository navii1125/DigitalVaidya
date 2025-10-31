import React from 'react';

export default function ChatbotButton() {
  return (
    <button
      aria-label="Open chatbot"
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-gradient-to-br from-brand-500 to-sky-600 text-white shadow-xl hover:scale-105 active:scale-95 transition grid place-items-center"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M21 12a8 8 0 1 1-3.78-6.78L21 5l-.78 3.78A8 8 0 0 1 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 13h5M8 9h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
  );
}



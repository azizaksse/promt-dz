/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  variant?: 'nav' | 'footer';
}

const LANGUAGES: { id: Language; label: string; code: string }[] = [
  { id: 'en', label: 'English', code: 'EN' },
  { id: 'fr', label: 'Français', code: 'FR' },
  { id: 'dz', label: 'الجزائرية', code: 'DZ' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  currentLang, 
  onLanguageChange, 
  variant = 'nav' 
}) => {
  const isNav = variant === 'nav';

  return (
    <div className={`flex gap-1 p-1 rounded-2xl border relative ${
      isNav ? 'bg-slate-100/80 border-slate-200/50' : 'bg-slate-50 border-slate-200'
    }`}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onLanguageChange(lang.id)}
          className={`relative z-10 rounded-xl text-[10px] font-black tracking-widest transition-colors duration-500 uppercase ${
            isNav ? 'px-4 py-1.5' : 'px-5 py-2'
          } ${
            currentLang === lang.id 
              ? 'text-teal-900' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {currentLang === lang.id && (
            <motion.div
              layoutId={`${variant}LangHighlight`}
              className="absolute inset-0 bg-white shadow-sm border border-slate-200/50 rounded-xl -z-10"
              transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
            />
          )}
          {isNav ? lang.code : lang.label}
        </button>
      ))}
    </div>
  );
};

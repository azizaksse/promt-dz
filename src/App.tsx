/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Copy, 
  Share2, 
  Check, 
  Terminal, 
  PenTool, 
  Layout, 
  Briefcase,
  X,
  Globe,
  Plus,
  Star,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { LanguageSelector } from './components/LanguageSelector';
import { INITIAL_PROMPTS, CATEGORIES, TRANSLATIONS, THEME } from './constants';
import { Prompt, Language } from './types';

// Utility for category icons
const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'writing': return <PenTool className="w-4 h-4" />;
    case 'coding': return <Terminal className="w-4 h-4" />;
    case 'design': return <Layout className="w-4 h-4" />;
    case 'business': return <Briefcase className="w-4 h-4" />;
    default: return <ChevronRight className="w-4 h-4" />;
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'dz';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPrompts = useMemo(() => {
    return INITIAL_PROMPTS.filter(prompt => {
      const title = typeof prompt.title === 'string' ? prompt.title : prompt.title[lang];
      const desc = typeof prompt.description === 'string' ? prompt.description : prompt.description[lang];
      
      const matchesSearch = 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.promptText.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !activeCategoryId || prompt.category === activeCategoryId;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategoryId, lang]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getLocalizedValue = (val: Record<Language, string> | string) => {
    return typeof val === 'string' ? val : val[lang];
  };

  return (
    <div 
      className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-teal-100"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center text-white">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight uppercase tracking-widest">{t.title}</span>
          </div>
          
          <div className="hidden md:flex">
            <LanguageSelector currentLang={lang} onLanguageChange={setLang} variant="nav" />
          </div>

          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200/50 hover:bg-teal-800 transition-colors"
            >
              <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Plus className="w-3 h-3" />
              </div>
              {t.newPrompt}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1 
            key={`${lang}-title`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            {t.subtitle}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative w-full max-w-lg mx-auto group"
          >
            <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors`} />
            <input 
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-white border border-slate-200 rounded-2xl py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className={`absolute ${isRtl ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full text-slate-400`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-24">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button 
            onClick={() => setActiveCategoryId(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !activeCategoryId 
                ? 'bg-teal-700 text-white shadow-md shadow-teal-100' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-700'
            }`}
          >
            {t.allPrompts}
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategoryId === cat.id 
                  ? 'bg-teal-700 text-white shadow-md shadow-teal-100' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-700'
              }`}
            >
              {getCategoryIcon(cat.id)}
              {getLocalizedValue(cat.name)}
            </button>
          ))}
        </div>

        {/* Prompt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPrompts.map((prompt, index) => (
              <motion.div
                key={prompt.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:shadow-[0_20px_50px_-20px_rgba(15,118,110,0.15)] transition-shadow flex flex-col h-full overflow-hidden"
              >
                {/* Premium Hover Ornament */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-start justify-between mb-6">
                  <div className={`flex items-center gap-2 text-[10px] font-black text-teal-700 bg-teal-50/50 border border-teal-100 px-3 py-1.5 rounded-full tracking-widest uppercase ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="opacity-70">{getCategoryIcon(prompt.category)}</span>
                    {getLocalizedValue(CATEGORIES.find(c => c.id === prompt.category)?.name || '')}
                  </div>
                </div>
                
                <h3 className={`text-2xl font-black mb-3 group-hover:text-teal-700 transition-colors uppercase italic text-start tracking-tight`}>
                  {getLocalizedValue(prompt.title)}
                </h3>
                <p className={`text-sm text-slate-500 mb-6 line-clamp-2 text-start`}>
                  {getLocalizedValue(prompt.description)}
                </p>
                
                <div className="relative mt-auto">
                  <div className="bg-slate-50 rounded-2xl p-4 mb-4 font-mono text-sm text-slate-700 overflow-hidden relative">
                    <p className={`line-clamp-4 leading-relaxed text-start`}>{prompt.promptText}</p>
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-50 to-transparent" />
                  </div>
                  
                  <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                    <button 
                      onClick={() => copyToClipboard(prompt.promptText, prompt.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all active:scale-95"
                    >
                      {copiedId === prompt.id ? (
                        <>
                          <Check className="w-4 h-4 text-teal-400" />
                          <span>{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>{t.copyBtn}</span>
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => {
                        const shareUrl = window.location.href;
                        navigator.clipboard.writeText(shareUrl);
                        setCopiedId(`share-${prompt.id}`);
                        setTimeout(() => setCopiedId(null), 2000);
                      }}
                      className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all active:scale-95 px-3"
                    >
                      {copiedId === `share-${prompt.id}` ? (
                        <Check className="w-5 h-5 text-teal-600" />
                      ) : (
                        <Share2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPrompts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-teal-100 blur-3xl opacity-30 rounded-full scale-150" />
              <div className="relative w-24 h-24 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/40 flex items-center justify-center">
                <Search className="w-10 h-10 text-teal-600/30" />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </div>
            </div>
            
            <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
              {t.noResults}
            </h3>
            <p className="text-slate-400 max-w-sm mb-10 font-medium leading-relaxed">
              {lang === 'dz' 
                ? 'لم يتم العثور على أي نتائج تطابق بحثك. حاول تغيير الكلمات المفتاحية أو التصنيفات.' 
                : 'We couldn\'t find any prompts matching your search. Try adjusting your keywords or category filters.'}
            </p>
            
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategoryId(null);
              }}
              className="group relative px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:pr-12"
            >
              <span className="relative z-10">{t.clearFilters}</span>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white">
                <Terminal className="w-3 h-3" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">{t.title}</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              {t.footerText}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-4 mb-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-teal-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t.newPrompt}
              </motion.button>
              <LanguageSelector currentLang={lang} onLanguageChange={setLang} variant="footer" />
            </div>
            <div className="text-[10px] text-slate-400 font-extrabold tracking-[0.2em] uppercase">
              &copy; {new Date().getFullYear()} PROMPT DZ PROTOCOL.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


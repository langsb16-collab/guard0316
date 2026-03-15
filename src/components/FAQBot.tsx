import React, { useState } from 'react';
import { Bot, X, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

export const FAQBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();

  const faqItems = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    question: t(`faq_q${i + 1}`),
    answer: t(`faq_a${i + 1}`),
  }));

  const filteredFaqs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[380px] h-[60vh] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-orange-500 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{t('faq_title')}</h3>
                  <p className="text-orange-100 text-xs">{t('faq_subtitle')}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-white/5 bg-zinc-800/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder={t('faq_search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* FAQ List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredFaqs.map((item) => (
                <details key={item.id} className="group bg-zinc-800/30 rounded-xl overflow-hidden border border-transparent hover:border-white/5 transition-all">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                    <span className="text-sm font-medium text-zinc-200 pr-4">{item.question}</span>
                    <ChevronDown className="w-4 h-4 text-zinc-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-zinc-400 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
              {filteredFaqs.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-zinc-500 text-sm">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-zinc-800/50 text-center border-t border-white/5">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{t('powered_by')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 text-white hover:bg-orange-400 transition-all"
      >
        <Bot className="w-7 h-7" />
      </motion.button>
    </div>
  );
};

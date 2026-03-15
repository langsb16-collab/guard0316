import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const faqData = [
  { q: "What is FraudGuard AI?", a: "FraudGuard AI is an advanced intelligence platform that uses artificial intelligence to detect and analyze fraud patterns in online communities, investment proposals, and crypto projects." },
  { q: "How does the risk scoring work?", a: "Our AI analyzes text patterns, behavioral data, and historical scam databases to assign a risk score from 0 to 100. A higher score indicates a higher probability of fraud." },
  { q: "Is this service free?", a: "Yes, the basic fraud analysis and community database search are free for all users." },
  { q: "How can I report a scam?", a: "You can use the 'Report Scam' tab in the sidebar to submit details about a suspicious project, account, or transaction." },
  { q: "Does the platform support multiple languages?", a: "Yes, we support 8 major languages and provide real-time translation for our global chat community." }
];

export function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaq = faqData.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <header className="text-center space-y-4">
        <div className="w-16 h-16 bg-orange-500/20 rounded-3xl flex items-center justify-center mx-auto border border-orange-500/30">
          <HelpCircle className="text-orange-500 w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">{t('faq')}</h2>
        <p className="text-zinc-500 text-lg">Common questions about the platform and fraud prevention.</p>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search FAQ..."
          className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
        />
      </div>

      <div className="space-y-3">
        {filteredFaq.map((item, index) => (
          <div 
            key={index}
            className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-all"
            >
              <span className="text-white font-medium">{item.q}</span>
              {openIndex === index ? <ChevronUp className="text-zinc-500" /> : <ChevronDown className="text-zinc-500" />}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <p className="text-zinc-400 text-sm leading-relaxed pt-2 border-t border-white/5">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="bg-orange-500/10 border border-orange-500/20 p-8 rounded-3xl text-center space-y-4">
        <h3 className="text-white font-bold text-xl">Still have questions?</h3>
        <p className="text-zinc-400">Our AI assistant and community members are here to help you 24/7.</p>
        <button className="bg-orange-500 text-zinc-950 px-8 py-3 rounded-xl font-bold hover:bg-orange-400 transition-all flex items-center gap-2 mx-auto">
          <MessageSquare className="w-5 h-5" />
          Ask AI Assistant
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SearchAnalysis } from './components/SearchAnalysis';
import { FraudMap } from './components/FraudMap';
import { NetworkAnalysis } from './components/NetworkAnalysis';
import { ReportScam } from './components/ReportScam';
import { OCRAnalysis } from './components/OCRAnalysis';
import { LegalAI } from './components/LegalAI';
import { VoiceAnalysis } from './components/VoiceAnalysis';
import { SMSAnalysis } from './components/SMSAnalysis';
import { FinancialAnalysis } from './components/FinancialAnalysis';
import { ChatWidget } from './components/ChatWidget';
import { FAQBot } from './components/FAQBot';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'ko', name: '한국어' },
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ru', name: 'Русский' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'pt', name: 'Português' },
    { code: 'id', name: 'Bahasa Indonesia' },
  ];

  const currentLangName = languages.find(l => l.code === i18n.language)?.name || 'English';

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLangOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'search':
        return <SearchAnalysis />;
      case 'network':
        return <NetworkAnalysis />;
      case 'trend':
        return <FraudMap />;
      case 'report':
        return <ReportScam />;
      case 'ocr':
        return <OCRAnalysis />;
      case 'legal':
        return <LegalAI />;
      case 'voice':
        return <VoiceAnalysis />;
      case 'sms':
        return <SMSAnalysis />;
      case 'financial':
        return <FinancialAnalysis />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
            <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/5">
              <span className="text-2xl font-bold">?</span>
            </div>
            <p className="text-lg font-medium">This feature is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-500">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-grow flex flex-col min-w-0">
        <header className="h-16 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
              {t('no_login_required')}
            </div>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/5 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-all"
            >
              <Globe className="w-4 h-4 text-zinc-500" />
              <span>{currentLangName}</span>
              <ChevronDown className={cn("w-4 h-4 text-zinc-500 transition-transform", isLangOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[60]"
                >
                  <div className="max-h-80 overflow-y-auto">
                    {languages.map((lang) => (
                      <button 
                        key={lang.code}
                        onClick={() => toggleLanguage(lang.code)}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition-colors flex items-center justify-between"
                      >
                        {lang.name}
                        {i18n.language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="min-h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <ChatWidget />
      <FAQBot />
    </div>
  );
}

export default App;

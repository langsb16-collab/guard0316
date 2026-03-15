import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon, ShieldAlert, Loader2, AlertCircle, CheckCircle2, Globe, Users, DollarSign, Calendar, Info } from 'lucide-react';
import { analyzeFraudPattern } from '@/src/services/gemini';
import { cn, getRiskColor, getRiskBg, formatNumber } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { mockProjects } from '@/src/services/mockData';
import { FraudProject } from '@/src/types';

export function SearchAnalysis() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dbMatch, setDbMatch] = useState<FraudProject | null>(null);

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setIsAnalyzing(true);
    setDbMatch(null);
    setResult(null);

    // 1. Check local DB first
    const match = mockProjects.find(p => 
      p.project_name.toLowerCase().includes(query.toLowerCase()) ||
      (p.related_token && p.related_token.toLowerCase() === query.toLowerCase())
    );

    if (match) {
      setDbMatch(match);
      setIsAnalyzing(false);
      return;
    }

    // 2. Fallback to AI Analysis
    const analysis = await analyzeFraudPattern(query);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <header className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-white tracking-tight">{t('search')} & {t('analyze')}</h2>
        <p className="text-zinc-500 text-lg">
          {t('hero_subtitle')}
        </p>
      </header>

      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <SearchIcon className="text-zinc-500 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
        </div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search_placeholder')}
          className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 min-h-[120px] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
        />
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !query.trim()}
          className="absolute bottom-4 right-4 bg-emerald-500 text-zinc-950 px-6 py-2 rounded-xl font-bold hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4" />
              {t('analyze')}
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {dbMatch && (
          <motion.div
            key="db-match"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-zinc-900 border border-red-500/30 rounded-3xl overflow-hidden"
          >
            <div className="bg-red-500/10 p-4 border-b border-red-500/20 flex items-center gap-2">
              <AlertCircle className="text-red-500 w-5 h-5" />
              <span className="text-red-500 font-bold text-sm uppercase tracking-widest">{t('db_match_found')}</span>
            </div>
            
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-3xl font-black text-white mb-2">{dbMatch.project_name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs font-bold uppercase">{dbMatch.category}</span>
                    <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-xs font-bold uppercase">{dbMatch.fraud_type}</span>
                    {dbMatch.related_token && <span className="px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded-full text-xs font-bold uppercase">Token: {dbMatch.related_token}</span>}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    <Info className="w-4 h-4 text-zinc-500" />
                    {t('fraud_method')}
                  </h4>
                  <p className="text-zinc-400 leading-relaxed">{dbMatch.fraud_method}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-zinc-950/50 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-zinc-500 mb-1">
                      <Globe className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-bold tracking-tighter">{t('country')}</span>
                    </div>
                    <p className="text-white font-bold">{dbMatch.country}</p>
                  </div>
                  <div className="bg-zinc-950/50 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-zinc-500 mb-1">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-bold tracking-tighter">{t('active_period')}</span>
                    </div>
                    <p className="text-white font-bold">{dbMatch.launch_year} - {dbMatch.collapse_year || 'Present'}</p>
                  </div>
                  <div className="bg-zinc-950/50 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-zinc-500 mb-1">
                      <DollarSign className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-bold tracking-tighter">{t('damage_estimate')}</span>
                    </div>
                    <p className="text-white font-bold">{dbMatch.damage_estimate}</p>
                  </div>
                  <div className="bg-zinc-950/50 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-zinc-500 mb-1">
                      <Users className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-bold tracking-tighter">{t('victims')}</span>
                    </div>
                    <p className="text-white font-bold">{dbMatch.victims.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950 p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">{t('risk_score')}</span>
                <div className={cn(
                  "text-7xl font-black mb-4",
                  getRiskColor(dbMatch.risk_score)
                )}>
                  {dbMatch.risk_score}
                </div>
                <div className={cn(
                  "px-4 py-1 rounded-full text-xs font-bold uppercase",
                  dbMatch.status === 'collapsed' ? "bg-red-500/20 text-red-500" : "bg-orange-500/20 text-orange-500"
                )}>
                  {dbMatch.status}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div
            key="ai-result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "p-8 rounded-3xl border",
              getRiskBg(result.riskScore)
            )}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 flex flex-col items-center justify-center p-6 bg-zinc-950/50 rounded-2xl border border-white/5 min-w-[200px]">
                <span className="text-zinc-500 text-sm font-medium mb-2 uppercase tracking-wider">{t('risk_score')}</span>
                <span className={cn("text-6xl font-black", getRiskColor(result.riskScore))}>
                  {result.riskScore}
                </span>
                <span className="text-zinc-400 text-sm mt-2 font-medium capitalize">{result.fraudType}</span>
              </div>

              <div className="flex-grow space-y-6">
                <div>
                  <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                    {result.riskScore >= 70 ? <AlertCircle className="text-red-500" /> : <CheckCircle2 className="text-emerald-500" />}
                    {t('ai_analysis_summary')}
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">{result.summary}</p>
                </div>

                {result.redFlags.length > 0 && (
                  <div>
                    <h4 className="text-white font-bold mb-3">{t('detected_red_flags')}</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.redFlags.map((flag: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-400 bg-zinc-950/30 p-3 rounded-xl border border-white/5">
                          <span className="text-red-500 mt-1">•</span>
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

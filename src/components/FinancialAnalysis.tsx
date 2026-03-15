import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Landmark, Search, Loader2, ArrowRight, TrendingDown, AlertTriangle, Activity, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const mockTransactionData = [
  { time: '09:00', amount: 1200 },
  { time: '10:00', amount: 4500 },
  { time: '11:00', amount: 8900 },
  { time: '12:00', amount: 2300 },
  { time: '13:00', amount: 15000 },
  { time: '14:00', amount: 42000 },
  { time: '15:00', amount: 12000 },
  { time: '16:00', amount: 5000 },
];

export function FinancialAnalysis() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeFinancial = async () => {
    if (!query.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockResult = {
      riskScore: 94,
      status: "High Risk",
      patterns: [
        "Rapid layering of funds across 12+ accounts",
        "Large transfers to known high-risk exchanges",
        "Structuring (smurfing) detected in small deposits",
        "Circular fund flow pattern identified"
      ],
      flowNodes: [
        { id: 'A', label: 'Source Account', amount: '150,000' },
        { id: 'B', label: 'Layer 1 (Mixer)', amount: '45,000 x 3' },
        { id: 'C', label: 'Layer 2 (Mules)', amount: '5,000 x 27' },
        { id: 'D', label: 'Final Exit (Crypto)', amount: '132,000' },
      ]
    };

    setResult(mockResult);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{t('financial_title')}</h2>
        <p className="text-zinc-500">{t('financial_subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 space-y-6">
            <div className="space-y-4">
              <label className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{t('account_search')}</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter account or wallet address..."
                  className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
            </div>

            <button
              onClick={analyzeFinancial}
              disabled={!query.trim() || isAnalyzing}
              className="w-full bg-emerald-500 text-zinc-950 py-4 rounded-2xl font-bold hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('analyze')}...
                </>
              ) : (
                <>
                  <Activity className="w-5 h-5" />
                  {t('analyze')}
                </>
              )}
            </button>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              Recent Abnormal Patterns
            </h3>
            <div className="space-y-3">
              {[
                { type: 'Structuring', risk: 'High', time: '5m ago' },
                { type: 'Rapid Exit', risk: 'Critical', time: '12m ago' },
                { type: 'Dormant Reactivation', risk: 'Moderate', time: '1h ago' },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-950/50 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-white text-xs font-bold">{item.type}</p>
                    <p className="text-zinc-600 text-[10px]">{item.time}</p>
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase px-2 py-0.5 rounded-full",
                    item.risk === 'Critical' ? "bg-red-500/10 text-red-500" : "bg-orange-500/10 text-orange-500"
                  )}>
                    {item.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">{t('risk_score_financial')}</span>
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="58" fill="none" stroke="#18181b" strokeWidth="12" />
                        <circle 
                          cx="64" cy="64" r="58" fill="none" stroke="#ef4444" strokeWidth="12" 
                          strokeDasharray={364} strokeDashoffset={364 - (364 * result.riskScore / 100)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-3xl font-black text-white">{result.riskScore}</span>
                    </div>
                    <p className="mt-4 text-red-500 font-bold uppercase tracking-widest text-sm">{result.status}</p>
                  </div>

                  <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8 space-y-4">
                    <h3 className="text-white font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      {t('detected_red_flags')}
                    </h3>
                    <div className="space-y-3">
                      {result.patterns.map((p: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 text-zinc-400 text-xs leading-relaxed">
                          <div className="w-1 h-1 rounded-full bg-red-500 mt-1.5 shrink-0" />
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
                  <h3 className="text-white font-bold mb-8 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-emerald-500" />
                    {t('flow_analysis')}
                  </h3>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
                    {result.flowNodes.map((node: any, i: number) => (
                      <React.Fragment key={node.id}>
                        <div className="bg-zinc-950 border border-white/10 p-4 rounded-2xl w-full md:w-40 text-center relative z-10">
                          <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1">{node.label}</p>
                          <p className="text-white font-black text-sm">${node.amount}</p>
                        </div>
                        {i < result.flowNodes.length - 1 && (
                          <ArrowRight className="w-6 h-6 text-zinc-700 rotate-90 md:rotate-0" />
                        )}
                      </React.Fragment>
                    ))}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-800 -translate-y-1/2 hidden md:block" />
                  </div>
                </div>

                <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
                  <h3 className="text-white font-bold mb-6">Transaction Velocity Analysis</h3>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockTransactionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="time" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                          itemStyle={{ color: '#10b981' }}
                        />
                        <Area type="monotone" dataKey="amount" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-zinc-900/50 border border-white/5 border-dashed rounded-3xl h-[600px] flex flex-col items-center justify-center p-12 text-center">
                <Landmark className="w-16 h-16 text-zinc-800 mb-4" />
                <p className="text-zinc-600 font-medium">Search for an account or wallet to analyze transaction patterns and fund flows.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

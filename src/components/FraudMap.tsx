import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, AlertCircle, Info, TrendingUp, ShieldAlert, Globe, ArrowUpRight, Loader2, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const locations = [
  { id: 1, city: 'seoul', risk: 'high', count: 1240, x: 35, y: 22 },
  { id: 2, city: 'busan', risk: 'moderate', count: 860, x: 75, y: 75 },
  { id: 3, city: 'incheon', risk: 'high', count: 950, x: 28, y: 24 },
  { id: 4, city: 'daegu', risk: 'moderate', count: 680, x: 68, y: 62 },
  { id: 5, city: 'gwangju', risk: 'low', count: 420, x: 32, y: 78 },
  { id: 6, city: 'daejeon', risk: 'moderate', count: 540, x: 45, y: 45 },
  { id: 7, city: 'ulsan', risk: 'low', count: 310, x: 82, y: 68 },
  { id: 8, city: 'jeju', risk: 'low', count: 150, x: 30, y: 92 },
];

export function FraudMap() {
  const { t } = useTranslation();

  return (
    <div className="p-8 space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{t('fraud_map')}</h2>
        <p className="text-zinc-500">{t('fraud_map_subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl overflow-hidden relative">
            <div className="absolute top-8 right-8 z-10 bg-zinc-950/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{t('legend')}</h4>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                <span className="text-xs text-zinc-400">{t('high_risk_area')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                <span className="text-xs text-zinc-400">{t('moderate_risk_area')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-xs text-zinc-400">{t('low_risk_area')}</span>
              </div>
            </div>

            <div className="aspect-[4/5] relative bg-zinc-950/50 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden">
              <div className="absolute top-4 right-4 z-20 space-y-3">
                <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl w-48">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-3 h-3 text-emerald-500" />
                    <h4 className="text-white text-[10px] font-bold uppercase tracking-widest">AI Prediction</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 text-[8px]">Next 24h Risk</span>
                      <span className="text-red-500 text-[10px] font-bold">+12.4%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full w-[75%]" />
                    </div>
                    <p className="text-[8px] text-zinc-400 leading-relaxed italic">
                      "High probability of investment scam surge in Seoul detected."
                    </p>
                  </div>
                </div>
              </div>

              <svg viewBox="0 0 400 500" className="w-full h-full text-zinc-800/20 fill-current stroke-zinc-700/30 stroke-[0.5]">
                <path d="M150,50 L180,40 L220,60 L240,100 L230,150 L250,200 L240,250 L260,300 L240,350 L220,400 L180,420 L140,400 L120,350 L100,300 L110,250 L100,200 L120,150 L110,100 L130,70 Z" />
                <path d="M250,200 L280,180 L320,200 L340,250 L320,300 L280,320 L250,300 Z" />
                <path d="M180,420 L200,450 L240,470 L280,460 L300,430 L280,400 L240,390 Z" />
              </svg>

              {locations.map((loc) => (
                <motion.div
                  key={loc.city}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full animate-ping absolute inset-0",
                    loc.risk === 'high' ? "bg-red-500" : loc.risk === 'moderate' ? "bg-orange-500" : "bg-emerald-500"
                  )} />
                  <div className={cn(
                    "w-4 h-4 rounded-full relative z-10 border-2 border-zinc-950",
                    loc.risk === 'high' ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]" : 
                    loc.risk === 'moderate' ? "bg-orange-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]" : 
                    "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                  )} />
                  
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20">
                    <div className="bg-zinc-900 border border-white/10 p-3 rounded-xl shadow-2xl min-w-[120px]">
                      <p className="text-white font-bold text-sm">{t(loc.city)}</p>
                      <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">{loc.count} {t('cases')}</p>
                      <div className={cn(
                        "mt-1 text-[10px] font-black uppercase",
                        loc.risk === 'high' ? "text-red-500" : loc.risk === 'moderate' ? "text-orange-500" : "text-emerald-500"
                      )}>
                        {t(loc.risk)} {t('risk')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              {t('regional_stats')}
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locations.map(l => ({ ...l, city: t(l.city) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="city" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              {t('live_alerts')}
            </h3>
            <div className="space-y-4">
              {[
                { city: 'seoul', type: 'crypto', time: '2m ago', amount: '450M' },
                { city: 'busan', type: 'investment', time: '15m ago', amount: '1.2B' },
                { city: 'incheon', type: 'mlm', time: '1h ago', amount: '80M' },
                { city: 'daegu', type: 'crypto', time: '3h ago', amount: '210M' },
              ].map((alert, i) => (
                <div key={i} className="bg-zinc-950/50 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-red-500/30 transition-all">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-bold text-sm">{t(alert.city)}</span>
                      <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase">{t(alert.type)}</span>
                    </div>
                    <p className="text-zinc-500 text-xs">{alert.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-sm">${alert.amount} {t('currency')}</p>
                    <ArrowUpRight className="w-3 h-3 text-red-500 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-500" />
              {t('fraud_network')}
            </h3>
            <p className="text-zinc-500 text-sm mb-6">{t('fraud_network_desc')}</p>
            <div className="aspect-square bg-zinc-950/50 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="2" fill="white" />
                  <circle cx="30" cy="30" r="1.5" fill="white" />
                  <circle cx="70" cy="30" r="1.5" fill="white" />
                  <circle cx="30" cy="70" r="1.5" fill="white" />
                  <circle cx="70" cy="70" r="1.5" fill="white" />
                  <line x1="50" y1="50" x2="30" y2="30" stroke="white" strokeWidth="0.2" />
                  <line x1="50" y1="50" x2="70" y2="30" stroke="white" strokeWidth="0.2" />
                  <line x1="50" y1="50" x2="30" y2="70" stroke="white" strokeWidth="0.2" />
                  <line x1="50" y1="50" x2="70" y2="70" stroke="white" strokeWidth="0.2" />
                </svg>
              </div>
              <div className="text-center z-10">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto mb-4" />
                <p className="text-zinc-400 text-xs font-medium">Initializing Graph Engine...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-red-500/10 rounded-xl">
            <AlertCircle className="text-red-500 w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">{t('active_hotspots')}</h4>
            <p className="text-zinc-500 text-sm">{t('active_hotspots_desc')}</p>
          </div>
        </div>
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <Info className="text-emerald-500 w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">{t('safe_zones')}</h4>
            <p className="text-zinc-500 text-sm">{t('safe_zones_desc')}</p>
          </div>
        </div>
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-orange-500/10 rounded-xl">
            <MapPin className="text-orange-500 w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">{t('new_patterns')}</h4>
            <p className="text-zinc-500 text-sm">{t('new_patterns_desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

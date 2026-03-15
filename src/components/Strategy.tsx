import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Target, Globe, Shield, Zap, BarChart3, Rocket, Award } from 'lucide-react';
import { motion } from 'motion/react';

const strategySteps = [
  {
    icon: <Target className="w-6 h-6 text-emerald-500" />,
    title: "data_monopoly",
    description: "data_monopoly_desc",
    target: "100k+ Data Points"
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-500" />,
    title: "saas_model",
    description: "saas_model_desc",
    target: "B2B/B2C SaaS"
  },
  {
    icon: <Shield className="w-6 h-6 text-purple-500" />,
    title: "financial_api",
    description: "financial_api_desc",
    target: "Institutional Integration"
  },
  {
    icon: <Globe className="w-6 h-6 text-orange-500" />,
    title: "global_expansion",
    description: "global_expansion_desc",
    target: "Global Market Leader"
  }
];

const valuationStages = [
  { stage: 'initial_stage', value: '20B KRW', description: 'initial_stage_desc' },
  { stage: 'growth_stage', value: '100B KRW', description: 'growth_stage_desc' },
  { stage: 'global_stage', value: '1T+ KRW', description: 'global_stage_desc' },
];

export function Strategy() {
  const { t } = useTranslation();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-xs font-bold uppercase tracking-widest">
          <TrendingUp className="w-3 h-3" />
          {t('strategy')}
        </div>
        <h2 className="text-5xl font-black text-white tracking-tight">{t('unicorn_roadmap')}</h2>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
          {t('strategy_desc')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {strategySteps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900 border border-white/5 p-8 rounded-3xl hover:border-emerald-500/30 transition-all group"
          >
            <div className="p-3 bg-zinc-950 rounded-2xl border border-white/5 w-fit mb-6 group-hover:scale-110 transition-transform">
              {step.icon}
            </div>
            <h3 className="text-white font-bold text-xl mb-3">{t(step.title)}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">{t(step.description)}</p>
            <div className="pt-4 border-t border-white/5">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Goal</span>
              <p className="text-emerald-500 font-bold text-sm">{step.target}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900 border border-white/5 rounded-3xl p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="text-emerald-500" />
              {t('valuation_roadmap')}
            </h3>
            <Rocket className="text-zinc-700 animate-bounce" />
          </div>
          
          <div className="relative pt-12 pb-4">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-800 -translate-y-1/2 rounded-full" />
            <div className="relative flex justify-between">
              {valuationStages.map((v, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4 relative z-10">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-zinc-900 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                  <div>
                    <p className="text-white font-black text-xl">{v.value}</p>
                    <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest">{t(v.stage)}</p>
                    <p className="text-zinc-500 text-[10px] mt-1">{t(v.description)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-emerald-500 p-8 rounded-3xl flex flex-col justify-between group cursor-pointer overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-150 transition-transform">
            <Award className="w-32 h-32 text-zinc-950" />
          </div>
          <div className="relative z-10">
            <h3 className="text-zinc-950 font-black text-3xl leading-tight mb-4">
              {t('ultimate_platform')}
            </h3>
            <p className="text-zinc-900 font-medium leading-relaxed">
              {t('ultimate_platform_desc')}
            </p>
          </div>
          <div className="relative z-10 pt-8">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-emerald-500 bg-zinc-900 flex items-center justify-center text-[10px] font-bold text-white">
                  {i}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-emerald-500 bg-zinc-950 flex items-center justify-center text-[10px] font-bold text-white">
                +
              </div>
            </div>
            <p className="text-zinc-950 text-xs font-bold mt-4 uppercase tracking-widest">{t('global_partners')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

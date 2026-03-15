import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  FileText,
  Mic,
  Scale,
  Network,
  Landmark,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn, formatNumber } from '@/src/lib/utils';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1'];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-white/5 rounded-lg">
        <Icon className="w-5 h-5 text-emerald-500" />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
        trend === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
      )}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}%
      </div>
    </div>
    <h3 className="text-zinc-400 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

export function Dashboard() {
  const { t } = useTranslation();

  const pieData = [
    { name: t('crypto'), value: 45 },
    { name: t('investment'), value: 30 },
    { name: t('mlm'), value: 15 },
    { name: t('other'), value: 10 },
  ];

  return (
    <div className="p-8 space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{t('dashboard')}</h2>
        <p className="text-zinc-500">{t('dashboard_subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t('total_fraud_detected')} 
          value={formatNumber(12480)} 
          change={12.5} 
          icon={AlertTriangle} 
          trend="up" 
        />
        <StatCard 
          title={t('active_investigations')} 
          value={formatNumber(342)} 
          change={4.2} 
          icon={Users} 
          trend="up" 
        />
        <StatCard 
          title={t('total_damage_est')} 
          value={`$${formatNumber(2400000)} ${t('currency')}`} 
          change={8.1} 
          icon={DollarSign} 
          trend="up" 
        />
        <StatCard 
          title={t('safety_index')} 
          value="64.2%" 
          change={2.4} 
          icon={TrendingUp} 
          trend="down" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Platform Capabilities</h3>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-widest">100+ AI Modules</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'AI Fraud Prediction', icon: Activity },
              { label: 'OCR Forgery Detection', icon: FileText },
              { label: 'Voice Phishing Analysis', icon: Mic },
              { label: 'Legal AI Complaint Gen', icon: Scale },
              { label: 'Network Cluster Analysis', icon: Network },
              { label: 'Financial Flow Tracking', icon: Landmark },
              { label: 'SMS Smishing Analysis', icon: MessageSquare },
              { label: 'Crypto Scam Detection', icon: ShieldAlert },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-zinc-950 p-3 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all cursor-default group">
                <feature.icon className="w-4 h-4 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                <span className="text-[10px] text-zinc-400 font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">{t('fraud_trends')}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">{t('fraud_distribution')}</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-xs text-zinc-400">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

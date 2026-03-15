import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Search, 
  ShieldAlert, 
  TrendingUp, 
  Network, 
  MessageSquare, 
  HelpCircle,
  Settings,
  Globe,
  FileText,
  Scale,
  Mic,
  Landmark
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'dashboard', id: 'dashboard' },
  { icon: Search, label: 'search', id: 'search' },
  { icon: ShieldAlert, label: 'report_scam', id: 'report' },
  { icon: Globe, label: 'fraud_map', id: 'trend' },
  { icon: Network, label: 'network', id: 'network' },
  { icon: FileText, label: 'ocr_analysis', id: 'ocr' },
  { icon: Scale, label: 'legal_ai', id: 'legal' },
  { icon: Mic, label: 'voice_analysis', id: 'voice' },
  { icon: MessageSquare, label: 'sms_analysis', id: 'sms' },
  { icon: Landmark, label: 'financial_analysis', id: 'financial' },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { t } = useTranslation();

  return (
    <aside className="w-64 bg-zinc-950 border-r border-white/10 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <ShieldAlert className="text-zinc-950 w-5 h-5" />
          </div>
          <h1 className="font-bold text-xl tracking-tight text-white">FraudGuard AI</h1>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                activeTab === item.id 
                  ? "bg-emerald-500 text-zinc-950 font-medium" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                activeTab === item.id ? "text-zinc-950" : "text-zinc-500 group-hover:text-emerald-500"
              )} />
              <span className="capitalize">{t(item.label)}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">{t('safety_status')}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-400 font-medium">{t('real_time_monitoring')}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

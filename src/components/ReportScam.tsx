import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, Clock, CheckCircle2, AlertCircle, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const sampleReports = [
  { id: 'RPT-2024-001', type: 'crypto', amount: '$12,500', date: '2024-03-14 14:20', status: 'investigating', location: 'Seoul, KR' },
  { id: 'RPT-2024-002', type: 'investment', amount: '$45,000', date: '2024-03-14 11:05', status: 'pending', location: 'Busan, KR' },
  { id: 'RPT-2024-003', type: 'mlm', amount: '$3,200', date: '2024-03-13 18:45', status: 'resolved', location: 'Incheon, KR' },
  { id: 'RPT-2024-004', type: 'crypto', amount: '$8,900', date: '2024-03-13 09:12', status: 'investigating', location: 'Daegu, KR' },
  { id: 'RPT-2024-005', type: 'other', amount: '$1,500', date: '2024-03-12 22:30', status: 'pending', location: 'Gwangju, KR' },
];

export function ReportScam() {
  const { t } = useTranslation();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'investigating': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'resolved': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return t('status_pending');
      case 'investigating': return t('status_investigating');
      case 'resolved': return t('status_resolved');
      default: return status;
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{t('report_title')}</h2>
        <p className="text-zinc-500">{t('report_subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {sampleReports.map((report) => (
          <div key={report.id} className="bg-zinc-900 border border-white/5 p-6 rounded-3xl hover:border-emerald-500/30 transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-zinc-800 rounded-2xl group-hover:bg-emerald-500/10 transition-colors">
                  <ShieldAlert className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white font-bold">{report.id}</span>
                    <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {t(report.type)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {report.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {report.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                <div className="text-right">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">{t('damage_estimate')}</p>
                  <p className="text-white font-black text-xl">{report.amount}</p>
                </div>
                <div className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border",
                  report.status === 'pending' ? "bg-orange-500/10 border-orange-500/20 text-orange-500" :
                  report.status === 'investigating' ? "bg-blue-500/10 border-blue-500/20 text-blue-500" :
                  "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                )}>
                  {getStatusIcon(report.status)}
                  {getStatusText(report.status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Search, Loader2, AlertCircle, ShieldAlert, Link as LinkIcon, Phone, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { GoogleGenAI } from "@google/genai";

export function SMSAnalysis() {
  const { t } = useTranslation();
  const [smsText, setSmsText] = useState('');
  const [sender, setSender] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeSMS = async () => {
    if (!smsText.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            text: `Analyze this SMS message for phishing (smishing) and fraud.
            Sender: ${sender || 'Unknown'}
            Message: ${smsText}
            
            Return the result in JSON format with fields:
            phishingProbability: number (0-100),
            senderRisk: string (High, Moderate, Low),
            detectedLinks: string array (extracted URLs),
            redFlags: string array (specific suspicious patterns),
            summary: string (brief AI explanation),
            isInternational: boolean (if sender looks international).`,
          },
        ],
        config: {
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text || "{}");
      setResult(data);
    } catch (error) {
      console.error("SMS Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{t('sms_title')}</h2>
        <p className="text-zinc-500">{t('sms_subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Phone className="w-3 h-3" />
                Sender Number
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="e.g., 010-1234-5678 or +82..."
                className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="w-3 h-3" />
                Message Content
              </label>
              <textarea
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                placeholder="Paste the suspicious text message here..."
                className="w-full h-40 bg-zinc-950 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
              />
            </div>

            <button
              onClick={analyzeSMS}
              disabled={!smsText.trim() || isAnalyzing}
              className="w-full bg-emerald-500 text-zinc-950 py-4 rounded-2xl font-bold hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('analyze')}...
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5" />
                  {t('analyze_sms')}
                </>
              )}
            </button>
          </div>

          <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4">
            <h4 className="text-white text-xs font-bold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-orange-500" />
              Common Phishing Patterns
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {['Government Grants', 'Delivery Issues', 'Account Locked', 'Prize Winner'].map((tag) => (
                <div key={tag} className="bg-zinc-950 px-3 py-2 rounded-lg text-[10px] text-zinc-500 border border-white/5">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-zinc-900 border border-white/5 rounded-3xl p-8 space-y-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">{t('sms_result')}</h3>
                  <p className="text-zinc-500 text-sm">{t('ai_analysis_summary')}</p>
                </div>
                <div className={cn(
                  "flex flex-col items-center p-4 rounded-2xl border",
                  result.phishingProbability > 70 ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                )}>
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-1">{t('phishing_probability')}</span>
                  <span className="text-3xl font-black">{result.phishingProbability}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950 p-4 rounded-2xl border border-white/5">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1">{t('sender_risk')}</p>
                  <p className={cn(
                    "text-lg font-black",
                    result.senderRisk === 'High' ? "text-red-500" : "text-emerald-500"
                  )}>{result.senderRisk}</p>
                </div>
                <div className="bg-zinc-950 p-4 rounded-2xl border border-white/5">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1">International</p>
                  <p className="text-lg font-black text-white">{result.isInternational ? 'YES' : 'NO'}</p>
                </div>
              </div>

              {result.detectedLinks?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-zinc-500" />
                    {t('detected_links')}
                  </h4>
                  <div className="space-y-2">
                    {result.detectedLinks.map((link: string, i: number) => (
                      <div key={i} className="bg-zinc-950 p-3 rounded-xl border border-red-500/20 text-red-400 text-xs font-mono break-all">
                        {link}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-white font-bold">{t('detected_red_flags')}</h4>
                <div className="space-y-2">
                  {result.redFlags.map((flag: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 bg-zinc-950/50 p-3 rounded-xl border border-white/5">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <p className="text-zinc-400 text-xs">{flag}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl">
                <p className="text-emerald-400 text-xs leading-relaxed">
                  <span className="font-bold uppercase mr-2">AI Summary:</span>
                  {result.summary}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-zinc-900/50 border border-white/5 border-dashed rounded-3xl flex flex-col items-center justify-center p-12 text-center">
              <MessageSquare className="w-16 h-16 text-zinc-800 mb-4" />
              <p className="text-zinc-600 font-medium">Paste a suspicious SMS to see AI phishing analysis results here.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

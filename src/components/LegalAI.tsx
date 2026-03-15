import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Scale, FileText, Loader2, Download, AlertTriangle, BookOpen, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { GoogleGenAI } from "@google/genai";

export function LegalAI() {
  const { t } = useTranslation();
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeLegal = async () => {
    if (!description.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            text: `Analyze this fraud case description for legal implications and generate a criminal complaint draft.
            Case Description: ${description}
            
            Return the result in JSON format with fields:
            applicableLaws: string array (e.g., ["Criminal Act Article 347 (Fraud)", "Electronic Financial Transactions Act"]),
            punishmentPossibility: string (e.g., "High", "Moderate", "Low"),
            legalAnalysis: string (detailed analysis of why it fits these laws),
            complaintDraft: string (a formal criminal complaint draft in Korean if the user is in Korea, otherwise English),
            evidenceList: string array (suggested evidence to collect).`,
          },
        ],
        config: {
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text || "{}");
      setResult(data);
    } catch (error) {
      console.error("Legal AI Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{t('legal_title')}</h2>
        <p className="text-zinc-500">{t('legal_subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 space-y-4">
            <label className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{t('case_description')}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the fraud incident in detail (e.g., amount, method, suspect info)..."
              className="w-full h-[300px] bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
            />
            <button
              onClick={analyzeLegal}
              disabled={!description.trim() || isAnalyzing}
              className="w-full bg-emerald-500 text-zinc-950 py-4 rounded-2xl font-bold hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('analyze')}...
                </>
              ) : (
                <>
                  <Scale className="w-5 h-5" />
                  {t('generate_complaint')}
                </>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-zinc-900 border border-white/5 rounded-3xl p-8 space-y-8 overflow-y-auto max-h-[800px]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">{t('legal_analysis')}</h3>
                  <p className="text-zinc-500 text-sm">{t('ai_analysis_summary')}</p>
                </div>
                <div className={cn(
                  "px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest",
                  result.punishmentPossibility === 'High' ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                )}>
                  {result.punishmentPossibility} Probability
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-zinc-500" />
                  {t('applicable_laws')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.applicableLaws?.map((law: string, i: number) => (
                    <span key={i} className="bg-zinc-950 border border-white/10 px-3 py-1.5 rounded-lg text-zinc-300 text-xs">
                      {law}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-zinc-500" />
                  {t('legal_analysis')}
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{result.legalAnalysis}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-zinc-500" />
                    Complaint Draft
                  </h4>
                  <button className="text-emerald-500 hover:text-emerald-400 text-xs font-bold flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Download PDF
                  </button>
                </div>
                <div className="bg-zinc-950 p-6 rounded-2xl border border-white/5 font-serif text-zinc-300 text-sm leading-loose whitespace-pre-wrap">
                  {result.complaintDraft}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-500" />
                  Suggested Evidence
                </h4>
                <ul className="space-y-2">
                  {result.evidenceList?.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-400 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="bg-zinc-900/50 border border-white/5 border-dashed rounded-3xl flex flex-col items-center justify-center p-12 text-center">
              <Scale className="w-16 h-16 text-zinc-800 mb-4" />
              <p className="text-zinc-600 font-medium">Enter case details to generate legal analysis and complaint drafts.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

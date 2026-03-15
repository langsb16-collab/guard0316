import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Upload, Loader2, AlertCircle, CheckCircle2, ShieldCheck, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { GoogleGenAI } from "@google/genai";

export function OCRAnalysis() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const analyzeDocument = async () => {
    if (!preview) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const base64Data = preview.split(',')[1];
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: file?.type || "image/jpeg",
                  data: base64Data,
                },
              },
              {
                text: `Analyze this document for forgery and fraud. 
                Perform the following checks:
                1. OCR Text Extraction: Extract all readable text.
                2. Forgery Risk Score: Provide a score from 0-100.
                3. Signature Analysis: Check if the signature looks authentic or forged (e.g., pixelation, unnatural strokes).
                4. Font Consistency: Check if fonts are consistent or if some parts look edited/pasted.
                5. Structural Analysis: Check for misalignments or suspicious layouts.
                
                Return the result in JSON format with fields: 
                extractedText (string), 
                forgeryRisk (number), 
                redFlags (string array), 
                summary (string),
                signatureStatus (string: 'Authentic', 'Suspicious', 'Not Found'),
                fontConsistency (string: 'High', 'Low', 'Mixed').`,
              },
            ],
          },
        ],
        config: {
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text || "{}");
      setResult(data);
    } catch (error) {
      console.error("OCR Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{t('ocr_title')}</h2>
        <p className="text-zinc-500">{t('ocr_subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div 
            className={cn(
              "aspect-video bg-zinc-900 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 transition-all relative overflow-hidden group",
              preview ? "border-emerald-500/50" : "hover:border-emerald-500/30"
            )}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-contain" />
            ) : (
              <>
                <Upload className="w-12 h-12 text-zinc-600 mb-4 group-hover:text-emerald-500 transition-colors" />
                <p className="text-zinc-500 font-medium">{t('upload_doc')}</p>
                <p className="text-zinc-700 text-xs mt-2">JPG, PNG, PDF up to 10MB</p>
              </>
            )}
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </div>

          <button
            onClick={analyzeDocument}
            disabled={!preview || isAnalyzing}
            className="w-full bg-emerald-500 text-zinc-950 py-4 rounded-2xl font-bold hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('analyze')}...
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                {t('analyze_doc')}
              </>
            )}
          </button>
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
                  <h3 className="text-white font-bold text-xl mb-1">{t('ocr_result')}</h3>
                  <p className="text-zinc-500 text-sm">{t('ai_analysis_summary')}</p>
                </div>
                <div className={cn(
                  "flex flex-col items-center p-4 rounded-2xl border",
                  result.forgeryRisk > 70 ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                )}>
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-1">{t('forgery_risk')}</span>
                  <span className="text-3xl font-black">{result.forgeryRisk}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950 p-4 rounded-2xl border border-white/5">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1">Signature Status</p>
                  <p className={cn(
                    "text-lg font-black",
                    result.signatureStatus === 'Suspicious' ? "text-red-500" : "text-emerald-500"
                  )}>{result.signatureStatus}</p>
                </div>
                <div className="bg-zinc-950 p-4 rounded-2xl border border-white/5">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1">Font Consistency</p>
                  <p className={cn(
                    "text-lg font-black",
                    result.fontConsistency === 'Low' ? "text-red-500" : "text-emerald-500"
                  )}>{result.fontConsistency}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <Info className="w-4 h-4 text-zinc-500" />
                  {t('extracted_text')}
                </h4>
                <div className="bg-zinc-950 p-4 rounded-2xl border border-white/5 max-h-[200px] overflow-y-auto">
                  <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">{result.extractedText}</p>
                </div>
              </div>

              {result.redFlags?.length > 0 && (
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
              )}
            </motion.div>
          ) : (
            <div className="bg-zinc-900/50 border border-white/5 border-dashed rounded-3xl flex flex-col items-center justify-center p-12 text-center">
              <FileText className="w-16 h-16 text-zinc-800 mb-4" />
              <p className="text-zinc-600 font-medium">Upload a document to see AI analysis results here.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

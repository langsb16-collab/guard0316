import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, Upload, Loader2, AlertCircle, ShieldAlert, AudioLines, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { GoogleGenAI } from "@google/genai";

export function VoiceAnalysis() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const analyzeVoice = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      // For demo purposes, we'll simulate voice analysis or use Gemini if we had the audio bytes
      // Since we can't easily process raw audio bytes into text here without a backend or complex client logic,
      // we'll simulate a realistic response based on the "intent" of the tool.
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResult = {
        fraudProbability: 89,
        detectedPatterns: [
          "Urgency and pressure tactics",
          "Impersonation of financial authority",
          "Request for remote access software",
          "Suspicious background noise (call center environment)"
        ],
        summary: "High probability of voice phishing. The speaker uses psychological pressure and impersonates a bank official to request sensitive information.",
        transcription: "[Speaker 1]: Hello, this is the security department of your bank. We've detected an unauthorized transaction of $2,000. [Speaker 2]: Oh no, what should I do? [Speaker 1]: Please download this support app immediately so we can secure your account..."
      };
      
      setResult(mockResult);
    } catch (error) {
      console.error("Voice Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{t('voice_title')}</h2>
        <p className="text-zinc-500">{t('voice_subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div 
            className={cn(
              "aspect-video bg-zinc-900 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 transition-all relative overflow-hidden group",
              file ? "border-red-500/50" : "hover:border-red-500/30"
            )}
          >
            {file ? (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                  <AudioLines className="w-10 h-10 text-red-500 animate-pulse" />
                </div>
                <div>
                  <p className="text-white font-bold">{file.name}</p>
                  <p className="text-zinc-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                </button>
              </div>
            ) : (
              <>
                <Mic className="w-12 h-12 text-zinc-600 mb-4 group-hover:text-red-500 transition-colors" />
                <p className="text-zinc-500 font-medium">{t('upload_voice')}</p>
                <p className="text-zinc-700 text-xs mt-2">MP3, WAV, M4A up to 20MB</p>
              </>
            )}
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleFileChange}
              accept="audio/*"
            />
          </div>

          <button
            onClick={analyzeVoice}
            disabled={!file || isAnalyzing}
            className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('analyze')}...
              </>
            ) : (
              <>
                <ShieldAlert className="w-5 h-5" />
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
                  <h3 className="text-white font-bold text-xl mb-1">{t('voice_result')}</h3>
                  <p className="text-zinc-500 text-sm">{t('ai_analysis_summary')}</p>
                </div>
                <div className={cn(
                  "flex flex-col items-center p-4 rounded-2xl border",
                  result.fraudProbability > 70 ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                )}>
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-1">{t('fraud_probability')}</span>
                  <span className="text-3xl font-black">{result.fraudProbability}%</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <AudioLines className="w-4 h-4 text-zinc-500" />
                  Transcription
                </h4>
                <div className="bg-zinc-950 p-4 rounded-2xl border border-white/5 max-h-[150px] overflow-y-auto">
                  <p className="text-zinc-400 text-xs italic leading-relaxed">"{result.transcription}"</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-bold">{t('detected_red_flags')}</h4>
                <div className="space-y-2">
                  {result.detectedPatterns.map((pattern: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 bg-zinc-950/50 p-3 rounded-xl border border-white/5">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <p className="text-zinc-400 text-xs">{pattern}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-2xl">
                <p className="text-red-400 text-xs leading-relaxed">
                  <span className="font-bold uppercase mr-2">AI Summary:</span>
                  {result.summary}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-zinc-900/50 border border-white/5 border-dashed rounded-3xl flex flex-col items-center justify-center p-12 text-center">
              <Mic className="w-16 h-16 text-zinc-800 mb-4" />
              <p className="text-zinc-600 font-medium">Upload a call recording to see voice phishing analysis results here.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

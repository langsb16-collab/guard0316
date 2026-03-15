import React, { useState } from 'react';
import { MessageSquare, X, Send, Camera, Mic, Phone, Video, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true, time: "12:00" },
    { id: 2, text: "I suspect a crypto scam project.", isBot: false, time: "12:01" },
    { id: 3, text: "Please provide the project name or wallet address for analysis.", isBot: true, time: "12:01" },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "Analyzing your request... (Auto-translation active)",
        isBot: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 left-0 w-[380px] h-[60vh] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-blue-600 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                  G
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{t('chat_title')}</h3>
                  <p className="text-blue-100 text-xs flex items-center gap-1">
                    <Globe className="w-3 h-3" /> {t('chat_subtitle')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                  <Video className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-zinc-900/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.isBot 
                      ? 'bg-zinc-800 text-zinc-100 rounded-tl-none' 
                      : 'bg-blue-600 text-white rounded-tr-none'
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 text-right ${msg.isBot ? 'text-zinc-500' : 'text-blue-200'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-zinc-800/50 border-t border-white/5 flex items-center gap-2">
              <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                <Camera className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('chat_placeholder')}
                className="flex-1 bg-zinc-900 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
              />
              {message.trim() ? (
                <button 
                  onClick={handleSend}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              ) : (
                <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/20 text-white hover:bg-blue-500 transition-all"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

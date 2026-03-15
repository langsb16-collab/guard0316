import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { Send, Globe, Image, Mic, Video, Phone, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Message } from '@/src/types';

export function Chat() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [room, setRoom] = useState('global');
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.emit('join-room', room);

    socketRef.current.on('receive-message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [room]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'User',
      text: input,
      timestamp: Date.now(),
      room: room,
    };

    socketRef.current?.emit('send-message', newMessage);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-zinc-950">
      <header className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <Globe className="text-emerald-500 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold">Global Fraud Intelligence Chat</h3>
            <p className="text-xs text-zinc-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              124 users online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Video className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-hide"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={cn(
              "flex flex-col max-w-[80%]",
              msg.sender === 'User' ? "ml-auto items-end" : "items-start"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{msg.sender}</span>
              <span className="text-[10px] text-zinc-600">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className={cn(
              "px-4 py-3 rounded-2xl text-sm leading-relaxed",
              msg.sender === 'User' 
                ? "bg-emerald-500 text-zinc-950 font-medium rounded-tr-none" 
                : "bg-zinc-900 text-white border border-white/5 rounded-tl-none"
            )}>
              {msg.text}
            </div>
            {msg.translation && (
              <div className="mt-1 text-[10px] text-zinc-500 italic flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Translated: {msg.translation}
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="p-4 bg-zinc-900/50 border-t border-white/10">
        <div className="flex items-center gap-2 bg-zinc-950 border border-white/10 rounded-2xl p-2 focus-within:border-emerald-500/50 transition-all">
          <button className="p-2 text-zinc-500 hover:text-emerald-500 transition-colors">
            <Image className="w-5 h-5" />
          </button>
          <button className="p-2 text-zinc-500 hover:text-emerald-500 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-grow bg-transparent border-none focus:ring-0 text-white text-sm py-2"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 bg-emerald-500 text-zinc-950 rounded-xl hover:bg-emerald-400 disabled:opacity-50 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}

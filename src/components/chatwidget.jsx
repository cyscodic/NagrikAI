import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, ExternalLink, HelpCircle, Globe } from 'lucide-react';
import { getChatbotResponseAsync } from '../data/aiResponses';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am NagrikAI Assistant for NDMC Public Services. Ask me about NDMC civic services, filing complaints, SLA timelines, or ward contacts.\n\nनमस्ते! मैं NagrikAI सहायता बॉट हूँ। मुझसे NDMC नागरिक सेवाओं के बारे में पूछें।'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { text: 'How to file a streetlight complaint?', hindi: 'लाइट शिकायत कैसे करें?' },
    { text: 'What is the SLA for sanitation?', hindi: 'सफाई की समय सीमा क्या है?' },
    { text: 'Contact helpline numbers', hindi: 'हेल्पलाइन नंबर' }
  ];

  const handleSend = async (e, textToSend) => {
    if (e) e.preventDefault();
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const rawResponse = await getChatbotResponseAsync(query);
    setIsTyping(false);

    const botText = typeof rawResponse === 'object' && rawResponse !== null 
      ? (rawResponse.reply || JSON.stringify(rawResponse))
      : rawResponse;

    setMessages(prev => [...prev, { sender: 'bot', text: botText }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 rounded-full bg-[#0F172A] hover:bg-[#2563EB] text-white shadow-xl font-bold text-xs flex items-center gap-3 transition-all border border-white/20 hover:scale-105"
        >
          <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center text-white shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div className="text-left leading-tight">
            <div className="font-bold flex items-center gap-1">
              NagrikAI Assistant <Globe className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-[10px] font-normal text-blue-200 font-hindi">नागरिक AI सहायता बॉट</div>
          </div>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-white rounded-2xl border border-slate-300 shadow-2xl flex flex-col overflow-hidden max-h-[520px]">
          
          {/* Header */}
          <div className="bg-[#0F172A] text-white p-4 flex justify-between items-center border-b border-[#2563EB]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-sm block">NagrikAI Assistant</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono border border-emerald-500/40">Live Cloud AI</span>
                </div>
                <span className="text-[10px] text-slate-300 font-hindi">NDMC 24/7 नागरिक सहायता बॉट</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Prompt Chips */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex gap-2 overflow-x-auto text-[11px] scrollbar-none">
            {quickPrompts.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(null, item.text)}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-300 hover:border-[#2563EB] text-[#0F172A] hover:text-[#2563EB] shrink-0 font-semibold transition-colors shadow-2xs"
              >
                {item.text}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3.5 bg-slate-50/50 text-xs min-h-[260px]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-xl leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#2563EB] text-white font-semibold shadow-2xs'
                      : 'bg-white text-[#0F172A] border border-slate-200 shadow-2xs font-medium'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-xl text-xs text-slate-500 italic animate-pulse">
                  NagrikAI Assistant is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={(e) => handleSend(e)} className="p-3 border-t border-slate-200 bg-white flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Ask in English or Hindi / हिंदी में लिखें..."
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#2563EB] text-[#0F172A]"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
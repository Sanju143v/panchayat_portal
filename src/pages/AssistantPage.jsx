import { useState, useRef, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { Mic, MicOff, Send, Bot, User, Sparkles, Zap } from 'lucide-react';

const QUICK_CHIPS = [
  { label: '💧 No water supply', text: 'Pani nahi aa raha hai mere flat mein' },
  { label: '⚡ Power cut', text: 'Bijli nahi hai, power cut ho gaya hai' },
  { label: '🏋️ Gym timing', text: 'What are the gym timings?' },
  { label: '🔧 Plumber chahiye', text: 'Mujhe ek plumber chahiye, pipe leak ho raha hai' },
  { label: '📅 Upcoming events', text: 'What are the upcoming events in society?' },
  { label: '🚗 Parking rules', text: 'What are the parking rules?' },
  { label: '🎉 Book hall', text: 'How do I book the community hall for a party?' },
  { label: '💳 Maintenance', text: 'How much is the monthly maintenance fee?' },
];

export default function AssistantPage() {
  const { state, processMessage } = useApp();
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const [speechLang, setSpeechLang] = useState('kn-IN');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.chatMessages, isTyping]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = speechLang;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(r => r[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);

      recognitionRef.current = recognition;
    }
  }, [speechLang]);

  const changeSpeechLang = (lang) => {
    setSpeechLang(lang);
    if (recognitionRef.current) recognitionRef.current.lang = lang;
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Please use Chrome.');
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSend = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setIsTyping(true);
    processMessage(msg);
    setInput('');
    setTimeout(() => setIsTyping(false), 1200);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessageContent = (content) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (processed.startsWith('• ') || processed.startsWith('- ')) {
        return <div key={i} style={{ paddingLeft: 8, marginBottom: 3 }} dangerouslySetInnerHTML={{ __html: processed }} />;
      }
      if (processed.trim() === '') return <div key={i} style={{ height: 6 }} />;
      return <div key={i} dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  const langOptions = [
    { code: 'kn-IN', label: 'ಕನ್ನಡ' },
    { code: 'hi-IN', label: 'हिंदी' },
    { code: 'en-US', label: 'English' },
  ];

  const showChips = state.chatMessages.length <= 1;

  return (
    <div className="chat-container fade-in">

      {/* ── Header bar ───────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <Sparkles size={15} style={{ color: 'var(--primary-400)' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Multilingual AI · Kannada · Hindi · English · Hinglish
          </span>
        </div>
        <div className="lang-selector">
          {langOptions.map(l => (
            <button
              key={l.code}
              className={`lang-option ${speechLang === l.code ? 'active' : ''}`}
              onClick={() => changeSpeechLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Messages ──────────────────────────────── */}
      <div className="chat-messages">
        {state.chatMessages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.role}`}>
            <div className="chat-avatar">
              {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
            </div>
            <div className="chat-bubble">
              {renderMessageContent(msg.content)}
              <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', marginTop: 8 }}>
                {new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="chat-message assistant">
            <div className="chat-avatar"><Bot size={18} /></div>
            <div className="chat-bubble">
              <div className="typing-dots">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        {/* Quick suggestion chips — shown only at start */}
        {showChips && !isTyping && (
          <div style={{ marginTop: 'var(--space-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
              <Zap size={13} style={{ color: 'var(--accent-400)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Quick suggestions — tap to try
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleSend(chip.text)}
                  style={{
                    padding: '0.45rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = 'rgba(16,185,129,0.08)';
                    e.target.style.borderColor = 'rgba(16,185,129,0.3)';
                    e.target.style.color = 'var(--primary-400)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'var(--bg-glass)';
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.color = 'var(--text-secondary)';
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ────────────────────────────── */}
      <div className="chat-input-area">

        {/* Mic Button */}
        <button
          id="mic-button"
          className={`mic-btn ${isRecording ? 'recording' : ''}`}
          onClick={toggleRecording}
          title={isRecording ? 'Stop recording' : `Voice input (${langOptions.find(l => l.code === speechLang)?.label})`}
        >
          {isRecording ? <MicOff size={22} color="#fff" /> : <Mic size={22} color="#fff" />}
        </button>

        <div className="chat-input-wrapper">
          <input
            id="chat-input"
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder={
              isRecording
                ? '🔴 Listening... speak now'
                : 'Type in Kannada, Hindi, Hinglish or English...'
            }
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isRecording}
          />
          <button
            id="send-button"
            className="chat-send-btn"
            onClick={() => handleSend()}
            disabled={!input.trim() || isRecording}
          >
            <Send size={17} />
          </button>
        </div>
      </div>

      {/* Recording indicator label */}
      {isRecording && (
        <div style={{ textAlign: 'center', marginTop: 'var(--space-sm)', fontSize: '0.75rem', color: 'var(--danger)', fontWeight: 500, animation: 'fade-in 0.3s ease' }}>
          🔴 Recording in {langOptions.find(l => l.code === speechLang)?.label} — speak clearly
        </div>
      )}
    </div>
  );
}

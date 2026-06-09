import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send, Bot, User, Sparkles, Trash2, Plus,
  Copy, Check, StopCircle, ArrowDown
} from 'lucide-react';
import Sidebar from '../components/Dashboard/Sidebar';
import TopBar from '../components/Dashboard/Topbar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─── Markdown-ish renderer (lightweight, no deps) ────────────
const renderMarkdown = (text) => {
  if (!text) return '';

  let html = text
    // Code blocks: ```lang\n...\n```
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre class="chat-code-block"><div class="chat-code-header"><span>${lang || 'code'}</span></div><code>${escaped}</code></pre>`;
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Headers
    .replace(/^### (.+)$/gm, '<h4 class="chat-h4">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="chat-h3">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 class="chat-h2">$1</h2>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="chat-hr" />')
    // Unordered lists
    .replace(/^[*-] (.+)$/gm, '<li class="chat-li">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="chat-li-ordered">$1</li>')
    // Line breaks
    .replace(/\n/g, '<br/>');

  // Wrap consecutive <li> tags in <ul> or <ol>
  html = html
    .replace(/((?:<li class="chat-li">.*?<\/li><br\/>?)+)/g, '<ul class="chat-ul">$1</ul>')
    .replace(/((?:<li class="chat-li-ordered">.*?<\/li><br\/>?)+)/g, '<ol class="chat-ol">$1</ol>')
    // Remove extra <br/> inside lists
    .replace(/<\/li><br\/>/g, '</li>');

  return html;
};

// ─── Message Bubble ──────────────────────────────────────────
const MessageBubble = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 py-5 px-4 md:px-8 group ${isUser ? '' : 'bg-white/[0.02]'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
        isUser
          ? 'bg-gradient-to-br from-purple to-purple-dark text-white'
          : 'bg-gradient-to-br from-accent to-accent-dark text-bg-primary'
      }`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-secondary">
            {isUser ? 'You' : 'AI Tutor'}
          </span>
          {message.isStreaming && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-medium">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              typing
            </span>
          )}
        </div>

        {isUser ? (
          <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div
            className="chat-markdown text-sm text-text-primary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
          />
        )}

        {/* Copy button for assistant messages */}
        {!isUser && !message.isStreaming && message.content && (
          <button
            onClick={handleCopy}
            className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] text-text-muted hover:text-text-secondary hover:bg-white/[0.04] transition-colors opacity-0 group-hover:opacity-100"
          >
            {copied ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Typing Indicator ────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex gap-3 py-5 px-4 md:px-8 bg-white/[0.02]">
    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
      <Bot size={16} className="text-bg-primary" />
    </div>
    <div className="flex items-center gap-1 pt-2">
      <span className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);

// ─── Suggestion Chips ────────────────────────────────────────
const suggestions = [
  { emoji: '🗺️', text: 'Create a roadmap for Full Stack Development' },
  { emoji: '🐍', text: 'Explain Python OOP concepts with examples' },
  { emoji: '📊', text: 'Data Structures & Algorithms study plan' },
  { emoji: '🧠', text: 'Explain how Machine Learning works' },
  { emoji: '🔒', text: 'Beginner guide to Cybersecurity' },
  { emoji: '📱', text: 'React vs Next.js — which should I learn?' },
];

// ─── Main Chatbot Component ─────────────────────────────────
const Chatbot = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Student');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userdata = localStorage.getItem('user');
    if (!token || !userdata) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userdata);
    setUserName(user.name || user.username || user.email?.split('@')[0] || 'Student');
  }, [navigate]);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Show/hide scroll-to-bottom button
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 120;
    setShowScrollBtn(!isNearBottom);
  }, []);

  // Send message with streaming
  const sendMessage = async (content) => {
    if (!content.trim() || isStreaming) return;

    const userMessage = { role: 'user', content: content.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsStreaming(true);

    // Create assistant placeholder
    const assistantMessage = { role: 'assistant', content: '', isStreaming: true };
    setMessages([...updatedMessages, assistantMessage]);

    try {
      abortControllerRef.current = new AbortController();
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/api/chatbot/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulated += parsed.text;
                setMessages(prev => {
                  const copy = [...prev];
                  copy[copy.length - 1] = {
                    role: 'assistant',
                    content: accumulated,
                    isStreaming: true,
                  };
                  return copy;
                });
              }
              if (parsed.error) {
                accumulated += `\n\n⚠️ ${parsed.error}`;
              }
            } catch {
              // skip
            }
          }
        }
      }

      // Finalize
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: 'assistant',
          content: accumulated || 'Sorry, I could not generate a response. Please try again.',
          isStreaming: false,
        };
        return copy;
      });
    } catch (err) {
      if (err.name === 'AbortError') {
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            ...copy[copy.length - 1],
            isStreaming: false,
            content: copy[copy.length - 1].content + '\n\n*(response stopped)*',
          };
          return copy;
        });
      } else {
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: 'assistant',
            content: `Something went wrong: ${err.message}. Please try again.`,
            isStreaming: false,
          };
          return copy;
        });
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex min-h-screen bg-bg-primary text-text-primary">
      <Sidebar />

      <div className="flex-1 ml-56 flex flex-col h-screen">
        <TopBar userName={userName} />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isEmpty ? (
            /* ─── Empty State / Welcome ──────────────────── */
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
              {/* Animated logo */}
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-purple/20 flex items-center justify-center border border-white/[0.06] glow-green">
                  <Bot size={36} className="text-accent" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles size={10} className="text-bg-primary" />
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-2">
                Hi <span className="text-accent text-glow-green">{userName}</span>, how can I help?
              </h1>
              <p className="text-text-muted text-sm max-w-md text-center leading-relaxed mb-10">
                I&apos;m your AI learning assistant. Ask me anything about programming,
                get study roadmaps, or explore new topics together.
              </p>

              {/* Suggestion grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl w-full">
                {suggestions.map((s) => (
                  <button
                    key={s.text}
                    onClick={() => sendMessage(s.text)}
                    className="text-left p-4 rounded-xl bg-bg-card border border-white/[0.06] hover:border-accent/20 hover:bg-white/[0.03] transition-all duration-200 group"
                  >
                    <span className="text-lg mb-2 block">{s.emoji}</span>
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors leading-snug">
                      {s.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ─── Messages List ─────────────────────────── */
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto"
            >
              <div className="max-w-4xl mx-auto">
                {messages.map((msg, i) => (
                  <MessageBubble key={i} message={msg} />
                ))}
                {isStreaming && messages[messages.length - 1]?.content === '' && (
                  <TypingIndicator />
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Scroll-to-bottom FAB */}
              {showScrollBtn && (
                <button
                  onClick={scrollToBottom}
                  className="fixed bottom-28 right-10 w-9 h-9 rounded-full bg-bg-elevated border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] transition-colors shadow-lg z-30"
                >
                  <ArrowDown size={16} className="text-text-muted" />
                </button>
              )}
            </div>
          )}

          {/* ─── Input Bar ───────────────────────────────── */}
          <div className="border-t border-white/[0.04] bg-bg-primary px-4 py-3">
            <div className="max-w-4xl mx-auto">
              {/* Action row */}
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={handleNewChat}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-text-muted hover:text-text-secondary hover:bg-white/[0.04] transition-colors"
                >
                  <Plus size={14} /> New Chat
                </button>
                {messages.length > 0 && (
                  <button
                    onClick={handleNewChat}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-text-muted hover:text-red-400 hover:bg-red-500/[0.08] transition-colors"
                  >
                    <Trash2 size={13} /> Clear
                  </button>
                )}
              </div>

              {/* Input form */}
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex items-end gap-2 rounded-2xl bg-bg-card border border-white/[0.06] focus-within:border-accent/30 focus-within:shadow-[0_0_16px_rgba(0,217,126,0.08)] transition-all p-2">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about learning, coding, roadmaps..."
                    rows={1}
                    className="flex-1 resize-none bg-transparent text-sm text-text-primary placeholder-text-muted outline-none px-3 py-2 max-h-40 overflow-y-auto leading-relaxed"
                    style={{ minHeight: '40px' }}
                    disabled={isStreaming}
                  />

                  {isStreaming ? (
                    <button
                      type="button"
                      onClick={handleStop}
                      className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                    >
                      <StopCircle size={18} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="flex-shrink-0 w-10 h-10 rounded-xl btn-neon flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:transform-none"
                    >
                      <Send size={16} />
                    </button>
                  )}
                </div>
              </form>

              <p className="text-[10px] text-text-muted text-center mt-2 opacity-60">
                AI Tutor can make mistakes. Verify important information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

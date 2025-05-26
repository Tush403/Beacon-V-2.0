
"use client";

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
  quickReplies?: string[];
  avatarIcon?: React.ElementType;
  senderName?: string;
  isError?: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onQuickReplyClick: (reply: string) => void;
  isBotTyping?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({
  isOpen,
  onToggle,
  messages,
  inputValue,
  onInputChange,
  onSendMessage,
  onQuickReplyClick,
  isBotTyping,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages, isBotTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        onSendMessage();
      }
    }
  };
  
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return parts[0][0] + parts[parts.length - 1][0];
    }
    return name.substring(0, 2);
  };

  const handleChatWindowScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };


  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-20 right-4 sm:right-6 md:right-8 w-[calc(100%-2rem)] sm:w-96 md:w-[480px] max-h-[75vh] sm:max-h-[600px] md:max-h-[700px] bg-card text-card-foreground border border-border/50 rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-out z-50",
            "animate-in slide-in-from-bottom-12 fade-in-0"
          )}
          onWheel={handleChatWindowScroll} // Add this line
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-border/50 bg-muted/50 rounded-t-xl">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-lg text-primary">Beacon Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={onToggle} className="text-muted-foreground hover:text-primary">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-grow min-h-0" ref={scrollAreaRef}>
            <div className="p-3 space-y-3"> {/* Inner div for padding and spacing */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-end gap-2 w-full",
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {msg.sender === 'bot' && (
                    <Avatar className="h-8 w-8 self-start shrink-0">
                       <AvatarFallback className={cn("bg-primary text-primary-foreground", msg.isError && "bg-destructive text-destructive-foreground")}>
                          {msg.avatarIcon ? <msg.avatarIcon className="h-5 w-5" /> : getInitials(msg.senderName || "AI")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "p-2.5 rounded-lg max-w-[80%] break-words shadow-md text-sm",
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : msg.isError 
                          ? 'bg-destructive/20 text-destructive-foreground rounded-bl-none border border-destructive/30' 
                          : 'bg-muted text-foreground rounded-bl-none border border-border/30',
                      msg.sender === 'system' && 'bg-transparent text-xs text-center text-muted-foreground italic w-full max-w-full shadow-none border-none p-1'
                    )}
                  >
                    {msg.sender === 'bot' && msg.senderName && (
                       <p className={cn("text-xs font-medium mb-0.5", msg.isError ? "text-destructive-foreground/80" : "text-muted-foreground" )}>
                          {msg.senderName} <span className={cn("text-xs", msg.isError ? "text-destructive-foreground/60" : "text-muted-foreground/70")}>• {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                       </p>
                    )}
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    {msg.quickReplies && msg.quickReplies.length > 0 && msg.sender === 'bot' && !msg.isError && (
                      <div className="mt-2.5 flex flex-col items-end space-y-1.5">
                        {msg.quickReplies.map((reply, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="bg-card hover:bg-accent/10 text-primary border-primary/50 hover:border-primary h-auto py-1.5 px-3 rounded-full text-xs"
                            onClick={() => onQuickReplyClick(reply)}
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                   {msg.sender === 'user' && (
                    <Avatar className="h-8 w-8 self-start shrink-0">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isBotTyping && (
                <div className="flex items-center gap-2 justify-start">
                  <Avatar className="h-8 w-8 self-start shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="p-2.5 rounded-lg bg-muted text-foreground rounded-bl-none border border-border/30 shadow-md">
                    <div className="flex space-x-1 items-center">
                      <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                      <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                      <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-pulse"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-3 border-t border-border/50 bg-muted/30 rounded-b-xl">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={onInputChange}
                onKeyDown={handleKeyDown}
                className="flex-grow bg-card border-border/70 focus-visible:ring-accent"
                disabled={isBotTyping}
              />
              <Button 
                size="icon" 
                onClick={onSendMessage} 
                disabled={!inputValue.trim() || isBotTyping}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FAB to toggle chat */}
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 sm:right-6 md:right-8 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground z-50"
        onClick={onToggle}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </Button>
    </>
  );
};

export default Chatbot;

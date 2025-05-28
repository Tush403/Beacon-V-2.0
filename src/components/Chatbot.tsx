
"use client";

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { X, SendHorizontal, User, Bot as BotIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '@/lib/types';

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: ChatMessageType[];
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  isSending: boolean; // Changed from isBotTyping
  initialPlaceholder?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({
  isOpen,
  onToggle,
  messages,
  inputValue,
  onInputChange,
  onSendMessage,
  isSending, // Changed from isBotTyping
  initialPlaceholder = "Type your feedback (max 250 chars)...",
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
  }, [messages, isSending]); // Added isSending to dependencies

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isSending) {
        onSendMessage();
      }
    }
  };

  const handleChatWindowScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-20 right-4 sm:right-6 md:right-8 w-[calc(100%-2rem)] sm:w-96 md:w-[380px] max-h-[70vh] sm:max-h-[560px] md:max-h-[600px] bg-card text-card-foreground border border-border/50 rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-out z-50 overflow-hidden",
            "animate-in slide-in-from-bottom-12 fade-in-0"
          )}
          onWheel={handleChatWindowScroll}
        >
          <div className="bg-primary text-primary-foreground p-4 flex items-center space-x-3 rounded-t-xl relative">
            <div className="flex -space-x-3">
              <Avatar className="h-9 w-9 border-2 border-primary-foreground/50 ring-2 ring-primary">
                <AvatarFallback className="bg-primary/80 text-primary-foreground">
                  <BotIcon className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Feedback & Support</h3>
              <p className="text-sm opacity-90">We'd love to hear from you!</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onToggle} className="absolute top-2 right-2 text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8">
              <X className="h-5 w-5" />
              <span className="sr-only">Close chat</span>
            </Button>
          </div>

          <div className="flex flex-col flex-grow bg-card min-h-0">
            <ScrollArea className="flex-grow min-h-0" ref={scrollAreaRef}>
              <div className="p-3 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex items-end gap-2 w-full",
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {msg.sender === 'bot' && (
                      <Avatar className="h-7 w-7 self-start shrink-0">
                         <AvatarFallback className={cn("bg-primary/80 text-primary-foreground text-xs", msg.isError && "bg-destructive text-destructive-foreground")}>
                            {msg.avatarIcon ? <msg.avatarIcon className="h-4 w-4" /> : <BotIcon className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "p-2.5 rounded-lg max-w-[85%] break-words shadow-sm text-sm",
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : msg.isError
                            ? 'bg-destructive/20 text-destructive-foreground rounded-bl-none border border-destructive/30'
                            : 'bg-muted text-foreground rounded-bl-none border border-border/30',
                        msg.sender === 'system' && 'bg-transparent text-xs text-center text-muted-foreground italic w-full max-w-full shadow-none border-none p-1'
                      )}
                    >
                      {msg.sender === 'bot' && msg.senderName && !msg.isError && (
                         <p className={cn("text-xs font-medium mb-0.5 text-muted-foreground")}>
                            {msg.senderName}
                         </p>
                      )}
                       <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                     {msg.sender === 'user' && (
                      <Avatar className="h-7 w-7 self-start shrink-0">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isSending && (
                  <div className="flex items-center justify-center p-2 text-xs text-muted-foreground">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending feedback...
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-3 border-t border-border/30 bg-card rounded-b-xl">
              <div className="flex items-center gap-2 bg-background rounded-full p-1 border border-input shadow-sm">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={initialPlaceholder}
                  value={inputValue}
                  onChange={onInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none text-sm h-8"
                  maxLength={250}
                  disabled={isSending}
                />
                <Button
                  size="icon"
                  onClick={onSendMessage}
                  disabled={!inputValue.trim() || isSending}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-8 h-8"
                  aria-label="Send feedback"
                >
                  {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Button
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 sm:right-6 md:right-8 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground z-50"
        onClick={onToggle}
        aria-label={isOpen ? "Close Feedback" : "Open Feedback"}
      >
        {isOpen ? <X className="h-7 w-7" /> : <BotIcon className="h-7 w-7" />}
      </Button>
    </>
  );
};

export default Chatbot;

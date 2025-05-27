
"use client";

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, X, SendHorizontal, User, Bot as BotIcon, Edit3 } from 'lucide-react';
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
  initialPlaceholder?: string;
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
  initialPlaceholder = "Choose an option or type a message...",
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentPlaceholder, setCurrentPlaceholder] = React.useState(initialPlaceholder);

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

  useEffect(() => {
    // Update placeholder if the last message has quick replies
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
    if (lastMessage && lastMessage.sender === 'bot' && lastMessage.quickReplies && lastMessage.quickReplies.length > 0) {
      setCurrentPlaceholder("Choose an option");
    } else {
      setCurrentPlaceholder("Type your message...");
    }
  }, [messages]);

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
    return name.substring(0, 2).toUpperCase();
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
            "fixed bottom-20 right-4 sm:right-6 md:right-8 w-[calc(100%-2rem)] sm:w-96 md:w-[360px] max-h-[70vh] sm:max-h-[500px] md:max-h-[600px] bg-card text-card-foreground border border-border/50 rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-out z-50 overflow-hidden",
            "animate-in slide-in-from-bottom-12 fade-in-0"
          )}
          onWheel={handleChatWindowScroll}
        >
          {/* Header Section (Katalon Style) */}
          <div className="bg-primary text-primary-foreground p-3 flex items-center space-x-3 rounded-t-xl">
            <Avatar className="h-9 w-9 border-2 border-primary-foreground/50">
              {/* Placeholder for a more specific bot avatar */}
              <AvatarFallback className="bg-primary-foreground text-primary">
                <BotIcon className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">Beacon Assistant</h3>
          </div>

          {/* Messages Area & Input */}
          <div className="flex flex-col flex-grow bg-card min-h-0">
            <ScrollArea className="flex-grow min-h-0" ref={scrollAreaRef}>
              <div className="p-4 space-y-3">
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
                      {msg.quickReplies && msg.quickReplies.length > 0 && msg.sender === 'bot' && !msg.isError && (
                        <div className="mt-2.5 flex flex-col items-start space-y-1.5">
                          {msg.quickReplies.map((reply, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="bg-card hover:bg-primary/10 text-primary border-primary/70 hover:border-primary h-auto py-1.5 px-3 rounded-full text-xs"
                              onClick={() => onQuickReplyClick(reply)}
                            >
                              {reply}
                            </Button>
                          ))}
                        </div>
                      )}
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
                {isBotTyping && (
                  <div className="flex items-center gap-2 justify-start">
                    <Avatar className="h-7 w-7 self-start shrink-0">
                      <AvatarFallback className="bg-primary/80 text-primary-foreground">
                        <BotIcon className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="p-2.5 rounded-lg bg-muted text-foreground rounded-bl-none border border-border/30 shadow-sm">
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
            <div className="p-3 border-t border-border/30 bg-card rounded-b-xl">
              <div className="flex items-center gap-2 bg-background rounded-full p-1 border border-input shadow-sm">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={currentPlaceholder}
                  value={inputValue}
                  onChange={onInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none text-sm h-8"
                  disabled={isBotTyping && !(messages.length > 0 && messages[messages.length -1].quickReplies && messages[messages.length-1].quickReplies.length > 0) } // Only disable if bot typing and no quick replies
                />
                <Button 
                  size="icon" 
                  onClick={onSendMessage} 
                  disabled={!inputValue.trim() || isBotTyping}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-8 h-8"
                  aria-label="Send message"
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
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
        {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
      </Button>
    </>
  );
};

export default Chatbot;

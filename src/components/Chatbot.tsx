
"use client";

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, SendHorizontal, User, Bot as BotIcon } from 'lucide-react'; // Renamed imported Bot to BotIcon to avoid conflict
import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '@/lib/types'; // Ensure ChatMessageType is imported

// Interface for props from page.tsx
interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: ChatMessageType[];
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
                <AvatarImage src="https://placehold.co/40x40/7C3AED/FFFFFF.png?text=B" alt="Bot Avatar 1" data-ai-hint="bot avatar purple" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="h-9 w-9 border-2 border-primary-foreground/50 ring-2 ring-primary">
                <AvatarImage src="https://placehold.co/40x40/3B82F6/FFFFFF.png?text=A" alt="Bot Avatar 2" data-ai-hint="bot avatar blue"/>
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
               <Avatar className="h-9 w-9 border-2 border-primary-foreground/50 ring-2 ring-primary">
                 <AvatarImage src="https://placehold.co/40x40/10B981/FFFFFF.png?text=C" alt="Bot Avatar 3" data-ai-hint="bot avatar green"/>
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Hi there 👋</h3>
              <p className="text-sm opacity-90">How can we help?</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onToggle} className="absolute top-2 right-2 text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8">
              <X className="h-5 w-5" />
              <span className="sr-only">Close chat</span>
            </Button>
          </div>

          <div className="flex flex-col flex-grow bg-card min-h-0">
            <ScrollArea className="flex-grow min-h-0" ref={scrollAreaRef}>
              <div className="p-3 space-y-3"> {/* Ensure this div exists for proper scrolling */}
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
                  disabled={isBotTyping}
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

      <Button
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 sm:right-6 md:right-8 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground z-50"
        onClick={onToggle}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        {isOpen ? <X className="h-7 w-7" /> : <BotIcon className="h-7 w-7" />}
      </Button>
    </>
  );
};

export default Chatbot;

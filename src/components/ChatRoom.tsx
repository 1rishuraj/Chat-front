import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { Send, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  sender: string;
  timestamp: string;
  isOwnMessage: boolean;
}

interface ChatRoomProps {
  roomId: string;
  username: string;
  ws: WebSocket | null;
  messages: string[];
}

export const ChatRoom = ({ roomId, username, ws, messages }: ChatRoomProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const [parsedMessages, setParsedMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const parsed = messages.map((msg) => {
      try {
        const data = JSON.parse(msg);
        return {
          text: data.message || msg,
          sender: data.sender || "Unknown",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwnMessage: data.sender === username,
        };
      } catch {
        return {
          text: msg,
          sender: "Unknown",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwnMessage: false,
        };
      }
    });
    setParsedMessages(parsed);
    scrollToBottom();
  }, [messages, username]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && ws) {
      ws.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: inputMessage.trim(),
            sender: username,
          },
        })
      );
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-sm md:text-base">Room: {roomId}</h2>
            <p className="text-xs text-muted-foreground">Signed in as {username}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {parsedMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          parsedMessages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.text}
              sender={msg.sender}
              isOwnMessage={msg.isOwnMessage}
              timestamp={msg.timestamp}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-chat-input-border bg-card px-4 py-3 md:py-4">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className={cn(
              "flex-1 h-11 md:h-12 bg-chat-input border-chat-input-border",
              "focus-visible:ring-primary"
            )}
          />
          <Button
            type="submit"
            size="icon"
            className="h-11 w-11 md:h-12 md:w-12 shrink-0"
            disabled={!inputMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

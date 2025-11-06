import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  sender: string;
  isOwnMessage?: boolean;
  timestamp?: string;
}

export const ChatMessage = ({ message, sender, isOwnMessage = false, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-slide-in",
        isOwnMessage ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm",
          isOwnMessage
            ? "bg-message-bubble text-message-bubble-foreground rounded-br-md"
            : "bg-message-bubble-other text-message-bubble-other-foreground rounded-bl-md"
        )}
      >
        <div className="flex flex-col gap-1">
          <span className={cn(
            "text-xs font-medium",
            isOwnMessage ? "text-message-bubble-foreground/80" : "text-message-bubble-other-foreground/70"
          )}>
            {sender}
          </span>
          <p className="text-sm break-words">{message}</p>
          {timestamp && (
            <span className={cn(
              "text-[10px] mt-0.5",
              isOwnMessage ? "text-message-bubble-foreground/60" : "text-message-bubble-other-foreground/50"
            )}>
              {timestamp}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

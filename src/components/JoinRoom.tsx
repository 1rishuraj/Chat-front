import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface JoinRoomProps {
  onJoinRoom: (roomId: string, username: string) => void;
}

export const JoinRoom = ({ onJoinRoom }: JoinRoomProps) => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim() && username.trim()) {
      onJoinRoom(roomId.trim(), username.trim());
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 animate-fade-in">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Join Chat Room</h1>
            <p className="text-muted-foreground">
              Enter your name and room code to start chatting
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Your Name
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="roomId" className="text-sm font-medium">
                Room Code
              </label>
              <Input
                id="roomId"
                type="text"
                placeholder="Enter room code"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={!roomId.trim() || !username.trim()}
            >
              Join Room
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

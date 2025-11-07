import { useEffect, useState } from "react";
import { JoinRoom } from "@/components/JoinRoom";
import { ChatRoom } from "@/components/ChatRoom";
import { toast } from "sonner";

const Index = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const wss = new WebSocket("https://chat-room-three-alpha.vercel.app");
    
    wss.onopen = () => {
      setWs(wss);
      toast.success("Connected to server");
    };

    wss.onmessage = (m: MessageEvent) => {
      setMessages((prev) => [...prev, m.data]);
    };

    wss.onerror = () => {
      toast.error("Failed to connect to server");
    };

    wss.onclose = () => {
      toast.info("Disconnected from server");
    };

    return () => {
      wss.close();
    };
  }, []);

  const handleJoinRoom = (newRoomId: string, newUsername: string) => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: newRoomId,
            username: newUsername,
          },
        })
      );
      setRoomId(newRoomId);
      setUsername(newUsername);
      setIsInRoom(true);
      toast.success(`Joined room: ${newRoomId}`);
    }
  };

  if (!isInRoom) {
    return <JoinRoom onJoinRoom={handleJoinRoom} />;
  }

  return <ChatRoom roomId={roomId} username={username} ws={ws} messages={messages} />;
};

export default Index;

import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

type ChatType = "fraudAlert" | "scamEncyclopedia" | "streetScams" | "telecomFraud" | "scamReplay";

export function useChat(chatType: ChatType) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessageMutation = trpc.chat.sendMessage.useMutation();

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Call AI API
        const response = await sendMessageMutation.mutateAsync({
          message: content,
          chatType,
          conversationHistory: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        });

        if (response.success) {
          // Add assistant message
          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: typeof response.message === 'string' ? response.message : String(response.message),
            timestamp: response.timestamp,
          };
          setMessages((prev) => [...prev, assistantMessage]);
        } else {
          // Add error message
          const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: (typeof response.message === 'string' ? response.message : String(response.message)) || "发生了一个错误，请稍后重试。",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMessage]);
        }
      } catch (error) {
        console.error("Chat error:", error);
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "抱歉，发生了一个错误。请稍后重试。",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [chatType, messages, sendMessageMutation]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, AlertCircle } from "lucide-react";
import { useChat } from "@/hooks/useChat";

export default function FraudAlert() {
  const { messages, isLoading, sendMessage } = useChat("fraudAlert");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const message = input;
    setInput("");
    await sendMessage(message);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Add padding for fixed navbar */}
      <div className="pt-16" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient-gold">
              防诈提醒
            </h1>
          </div>
          <p className="text-foreground/70 text-lg">
            输入你遇到的可疑情况，AI 将帮你分析是否存在诈骗风险并提供防范建议
          </p>
        </div>

        {/* Chat Container */}
        <div className="max-w-2xl mx-auto">
          <div className="card-elegant overflow-hidden flex flex-col h-[600px] md:h-[700px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="flex justify-start">
                  <div className="bg-card/80 text-foreground px-4 py-3 rounded-lg rounded-bl-none border border-border/50">
                    <p className="text-sm md:text-base">
                      你好！我是防诈骗智能助手。请告诉我你遇到的可疑情况，我会帮你分析是否存在诈骗风险。
                    </p>
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-accent text-accent-foreground rounded-br-none"
                        : "bg-card/80 text-foreground rounded-bl-none border border-border/50"
                    }`}
                  >
                    <p className="text-sm md:text-base whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString("zh-CN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card/80 text-foreground px-4 py-3 rounded-lg rounded-bl-none border border-border/50">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border/50 p-4 bg-card/50">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="描述你遇到的可疑情况..."
                  className="flex-1 bg-input border-border/50"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="btn-gold"
                >
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

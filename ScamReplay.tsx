import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, RotateCcw } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { TypewriterTextOptimized } from "@/components/TypewriterText";
import { LoadingIndicator } from "@/components/LoadingIndicator";

interface MessageWithTypewriter {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  showTypewriter?: boolean;
}

export default function ScamReplay() {
  const { messages, isLoading, sendMessage } = useChat("scamReplay");
  const [input, setInput] = useState("");
  const [displayedMessages, setDisplayedMessages] = useState<MessageWithTypewriter[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 当消息更新时，更新显示的消息列表
  useEffect(() => {
    const newMessages = messages.map((msg, index) => ({
      ...msg,
      // 只对最后一条 AI 消息显示打字机效果
      showTypewriter:
        msg.role === "assistant" && index === messages.length - 1 && !isLoading,
    }));
    setDisplayedMessages(newMessages);
  }, [messages, isLoading]);

  useEffect(() => {
    scrollToBottom();
  }, [displayedMessages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const message = input;
    setInput("");
    await sendMessage(message);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16" />
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient-gold">
              模拟骗局复盘
            </h1>
          </div>
          <p className="text-foreground/70 text-lg">
            分析遭遇情景，深入理解骗局套路和防范方法
          </p>
        </div>

        {/* 聊天容器 */}
        <div className="max-w-2xl mx-auto">
          <div className="card-elegant overflow-hidden flex flex-col h-[600px] md:h-[700px]">
            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {displayedMessages.length === 0 && !isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card/80 text-foreground px-4 py-3 rounded-lg rounded-bl-none border border-border/50 animate-fade-in">
                    <p className="text-sm md:text-base">
                      欢迎来到模拟骗局复盘室。请描述你遭遇或想象的诈骗情景，我会帮你深入分析骗局套路、识别漏洞和防范方法。
                    </p>
                  </div>
                </div>
              )}

              {displayedMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-fade-in`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-accent text-accent-foreground rounded-br-none"
                        : "bg-card/80 text-foreground rounded-bl-none border border-border/50"
                    }`}
                  >
                    <div className="text-sm md:text-base whitespace-pre-wrap">
                      {message.showTypewriter ? (
                        <TypewriterTextOptimized
                          text={message.content}
                          speed={20}
                        />
                      ) : (
                        message.content
                      )}
                    </div>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString("zh-CN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {/* 加载状态 */}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-card/80 text-foreground px-4 py-3 rounded-lg rounded-bl-none border border-border/50">
                    <LoadingIndicator
                      variant="wave"
                      size="sm"
                      text="AI 正在分析中..."
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
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
                  placeholder="描述你遭遇的诈骗情景..."
                  className="flex-1 bg-input border-border/50 focus:border-accent/50 transition-colors"
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
              {input.length > 0 && (
                <p className="text-xs text-foreground/50 mt-2">
                  按 Enter 发送，Shift+Enter 换行
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

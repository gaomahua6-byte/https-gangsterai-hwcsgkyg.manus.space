import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // 毫秒/字符
  onComplete?: () => void;
  className?: string;
}

/**
 * 打字机效果组件
 * 逐字显示文本，创建真实的打字感觉
 */
export function TypewriterText({
  text,
  speed = 30,
  onComplete,
  className = "",
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length === text.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    // 使用 requestAnimationFrame 获得更流畅的动画
    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-0.5 h-5 bg-accent ml-1 animate-pulse" />
      )}
    </span>
  );
}

/**
 * 高性能打字机效果组件（使用 requestAnimationFrame）
 * 适合长文本和频繁更新的场景
 */
export function TypewriterTextOptimized({
  text,
  speed = 30,
  onComplete,
  className = "",
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let animationFrameId: number;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastTime;

      // 根据经过的时间计算应该显示多少个字符
      const charsToAdd = Math.floor(elapsed / speed);

      if (charsToAdd > 0) {
        currentIndex = Math.min(
          currentIndex + charsToAdd,
          text.length
        );
        setDisplayedText(text.slice(0, currentIndex));
        lastTime = now;

        if (currentIndex >= text.length) {
          setIsComplete(true);
          onComplete?.();
          return;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-0.5 h-5 bg-accent ml-1 animate-pulse" />
      )}
    </span>
  );
}

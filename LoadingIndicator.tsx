/**
 * 加载动画组件库
 * 提供多种加载指示器样式
 */

interface LoadingIndicatorProps {
  variant?: "dots" | "spinner" | "pulse" | "wave" | "bars";
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

/**
 * 点状加载动画
 */
export function DotsLoader({
  size = "md",
  text,
  className = "",
}: Omit<LoadingIndicatorProps, "variant">) {
  const sizeClass = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  }[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex gap-1.5">
        <div
          className={`${sizeClass} bg-accent rounded-full animate-bounce`}
        />
        <div
          className={`${sizeClass} bg-accent rounded-full animate-bounce delay-100`}
        />
        <div
          className={`${sizeClass} bg-accent rounded-full animate-bounce delay-200`}
        />
      </div>
      {text && <span className="text-sm text-foreground/70">{text}</span>}
    </div>
  );
}

/**
 * 旋转加载动画
 */
export function SpinnerLoader({
  size = "md",
  text,
  className = "",
}: Omit<LoadingIndicatorProps, "variant">) {
  const sizeClass = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${sizeClass} border-2 border-accent/30 border-t-accent rounded-full animate-spin`}
      />
      {text && <span className="text-sm text-foreground/70">{text}</span>}
    </div>
  );
}

/**
 * 脉冲加载动画
 */
export function PulseLoader({
  size = "md",
  text,
  className = "",
}: Omit<LoadingIndicatorProps, "variant">) {
  const sizeClass = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClass} bg-accent rounded-full animate-pulse`} />
      {text && <span className="text-sm text-foreground/70">{text}</span>}
    </div>
  );
}

/**
 * 波浪加载动画
 */
export function WaveLoader({
  size = "md",
  text,
  className = "",
}: Omit<LoadingIndicatorProps, "variant">) {
  const sizeClass = {
    sm: "w-1 h-3",
    md: "w-1.5 h-4",
    lg: "w-2 h-6",
  }[size];

  const barClass = {
    sm: "delay-[0ms] animate-[wave_1.2s_ease-in-out_infinite]",
    md: "delay-[0ms] animate-[wave_1.2s_ease-in-out_infinite]",
    lg: "delay-[0ms] animate-[wave_1.2s_ease-in-out_infinite]",
  }[size];

  return (
    <div className={`flex items-end gap-1 ${className}`}>
      <div className={`${sizeClass} bg-accent rounded-full ${barClass}`} />
      <div
        className={`${sizeClass} bg-accent rounded-full delay-100 animate-[wave_1.2s_ease-in-out_infinite]`}
      />
      <div
        className={`${sizeClass} bg-accent rounded-full delay-200 animate-[wave_1.2s_ease-in-out_infinite]`}
      />
      {text && <span className="text-sm text-foreground/70 ml-2">{text}</span>}
    </div>
  );
}

/**
 * 条形加载动画
 */
export function BarsLoader({
  size = "md",
  text,
  className = "",
}: Omit<LoadingIndicatorProps, "variant">) {
  const sizeClass = {
    sm: "w-1 h-2",
    md: "w-1.5 h-3",
    lg: "w-2 h-4",
  }[size];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div
        className={`${sizeClass} bg-accent rounded-sm animate-[scaleY_1s_ease-in-out_infinite]`}
        style={{ animationDelay: "0ms" }}
      />
      <div
        className={`${sizeClass} bg-accent rounded-sm animate-[scaleY_1s_ease-in-out_infinite]`}
        style={{ animationDelay: "200ms" }}
      />
      <div
        className={`${sizeClass} bg-accent rounded-sm animate-[scaleY_1s_ease-in-out_infinite]`}
        style={{ animationDelay: "400ms" }}
      />
      {text && <span className="text-sm text-foreground/70 ml-2">{text}</span>}
    </div>
  );
}

/**
 * 通用加载指示器组件
 */
export function LoadingIndicator({
  variant = "dots",
  size = "md",
  text,
  className = "",
}: LoadingIndicatorProps) {
  const props = { size, text, className };

  switch (variant) {
    case "spinner":
      return <SpinnerLoader {...props} />;
    case "pulse":
      return <PulseLoader {...props} />;
    case "wave":
      return <WaveLoader {...props} />;
    case "bars":
      return <BarsLoader {...props} />;
    case "dots":
    default:
      return <DotsLoader {...props} />;
  }
}

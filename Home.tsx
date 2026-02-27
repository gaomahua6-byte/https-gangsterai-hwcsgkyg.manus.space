import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle, BookOpen, MapPin, Phone, RotateCcw, ArrowRight, Zap } from "lucide-react";

const features = [
  {
    icon: AlertCircle,
    title: "防诈提醒",
    description: "输入可疑情况，AI 智能识别诈骗风险并提供防范建议",
    href: "/fraud-alert",
  },
  {
    icon: BookOpen,
    title: "骗局百科",
    description: "全面了解各类诈骗手法、特征和防范策略",
    href: "/scam-encyclopedia",
  },
  {
    icon: MapPin,
    title: "街头骗局",
    description: "深入分析常见街头诈骗手法和真实案例",
    href: "/street-scams",
  },
  {
    icon: Phone,
    title: "电信诈骗",
    description: "了解电信诈骗类型和全面防范策略",
    href: "/telecom-fraud",
  },
  {
    icon: RotateCcw,
    title: "模拟骗局复盘",
    description: "分析遭遇情景，深入理解骗局套路和防范方法",
    href: "/scam-replay",
  },
];

const stats = [
  { number: "30+", label: "诈骗类型", icon: "📊" },
  { number: "AI", label: "智能驱动", icon: "🤖" },
  { number: "∞", label: "对话轮次", icon: "♾️" },
  { number: "100%", label: "诈骗预警", icon: "✓" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Add padding for fixed navbar */}
      <div className="pt-16" />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-8">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                AI 驱动的诈骗思维训练平台
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient-gold">杜精骗到</span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground/90 mb-6">
              谍锋大师
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-foreground/70 mb-12 leading-relaxed max-w-2xl mx-auto">
              用 AI 的力量，磨你的诈骗思维。与杜精对话、诊断诈骗漏洞、识破诈骗陷阱——
              在辩论的世界里，成为那个永远无懈可击的人。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/fraud-alert">
                <Button className="btn-gold">
                  开始拾杜
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/scam-encyclopedia">
                <Button className="btn-gold-outline">
                  诊断诈骗
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">五大功能模块</h2>
            <p className="text-lg text-foreground/70">
              全面的防诈骗解决方案，让您安心无忧
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.href} href={feature.href}>
                  <div className="group cursor-pointer h-full">
                    <div className="card-elegant p-6 h-full flex flex-col hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-foreground/70 mb-4 flex-grow line-clamp-3">
                        {feature.description}
                      </p>

                      {/* Arrow */}
                      <div className="flex items-center text-accent font-semibold text-sm group-hover:gap-2 gap-1 transition-all duration-300">
                        <span>了解更多</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 md:py-32 border-t border-border/50 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">为什么选择我们？</h2>
            <p className="text-lg text-foreground/70 mb-12">
              我们采用最先进的 AI 技术，结合真实案例和专业知识，为您提供准确、及时的防诈骗建议。
              每一个回答都经过精心设计，确保您获得最有价值的信息。
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-3">AI 驱动</div>
                <p className="text-sm text-foreground/70">
                  采用最新的大语言模型技术
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-3">24/7</div>
                <p className="text-sm text-foreground/70">
                  随时随地为您服务
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-3">专业</div>
                <p className="text-sm text-foreground/70">
                  基于真实案例和专业知识
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-accent/5 rounded-2xl border border-accent/20 p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              保护自己，从了解开始
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              不要让诈骗分子有机可乘。立即开始使用我们的防诈骗助手，
              学习如何识别和防范各类诈骗。
            </p>
            <Link href="/fraud-alert">
              <Button className="btn-gold">
                立即开始
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-foreground/60">
          <p>© 2026 杜精骗到 | 致力于保护您的财产安全</p>
        </div>
      </footer>
    </div>
  );
}

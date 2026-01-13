import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Layers,
  Zap,
  PenTool,
  Globe,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size[24px_24px]"></div>
        <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 opacity-30 blur-[100px]">
          <div className="aspect-square w-[500px] rounded-full bg-primary" />
        </div>
        <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/3 translate-y-1/4 opacity-30 blur-[100px]">
          <div className="aspect-square w-[500px] rounded-full bg-blue-500" />
        </div>

        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm shadow-sm hover:bg-muted/50 transition-colors animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>Discover the Future of Blogging</span>
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground/90 to-muted-foreground animate-fade-in-up [animation-delay:200ms]">
            Craft Stories That <br />
            <span className="text-primary">Resonate Forever</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up [animation-delay:400ms]">
            A next-generation platform for writers, thinkers, and creators.
            Share your ideas with clarity, style, and impact.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-primary/20 transition-all duration-300 group"
            >
              Start Writing
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-8 py-3 text-sm font-semibold shadow-sm hover:bg-muted/50 transition-all duration-300"
            >
              Read Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-transparent relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Why choose us?
            </h2>
            <p className="text-muted-foreground">
              Everything you need to create a stunning blog and grow your
              audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                desc: 'Built on Next.js 16 for incredible performance and SEO optimization.',
                color: 'text-yellow-500',
                bg: 'bg-yellow-500/10',
              },
              {
                icon: PenTool,
                title: 'Rich Editing',
                desc: 'A powerful, intuitive editor that stays out of your way while you write.',
                color: 'text-blue-500',
                bg: 'bg-blue-500/10',
              },
              {
                icon: Globe,
                title: 'Global Reach',
                desc: 'Connect with readers worldwide with built-in translation and distribution tools.',
                color: 'text-green-500',
                bg: 'bg-green-500/10',
              },
              {
                icon: Layers,
                title: 'Seamless Design',
                desc: 'Beautiful, responsive themes that look great on any device automatically.',
                color: 'text-purple-500',
                bg: 'bg-purple-500/10',
              },
              {
                icon: TrendingUp,
                title: 'Analytics',
                desc: 'Deep insights into your audience growth and engagement metrics.',
                color: 'text-pink-500',
                bg: 'bg-pink-500/10',
              },
              {
                icon: Sparkles,
                title: 'AI Assisted',
                desc: 'Smart suggestions to help you write better titles and correct grammar.',
                color: 'text-indigo-500',
                bg: 'bg-indigo-500/10',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div
                  className={`inline-flex items-center justify-center rounded-xl p-3 ${feature.bg} ${feature.color} mb-6 transition-transform group-hover:scale-110 duration-300`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer is likely handled in layout or we can add a simple bottom area */}
      <footer className="py-12 text-center text-sm text-muted-foreground">
        <p>© 2026 NextBlog. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="#" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="#" className="hover:text-foreground">
            Terms
          </Link>
          <Link href="#" className="hover:text-foreground">
            Twitter
          </Link>
          <Link href="#" className="hover:text-foreground">
            GitHub
          </Link>
        </div>
      </footer>
    </div>
  );
}

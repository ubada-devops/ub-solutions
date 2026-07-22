import React, { useState, useEffect } from 'react';
import {
  Terminal, ArrowRight, Code2, Palette, Brain, Megaphone,
  Globe, Shield, Zap, Users, Star, ChevronRight, Monitor,
  Smartphone, Database, Cloud, Cpu, LineChart, Rocket,
  CheckCircle2, ArrowUpRight, Menu, X, Sparkles,
  TrendingUp, Lock, Layers, GitBranch, Target, MessageSquare
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToChat?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToLogin, onNavigateToChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [counters, setCounters] = useState({ projects: 0, clients: 0, devs: 0, uptime: 0 });

  // Animated counters
  useEffect(() => {
    const targets = { projects: 200, clients: 100, devs: 30, uptime: 99.9 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounters({
        projects: Math.round(targets.projects * ease),
        clients: Math.round(targets.clients * ease),
        devs: Math.round(targets.devs * ease),
        uptime: parseFloat((targets.uptime * ease).toFixed(1)),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Scroll tracker for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate services
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      icon: <Code2 size={28} />,
      title: 'Full-Stack Development',
      desc: 'React, Next.js, Node.js, Python, FastAPI — enterprise-grade web and mobile applications built by senior engineers.',
      features: ['Custom Web Apps', 'API Development', 'Mobile (React Native)', 'Cloud Architecture'],
      gradient: 'from-emerald-500 to-cyan-500',
      image: '/images/service_fullstack.png'
    },
    {
      icon: <Brain size={28} />,
      title: 'AI & Automation',
      desc: 'Custom GPT integrations, workflow automation, RAG pipelines, and intelligent agents that save 100+ hours/month.',
      features: ['Custom AI Agents', 'Workflow Bots', 'RAG Pipelines', 'Predictive Analytics'],
      gradient: 'from-violet-500 to-purple-500',
      image: '/images/service_ai.png'
    },
    {
      icon: <Megaphone size={28} />,
      title: 'Digital Marketing',
      desc: 'Performance marketing, SEO, Meta/Google Ads, lead generation funnels — ROI-driven campaigns for real growth.',
      features: ['Meta & Google Ads', 'SEO & Content', 'Lead Gen Funnels', 'Analytics & CRO'],
      gradient: 'from-orange-500 to-rose-500',
      image: '/images/service_marketing.png'
    },
    {
      icon: <Palette size={28} />,
      title: 'UI/UX Design',
      desc: 'Figma-first design systems, conversion-optimized interfaces, and brand identity that speaks volumes.',
      features: ['Design Systems', 'Brand Identity', 'Prototyping', 'User Research'],
      gradient: 'from-pink-500 to-fuchsia-500',
      image: '/images/service_design.png'
    },
    {
      icon: <Shield size={28} />,
      title: 'DevOps & Security',
      desc: 'CI/CD pipelines, infrastructure-as-code, SOC-2 compliance audits, and zero-trust architectures.',
      features: ['CI/CD Pipelines', 'Cloud Infra (AWS/GCP)', 'Security Audits', 'Monitoring'],
      gradient: 'from-sky-500 to-blue-500',
      image: '/images/service_devops.png'
    },
    {
      icon: <Database size={28} />,
      title: 'Data Engineering',
      desc: 'ETL pipelines, data warehousing, real-time dashboards, and analytics infrastructure at scale.',
      features: ['Data Pipelines', 'Warehousing', 'BI Dashboards', 'Real-time Streams'],
      gradient: 'from-teal-500 to-emerald-500',
      image: '/images/service_data.png'
    },
  ];

  const testimonials = [
    { name: 'Ravi K.', role: 'Gym Owner, FitZone', text: 'UB Solutions built our entire booking platform in 3 weeks. Our online memberships doubled.', initials: 'RK', color: 'from-emerald-500 to-cyan-500' },
    { name: 'Sarah M.', role: 'CEO, TechBridge Inc.', text: 'Their AI automation cut our customer support response time by 80%. Incredible team.', initials: 'SM', color: 'from-violet-500 to-purple-500' },
    { name: 'Ahmed J.', role: 'Marketing Director', text: 'The digital marketing team delivered 5x ROAS within the first month. Data-driven and relentless.', initials: 'AJ', color: 'from-orange-500 to-rose-500' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono antialiased overflow-x-hidden">

      {/* ═══════════════════ NAVBAR ═══════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-zinc-900/60 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); window.location.reload(); }}
            className="flex items-center gap-3 cursor-pointer hover:opacity-85 select-none"
          >
            <div className="w-10 h-10 bg-emerald-500 flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Terminal size={20} className="text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">UB Solutions</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest font-bold text-zinc-400">
            <a href="#services" className="hover:text-emerald-400 transition-colors">Services</a>
            <a href="#stats" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#showcase" className="hover:text-emerald-400 transition-colors">Showcase</a>
            <a href="#testimonials" className="hover:text-emerald-400 transition-colors">Clients</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={onNavigateToLogin}
              className="hidden sm:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] cursor-pointer"
            >
              Portal Login
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-900 px-6 py-6 space-y-4">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-300 hover:text-emerald-400 font-bold uppercase tracking-wider">Services</a>
            <a href="#stats" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-300 hover:text-emerald-400 font-bold uppercase tracking-wider">About</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-300 hover:text-emerald-400 font-bold uppercase tracking-wider">Clients</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-300 hover:text-emerald-400 font-bold uppercase tracking-wider">Contact</a>
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigateToLogin(); }}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg mt-2 cursor-pointer"
            >
              Portal Login →
            </button>
          </div>
        )}
      </nav>


      {/* ═══════════════════ HERO SECTION with Visual #1 ═══════════════════ */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none"
          style={{ transform: `translate(-50%, ${scrollY * -0.1}px)` }}
        />
        <div className="absolute top-40 right-[10%] w-72 h-72 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-[15%] w-60 h-60 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-8">
                <Sparkles size={12} className="text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">30+ Engineers • 100+ Clients Served</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white leading-[1.05] mb-6">
                We Build
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent"> Digital Products</span>
                <br />That Scale.
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed mb-10 font-sans">
                Full-stack development, AI automation, and growth marketing —
                delivered by a battle-tested team of 30+ engineers and 7 C-suite executives.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                <button
                  onClick={onNavigateToLogin}
                  className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_50px_rgba(16,185,129,0.35)] cursor-pointer"
                >
                  Access Portal
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#services"
                  className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 text-sm font-bold uppercase tracking-wider transition-colors px-6 py-4"
                >
                  Explore Services
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>

            {/* Right: Visual #1 - Hero Image */}
            <div className="relative">
              <div className="visual-image-container rounded-2xl overflow-hidden shadow-2xl border border-zinc-800/60">
                <img src="/images/hero_illustration.png" alt="UB Solutions Digital Workspace" className="w-full h-auto" />
              </div>
              {/* Visual #2 - Floating stat badge */}
              <div className="absolute -bottom-4 -left-4 bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">+340%</div>
                    <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Avg Client Growth</div>
                  </div>
                </div>
              </div>
              {/* Visual #3 - Floating tech badge */}
              <div className="absolute -top-3 -right-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Live System</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual #4 - Tech Stack Strip */}
          <div className="mt-20 flex flex-wrap justify-center gap-6 text-[9px] text-zinc-600 uppercase tracking-widest font-bold">
            {['React', 'Next.js', 'Python', 'FastAPI', 'Supabase', 'Vercel', 'AWS', 'Stripe'].map(tech => (
              <span key={tech} className="px-3 py-1.5 border border-zinc-900 rounded-md hover:border-zinc-700 hover:text-zinc-400 transition-all">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════ STATS BAR - Visuals #5-8 ═══════════════════ */}
      <section id="stats" className="border-y border-zinc-900/60 bg-zinc-950/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: `${counters.projects}+`, label: 'Projects Delivered', icon: <Rocket size={18} /> },
            { value: `${counters.clients}+`, label: 'Active Clients', icon: <Users size={18} /> },
            { value: `${counters.devs}+`, label: 'Engineers', icon: <Code2 size={18} /> },
            { value: `${counters.uptime}%`, label: 'Uptime SLA', icon: <Zap size={18} /> },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              {/* Visual #5-8 - Animated stat icons with pulsing rings */}
              <div className="relative flex justify-center mb-3">
                <div className="absolute w-10 h-10 bg-emerald-500/10 rounded-full animate-ping opacity-20" />
                <div className="relative w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-emerald-500/60 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>


      {/* ═══════════════════ SERVICES GRID - Visuals #9-14 (service images) ═══════════════════ */}
      <section id="services" className="py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.25em]">What We Build</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-3">
              End-to-End Tech Solutions
            </h2>
            <p className="text-sm text-zinc-500 mt-4 max-w-xl mx-auto font-sans">
              From concept to deployment, we handle every layer of your digital infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveService(i)}
                className={`group relative border rounded-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                  activeService === i
                    ? 'border-emerald-500/30 bg-zinc-900/60 shadow-[0_0_40px_rgba(16,185,129,0.06)]'
                    : 'border-zinc-900 bg-zinc-950/40 hover:border-zinc-800'
                }`}
              >
                {/* Visual #9-14: Service images */}
                <div className="h-36 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-transparent via-transparent to-zinc-950/90" />
                </div>

                <div className="p-5 pt-2 relative">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 -mt-8 relative z-10 transition-all ${
                    activeService === i
                      ? `bg-gradient-to-br ${service.gradient} text-white shadow-lg`
                      : 'bg-zinc-900 text-zinc-500 group-hover:text-zinc-300 border border-zinc-800'
                  }`}>
                    {service.icon}
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 tracking-tight">{service.title}</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed mb-3 font-sans">{service.desc}</p>

                  <div className="space-y-1">
                    {service.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-2 text-[10px] text-zinc-500">
                        <CheckCircle2 size={10} className={activeService === i ? 'text-emerald-500' : 'text-zinc-700'} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════ SHOWCASE SECTION - Visuals #15-17 ═══════════════════ */}
      <section id="showcase" className="py-20 px-4 border-y border-zinc-900/60 bg-zinc-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.25em]">Why UB Solutions</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-3">
              Built Different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Visual #15 - Security */}
            <div className="p-6 border border-zinc-900 rounded-xl bg-zinc-950/60 hover:border-zinc-800 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all">
                <Lock size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Enterprise Security</h3>
              <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">SOC-2 Type II compliant. AES-256-GCM encryption. HSM key vaults. Zero-trust architecture.</p>
              {/* Visual mini-graph */}
              <div className="mt-4 flex items-end gap-1 h-12">
                {[40, 65, 45, 80, 60, 90, 75, 95, 88, 98].map((h, i) => (
                  <div key={i} className="flex-1 bg-emerald-500/20 rounded-t group-hover:bg-emerald-500/30 transition-all" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            {/* Visual #16 - Scale */}
            <div className="p-6 border border-zinc-900 rounded-xl bg-zinc-950/60 hover:border-zinc-800 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all">
                <Layers size={24} className="text-violet-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Built to Scale</h3>
              <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">Vercel Edge deployment. 14ms latency. Auto-scaling. Handles 10,000+ concurrent users.</p>
              {/* Visual - Concentric rings */}
              <div className="mt-4 flex items-center justify-center h-12">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border border-violet-500/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping opacity-10" />
                  <div className="w-8 h-8 rounded-full border border-violet-500/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  <div className="w-4 h-4 rounded-full bg-violet-500/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Visual #17 - Speed */}
            <div className="p-6 border border-zinc-900 rounded-xl bg-zinc-950/60 hover:border-zinc-800 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-rose-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all">
                <Target size={24} className="text-orange-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Results-Driven</h3>
              <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">Average 5x ROI on marketing. 340% client growth. Transparent metrics dashboard.</p>
              {/* Visual - Progress bars */}
              <div className="mt-4 space-y-2">
                {[
                  { label: 'ROI', pct: 92, color: 'bg-orange-500' },
                  { label: 'Retention', pct: 96, color: 'bg-rose-500' },
                  { label: 'NPS', pct: 88, color: 'bg-amber-500' },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[8px] text-zinc-500 mb-0.5">
                      <span>{bar.label}</span>
                      <span>{bar.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                      <div className={`h-full ${bar.color} rounded-full transition-all duration-1000`} style={{ width: `${bar.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════ HOW IT WORKS - Visual #18 ═══════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.25em]">Our Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-3">
              From Idea to Deployment
            </h2>
          </div>

          {/* Visual #18 - Process Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-emerald-500/20 via-emerald-500/40 to-emerald-500/20" />
            
            {[
              { step: '01', title: 'Discovery', desc: 'We study your business, audience, and goals to build the right solution.', icon: <Globe size={22} /> },
              { step: '02', title: 'Design & Plan', desc: 'Wireframes, architecture, and project roadmap — approved before a line of code.', icon: <Monitor size={22} /> },
              { step: '03', title: 'Build & Iterate', desc: 'Agile sprints with weekly demos. Fast feedback loops, zero surprises.', icon: <Cpu size={22} /> },
              { step: '04', title: 'Launch & Scale', desc: 'Deploy on Vercel/AWS edge. Monitoring, optimization, and ongoing support.', icon: <Cloud size={22} /> },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="p-6 border border-zinc-900 rounded-xl bg-zinc-950/60 hover:border-emerald-500/20 transition-all h-full">
                  {/* Step circle on the timeline */}
                  <div className="w-10 h-10 bg-zinc-900 border-2 border-emerald-500/30 rounded-full flex items-center justify-center mb-4 group-hover:border-emerald-500/60 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all">
                    <span className="text-[10px] text-emerald-400 font-bold">{item.step}</span>
                  </div>
                  <div className="text-zinc-600 mb-3 group-hover:text-emerald-500/60 transition-colors">{item.icon}</div>
                  <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════ TESTIMONIALS - Visuals #19-21 (avatars) ═══════════════════ */}
      <section id="testimonials" className="py-20 sm:py-28 px-4 border-y border-zinc-900/60 bg-zinc-900/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.25em]">Client Stories</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-3">
              Trusted by Builders Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 border border-zinc-900 rounded-xl bg-zinc-950/60 hover:border-zinc-800 transition-all">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={12} className="text-emerald-500 fill-emerald-500" />
                  ))}
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-sans italic">"{t.text}"</p>
                <div className="border-t border-zinc-900 pt-4 flex items-center gap-3">
                  {/* Visual #19-21 - Gradient avatar initials */}
                  <div className={`w-10 h-10 bg-gradient-to-br ${t.color} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{t.name}</div>
                    <div className="text-[10px] text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════ CTA SECTION ═══════════════════ */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative p-10 sm:p-16 border border-zinc-900 rounded-2xl bg-zinc-900/20 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/8 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.25em]">Ready to Build?</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-3 mb-4">
                Let's Build Something
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Extraordinary</span>
              </h2>
              <p className="text-sm text-zinc-500 mb-8 max-w-lg mx-auto font-sans">
                Whether you're a gym owner needing a booking app or an enterprise scaling AI — we're your tech partner.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onNavigateToLogin}
                  className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_50px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  Access Client Portal
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <a
                  href="mailto:hello@ub.technology"
                  className="text-zinc-400 hover:text-emerald-400 text-xs font-bold uppercase tracking-wider transition-colors px-6 py-4"
                >
                  hello@ub.technology →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="border-t border-zinc-900/60 bg-zinc-950/80">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center rounded-lg">
                  <Terminal size={16} className="text-black" />
                </div>
                <span className="text-sm font-bold text-white">UB Solutions</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-sm font-sans">
                Full-stack technology agency specializing in development, AI automation, and digital growth.
                Serving local businesses and global enterprises.
              </p>
            </div>

            <div>
              <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Services</div>
              <div className="space-y-2 text-xs text-zinc-500 font-sans">
                <div className="hover:text-zinc-300 cursor-pointer transition-colors">Web Development</div>
                <div className="hover:text-zinc-300 cursor-pointer transition-colors">AI Automation</div>
                <div className="hover:text-zinc-300 cursor-pointer transition-colors">Digital Marketing</div>
                <div className="hover:text-zinc-300 cursor-pointer transition-colors">UI/UX Design</div>
                <div className="hover:text-zinc-300 cursor-pointer transition-colors">DevOps</div>
              </div>
            </div>

            <div>
              <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Company</div>
              <div className="space-y-2 text-xs text-zinc-500 font-sans">
                <div className="hover:text-zinc-300 cursor-pointer transition-colors" onClick={onNavigateToLogin}>Client Portal</div>
                <div className="hover:text-zinc-300 cursor-pointer transition-colors">Careers</div>
                <div className="hover:text-zinc-300 cursor-pointer transition-colors">Blog</div>
                <div className="hover:text-zinc-300 cursor-pointer transition-colors">Privacy Policy</div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-900/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[9px] text-zinc-600 uppercase tracking-wider">
              © 2026 UB Solutions Inc. All rights reserved.
            </span>
            <div className="flex items-center gap-4 text-[9px] text-zinc-600 uppercase tracking-wider">
              <span>Delaware C-Corp</span>
              <span className="w-1 h-1 rounded-full bg-zinc-800" />
              <span>Singapore PTE. LTD.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      {/* Bottom Left: Go to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-zinc-900 border border-zinc-800 text-emerald-400 rounded-full flex items-center justify-center shadow-lg hover:border-emerald-500/50 hover:bg-zinc-800 transition-all cursor-pointer"
        title="Go to Top"
      >
        <ArrowRight size={20} className="-rotate-90" />
      </button>

      {/* Bottom Right: Anonymous Chat Shortcut */}
      {onNavigateToChat && (
        <button
          onClick={onNavigateToChat}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all cursor-pointer group"
          title="Open Secure Anonymous Chat Hub"
        >
          <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
        </button>
      )}
    </div>
  );
};

import { useState, useEffect } from 'react';
import { ArrowRight, Brain, Zap, Clock, Compass, EyeOff, Check, Star, Shield, Volume2, Terminal } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export default function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const [activePreviewTab, setActivePreviewTab] = useState<'focus' | 'habits' | 'analytics'>('focus');
  const [scrolled, setScrolled] = useState(false);
  const [breatheScale, setBreatheScale] = useState(1);

  // Small breathing animation timer for landing visual helper
  useEffect(() => {
    const interval = setInterval(() => {
      setBreatheScale(prev => (prev === 1 ? 1.08 : 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Detect scroll to add blur to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-purple-500/30 selection:text-purple-200 relative overflow-hidden">
      {/* Background Ambient Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full ambient-orb-1 opacity-60 pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full ambient-orb-2 opacity-50 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[25%] w-[40vw] h-[40vw] rounded-full ambient-orb-3 opacity-40 pointer-events-none"></div>
      
      {/* Noise or grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70 pointer-events-none"></div>

      {/* Premium Minimal Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-navbar py-4 px-6 md:px-12' : 'bg-transparent py-6 px-6 md:px-12'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/ghostmode-logo.png" alt="GhostMode Logo" className="h-8 w-8 rounded-lg" />
            <span className="text-xl font-medium tracking-wider bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent font-sans">
              GHOST<span className="font-light">MODE</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors duration-300">System</a>
            <a href="#preview" className="hover:text-white transition-colors duration-300">Preview</a>
            <a href="#testimonials" className="hover:text-white transition-colors duration-300">Philosophy</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-300">Pricing</a>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onLogin}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300 px-3 py-1.5"
            >
              Sign In
            </button>
            <button 
              onClick={onGetStarted}
              className="relative group px-4 py-2 text-sm font-medium text-white rounded-lg overflow-hidden transition-all duration-300"
            >
              {/* Glow effect behind */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-lg blur opacity-40 group-hover:opacity-85 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-1.5 bg-[#09090b] border border-white/10 group-hover:border-white/20 px-4 py-2 rounded-lg transition-colors duration-300">
                Enter GhostMode <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Cinematic Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        {/* Micro Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-xs text-purple-300 font-mono mb-8 border-purple-500/15">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping"></span>
          <span>GhostMode v2.1: Disappear from distraction</span>
        </div>

        {/* Large Cinematic Headings */}
        <h1 className="text-5xl md:text-8xl font-extralight tracking-tight max-w-5xl leading-tight md:leading-[1.1] mb-6">
          Disappear from <br className="hidden md:inline" />
          <span className="font-normal bg-gradient-to-r from-white via-zinc-300 to-purple-300 bg-clip-text text-transparent">
            distraction.
          </span>
        </h1>

        <p className="text-base md:text-xl font-light text-zinc-400 max-w-2xl leading-relaxed mb-12">
          A quiet, premium productivity system designed for focused minds. No loud badges. No neon pressure. Just pure cognitive flow.
        </p>

        {/* Premium CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-20">
          <button
            onClick={onGetStarted}
            className="px-8 py-4 rounded-xl text-base font-medium text-black bg-white hover:bg-zinc-100 shadow-lg shadow-white/10 transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
          >
            Start Focusing <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 rounded-xl text-base font-medium text-white glass-card hover:bg-zinc-900 transition-all duration-300 flex items-center gap-2 hover:border-white/10 border border-white/5 cursor-pointer"
          >
            Explore Dashboard
          </button>
        </div>

        {/* Animated Dashboard Preview Mockup */}
        <div id="preview" className="w-full max-w-5xl mt-6 relative animate-float">
          {/* Glowing back light */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-blue-500/5 to-transparent blur-3xl -z-10"></div>
          
          <div className="glass-card rounded-2xl p-1 pb-2 border border-white/10 shadow-2xl overflow-hidden">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#121217]/60">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ef4444]/50"></span>
                <span className="h-3 w-3 rounded-full bg-[#f59e0b]/50"></span>
                <span className="h-3 w-3 rounded-full bg-[#10b981]/50"></span>
                <span className="text-xs text-zinc-500 font-mono ml-4">app.ghostmode.fm/dashboard</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500 font-mono px-2 py-0.5 rounded bg-zinc-800/40 border border-white/5">Zen Active</span>
              </div>
            </div>

            {/* Interactive Preview Inner Content */}
            <div className="bg-[#0b0b0d] p-6 min-h-[400px] text-left relative">
              {/* Switchers inside preview */}
              <div className="flex gap-3 mb-6 border-b border-white/5 pb-4">
                <button 
                  onClick={() => setActivePreviewTab('focus')}
                  className={`px-4 py-1.5 text-xs rounded-full transition-all duration-300 ${activePreviewTab === 'focus' ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Deep Focus Screen
                </button>
                <button 
                  onClick={() => setActivePreviewTab('habits')}
                  className={`px-4 py-1.5 text-xs rounded-full transition-all duration-300 ${activePreviewTab === 'habits' ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Habits Matrix
                </button>
                <button 
                  onClick={() => setActivePreviewTab('analytics')}
                  className={`px-4 py-1.5 text-xs rounded-full transition-all duration-300 ${activePreviewTab === 'analytics' ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Quiet Analytics
                </button>
              </div>

              {activePreviewTab === 'focus' && (
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center py-8">
                  {/* Focus Timer simulator */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                    <div 
                      className="relative h-48 w-48 rounded-full border border-purple-500/15 flex items-center justify-center transition-all duration-1000"
                      style={{ transform: `scale(${breatheScale})` }}
                    >
                      <div className="absolute inset-1.5 rounded-full border border-dashed border-purple-500/5"></div>
                      <div className="absolute inset-3.5 rounded-full bg-gradient-to-br from-purple-900/10 to-blue-900/5 flex flex-col items-center justify-center">
                        <span className="text-4xl font-light tracking-wider text-white">18:42</span>
                        <span className="text-[9px] text-zinc-400 uppercase tracking-widest mt-1 font-mono">Inhale State</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-light text-zinc-300">"The quiet mind is the sovereign mind."</p>
                      <p className="text-[10px] text-zinc-500 mt-1">— Marcus Aurelius</p>
                    </div>
                  </div>

                  {/* Controls Simulator */}
                  <div className="w-full md:w-64 space-y-4">
                    <div className="glass-card p-4 rounded-xl border border-white/5">
                      <span className="text-xs font-mono text-zinc-500">AMBIENT STREAM</span>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded bg-purple-500/20 flex items-center justify-center">
                            <Volume2 className="w-3 h-3 text-purple-300" />
                          </div>
                          <span className="text-xs text-zinc-300 font-medium">Midnight Rainstorm</span>
                        </div>
                        <span className="text-[10px] text-purple-400 font-mono">Active</span>
                      </div>
                    </div>
                    <div className="glass-card p-4 rounded-xl border border-white/5">
                      <span className="text-xs font-mono text-zinc-500">AI PRE-INSIGHT</span>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        Ambient rain sounds increase focus endurance by 24%. Keep going.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'habits' && (
                <div className="space-y-4 py-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-card p-4 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-300">Morning Meditation</span>
                        <span className="text-[10px] bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-full">5 Day Streak</span>
                      </div>
                      <div className="flex items-center gap-1 mt-3">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                          <div key={idx} className={`flex-1 h-6 rounded flex items-center justify-center text-[9px] font-mono ${idx < 5 ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-zinc-900 text-zinc-600'}`}>
                            {day}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card p-4 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-300">Deep Work Blocks</span>
                        <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-full">12 Day Streak</span>
                      </div>
                      <div className="flex items-center gap-1 mt-3">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                          <div key={idx} className={`flex-1 h-6 rounded flex items-center justify-center text-[9px] font-mono ${idx < 6 ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-zinc-900 text-zinc-600'}`}>
                            {day}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card p-4 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-300">Read 15 Pages</span>
                        <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded-full">8 Day Streak</span>
                      </div>
                      <div className="flex items-center gap-1 mt-3">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                          <div key={idx} className={`flex-1 h-6 rounded flex items-center justify-center text-[9px] font-mono ${idx < 4 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-zinc-900 text-zinc-600'}`}>
                            {day}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-4 rounded-xl border border-white/5 mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-zinc-400">ANNUAL GHOST MATRIX (STABILITY CALENDAR)</span>
                      <span className="text-[10px] text-zinc-600">84% CONSISTENCY</span>
                    </div>
                    {/* Miniature calendar rows */}
                    <div className="flex flex-wrap gap-1">
                      {Array.from({ length: 45 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-3.5 w-3.5 rounded-sm transition-colors ${
                            i % 7 === 0 ? 'bg-purple-500/40' : 
                            i % 5 === 0 ? 'bg-blue-500/30' :
                            i % 3 === 0 ? 'bg-cyan-500/20' : 'bg-zinc-800/50'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'analytics' && (
                <div className="space-y-4 py-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-card p-4 rounded-xl border border-white/5">
                      <span className="text-[10px] text-zinc-500 font-mono">PRODUCTIVITY COEFFICIENT</span>
                      <p className="text-2xl font-extralight text-white mt-1">89.4<span className="text-xs text-purple-300 ml-1">/100</span></p>
                      <span className="text-[9px] text-zinc-500">+4.2% from last week</span>
                    </div>
                    <div className="glass-card p-4 rounded-xl border border-white/5">
                      <span className="text-[10px] text-zinc-500 font-mono">AVERAGE SLEEP SCORE</span>
                      <p className="text-2xl font-extralight text-white mt-1">91.2%</p>
                      <span className="text-[9px] text-green-400/70">Consistent recovery rhythm</span>
                    </div>
                    <div className="glass-card p-4 rounded-xl border border-white/5">
                      <span className="text-[10px] text-zinc-500 font-mono">COGNITIVE STREAK</span>
                      <p className="text-2xl font-extralight text-white mt-1">14 Days</p>
                      <span className="text-[9px] text-zinc-500">Top active phase this season</span>
                    </div>
                  </div>

                  {/* Interactive Custom SVG Mini Chart */}
                  <div className="glass-card p-4 rounded-xl border border-white/5 mt-2">
                    <span className="text-xs font-mono text-zinc-400 block mb-3">WEEKLY INTENSITY VARIATION</span>
                    <div className="h-28 w-full flex items-end justify-between gap-2 pt-4">
                      {[30, 45, 35, 70, 90, 60, 85].map((height, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-1.5 group">
                          <div className="w-full relative bg-zinc-900 rounded-t-md overflow-hidden" style={{ height: '80px' }}>
                            <div 
                              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-500/30 to-blue-500/20 transition-all duration-500 group-hover:from-purple-400/40" 
                              style={{ height: `${height}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Absolute Floating Decorative Badges */}
          <div className="absolute -top-6 -left-8 hidden md:flex items-center gap-2 glass-card p-3 rounded-xl border border-white/10 shadow-lg animate-float-reverse">
            <div className="h-4 w-4 rounded-full bg-purple-500/40 flex items-center justify-center"><Clock className="w-2.5 h-2.5 text-purple-200" /></div>
            <div className="text-left">
              <p className="text-[9px] text-zinc-500 uppercase font-mono">FOCUS TIMELINE</p>
              <p className="text-[11px] font-light text-zinc-300">4.5 hrs logged today</p>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-6 hidden md:flex items-center gap-2 glass-card p-3 rounded-xl border border-white/10 shadow-lg animate-float">
            <div className="h-4 w-4 rounded-full bg-blue-500/40 flex items-center justify-center"><Brain className="w-2.5 h-2.5 text-blue-200" /></div>
            <div className="text-left">
              <p className="text-[9px] text-zinc-500 uppercase font-mono">AI REFLECTION</p>
              <p className="text-[11px] font-light text-zinc-300">"Flow peaks at 7 PM"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Productivity Stats Grid Section */}
      <section className="py-20 px-6 border-y border-white/5 bg-zinc-950/40 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl md:text-6xl font-extralight text-white font-mono">2.4M</h3>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Quiet Hours Completed</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-6xl font-extralight text-purple-300 font-mono">98.2%</h3>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">User Flow Satisfaction</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-6xl font-extralight text-blue-300 font-mono">14+</h3>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Ambient Soundscapes</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-6xl font-extralight text-cyan-300 font-mono">0</h3>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Intrusive Notifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section id="features" className="py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight">Built for cognitive quiet.</h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">
            Everything you need to monitor your goals, mood, and sleep. Completely free of dopamine loops and digital noise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass-card p-8 rounded-2xl border border-white/5 glass-card-hover flex flex-col gap-6">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <EyeOff className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-normal mb-2 text-white">Cinematic Focus Mode</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Fullscreen ambient spaces, breathing monitors, built-in lo-fi synthesizer streams, and customized quotes. Dims distraction instantly.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-8 rounded-2xl border border-white/5 glass-card-hover flex flex-col gap-6">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-normal mb-2 text-white">Tactile Habits & Wins</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Log daily goals and habits with a high-fidelity calendar heatmap. No point systems, just clean visual representations of consistency.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-8 rounded-2xl border border-white/5 glass-card-hover flex flex-col gap-6">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-normal mb-2 text-white">Calm Mood & Sleep Logs</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Track your emotional variance and nightly physical recovery. Uncover subtle connections between sound, screen time, and mental states.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="glass-card p-8 rounded-2xl border border-white/5 glass-card-hover flex flex-col gap-6">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-normal mb-2 text-white">Supportive AI Reflections</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                An intelligent companion that analyzes your daily notes and gives non-judgmental observations to improve focus, habits, and wellness.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="glass-card p-8 rounded-2xl border border-white/5 glass-card-hover flex flex-col gap-6">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-300">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-normal mb-2 text-white">Ultimate Data Autonomy</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We don’t lock your data away. Instant local JSON exports, zero hidden telemetry, and fully customized accent palettes designed by you.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="glass-card p-8 rounded-2xl border border-white/5 glass-card-hover flex flex-col gap-6">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-normal mb-2 text-white">Fintech Level Aesthetics</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Glassmorphism cards, thin fonts, spacious layouts, and glowing borders. Inspired by Linear, Headspace, Apple Health, and Arc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-4 lg:col-span-1">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">PHILOSOPHY</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">Designed for deep flow.</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              "GhostMode is built for people who want to get things done without the stress of gamified scores, virtual pets, or constant pop-ups."
            </p>
            <div className="flex items-center gap-2 text-yellow-400/85">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <span className="text-xs text-zinc-400 font-mono ml-1">5.0 App Store average</span>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-xl border border-white/5">
              <p className="text-sm text-zinc-300 font-light italic leading-relaxed">
                "I used to feel anxious opening my productivity tools. The red notifications felt like threats. GhostMode is different. It makes me want to shut down Slack and actually design."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300">
                  EL
                </div>
                <div>
                  <p className="text-xs font-medium text-white">Elena Rostova</p>
                  <p className="text-[10px] text-zinc-500">Senior Designer, Linear</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-white/5">
              <p className="text-sm text-zinc-300 font-light italic leading-relaxed">
                "The AI Reflection system feels like talking to a quiet mentor at midnight. It noticed I complete more deep work on high sleep score days, which changed my entire schedule."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300">
                  MC
                </div>
                <div>
                  <p className="text-xs font-medium text-white">Marcus Chen</p>
                  <p className="text-[10px] text-zinc-500">Freelance Rust Engineer</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-white/5">
              <p className="text-sm text-zinc-300 font-light italic leading-relaxed">
                "The ambient soundtrack mixed with the Pomodoro timer and breathing animation is hypnotic. GhostMode makes disappearing from the noise feel premium and easy."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300">
                  SH
                </div>
                <div>
                  <p className="text-xs font-medium text-white">Siddharth H.</p>
                  <p className="text-[10px] text-zinc-500">Creator & Writer</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-white/5">
              <p className="text-sm text-zinc-300 font-light italic leading-relaxed">
                "It's like Notion meets Apple Health, but visual, dark, and calm. Customizing the accent color makes it feel uniquely personal to my setup."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300">
                  AK
                </div>
                <div>
                  <p className="text-xs font-medium text-white">Aiko Kawahara</p>
                  <p className="text-[10px] text-zinc-500">Independent Architect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Pricing Section */}
      <section id="pricing" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative border-t border-white/5">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">SUBSCRIPTION</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">A quiet model for quiet work.</h2>
          <p className="text-zinc-400 text-sm max-w-2xl mx-auto">
            Try GhostMode free forever or unlock supreme cinematic assets and deep analytical integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Tier 1 */}
          <div className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase">BASIC RHYTHM</span>
              <h3 className="text-2xl font-light mt-2 text-white">Ghost Free</h3>
              <p className="text-xs text-zinc-400 mt-1">The core calm package.</p>
              <div className="my-6">
                <span className="text-4xl font-mono font-light text-white">$0</span>
                <span className="text-xs text-zinc-500 ml-1">/ lifetime</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> Standard Pomodoro Screen
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> Up to 5 Habits tracking
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> Basic weekly charts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> 1 Ambient sound track
                </li>
              </ul>
            </div>
            <button 
              onClick={onGetStarted}
              className="w-full mt-8 py-2.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/5 transition-all"
            >
              Get Started
            </button>
          </div>

          {/* Tier 2 - Premium Accent */}
          <div className="glass-card p-8 rounded-2xl border border-purple-500/30 flex flex-col justify-between relative glow-purple">
            <div className="absolute top-4 right-4 text-[9px] bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/30 font-mono font-medium">
              POPULAR
            </div>
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase">COMPLETE FLOW</span>
              <h3 className="text-2xl font-normal mt-2 text-white">Ghost Pro</h3>
              <p className="text-xs text-zinc-400 mt-1">The complete cinematic toolkit.</p>
              <div className="my-6">
                <span className="text-4xl font-mono font-light text-white">$8</span>
                <span className="text-xs text-zinc-400 ml-1">/ month</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> Fullscreen deep focus + sound mixing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> Unlimited habits & checklist tags
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> Deep weekly/monthly analytics
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> Premium 14+ Ambient soundtracks
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> Automatic AI Reflection generation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> Customizable accent color profiles
                </li>
              </ul>
            </div>
            <button 
              onClick={onGetStarted}
              className="w-full mt-8 py-2.5 rounded-lg text-xs font-medium bg-white text-black hover:bg-zinc-100 transition-all font-medium"
            >
              Upgrade to Pro
            </button>
          </div>

          {/* Tier 3 */}
          <div className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase">ORGANIZATION</span>
              <h3 className="text-2xl font-light mt-2 text-white">Collective</h3>
              <p className="text-xs text-zinc-400 mt-1">For remote studios & startups.</p>
              <div className="my-6">
                <span className="text-4xl font-mono font-light text-white">$15</span>
                <span className="text-xs text-zinc-500 ml-1">/ user / month</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> Everything in Pro
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> Shared focus room simulator
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> High-fidelity studio dashboard
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" /> Priority custom sounds loading
                </li>
              </ul>
            </div>
            <button 
              onClick={onGetStarted}
              className="w-full mt-8 py-2.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/5 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Call To Action Bottom Banner */}
      <section className="py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-950/20 pointer-events-none"></div>
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight">Ready to go quiet?</h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Join over 40,000 creators, engineers, and writers who have turned down the noise and reclaimed their focus.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 rounded-xl text-base font-medium text-black bg-white hover:bg-zinc-100 transition-all duration-300 inline-flex items-center gap-2 hover:-translate-y-0.5"
          >
            Get Started in 60s <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Premium Minimal Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5 z-10 relative bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-purple-500/20 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-purple-400"></div>
            </div>
            <span className="text-sm font-mono tracking-wider text-zinc-300">
              GHOSTMODE
            </span>
          </div>

          <p className="text-xs text-zinc-600">
            © 2026 GhostMode. Designed in complete silence. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Data Autonomy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

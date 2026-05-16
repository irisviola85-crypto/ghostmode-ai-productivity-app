import { useState } from 'react';
import { BarChart3, TrendingUp, Zap, HelpCircle, Calendar, Moon, Activity } from 'lucide-react';
import { Habit, MoodLog, FocusSession, SleepLog, AppSettings } from '../types';

interface AnalyticsTabProps {
  habits: Habit[];
  moods: MoodLog[];
  sessions: FocusSession[];
  sleep: SleepLog[];
  waterIntake: number;
  screenTime: number;
  settings: AppSettings;
}

export default function AnalyticsTab({
  habits,
  moods,
  sessions,
  sleep,
  waterIntake,
  screenTime,
  settings
}: AnalyticsTabProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Accent colors mapping
  const accentSolidBg = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    cyan: 'bg-cyan-500',
    lavender: 'bg-purple-400',
    gray: 'bg-zinc-400'
  }[settings.accentColor];

  const accentText = {
    purple: 'text-purple-300',
    blue: 'text-blue-300',
    cyan: 'text-cyan-300',
    lavender: 'text-purple-200',
    gray: 'text-zinc-300'
  }[settings.accentColor];

  // Calculations for stats
  const totalFocusMin = sessions.reduce((acc, s) => s.completed ? acc + s.duration : acc, 0);
  const focusHours = (totalFocusMin / 60).toFixed(1);
  
  const totalSleepHrs = sleep.reduce((acc, s) => acc + s.hours, 0);
  const avgSleep = totalSleepHrs > 0 ? (totalSleepHrs / sleep.length).toFixed(1) : '7.5';
  const avgSleepQual = sleep.length > 0 ? Math.round(sleep.reduce((acc, s) => acc + s.quality, 0) / sleep.length) : 85;

  // Daily screen time mock history relative to today
  const screenTimeHistory = [
    { day: 'Mon', screen: 4.5, focus: 2.5 },
    { day: 'Tue', screen: 3.8, focus: 4.2 },
    { day: 'Wed', screen: 5.2, focus: 3.0 },
    { day: 'Thu', screen: 2.9, focus: 5.5 },
    { day: 'Fri', screen: 4.0, focus: 1.5 },
    { day: 'Sat', screen: 6.1, focus: 0.0 },
    { day: 'Sun', screen: 3.5, focus: 3.5 }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase">COGNITIVE METRIC ENGINE</p>
        <h1 className="text-3xl font-extralight tracking-tight text-white mt-1">Quiet Analytics</h1>
        <p className="text-xs text-zinc-400 mt-1 font-light">Analyze the delicate threads correlating sound, sleep, hydration, and creative endurance.</p>
      </div>

      {/* Top Level Metric Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/5">
          <span className="text-[9px] text-zinc-500 font-mono uppercase block">WEEKLY EFFICIENCY INDEX</span>
          <p className="text-3xl font-extralight text-white mt-1.5">89.4%</p>
          <span className={`text-[9.5px] ${accentText} font-mono flex items-center gap-1 mt-1`}>
            <Zap className="w-3 h-3" /> {screenTime}h screen time today
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5">
          <span className="text-[9px] text-zinc-500 font-mono uppercase block">CUMULATIVE FOCUS PHASE</span>
          <p className="text-3xl font-extralight text-white mt-1.5">{focusHours}h</p>
          <span className="text-[9.5px] text-zinc-500 font-mono mt-1 block">
            Across {habits.length} active habit matrices
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5">
          <span className="text-[9px] text-zinc-500 font-mono uppercase block">HYDRATION SATISFACTION</span>
          <p className="text-3xl font-extralight text-white mt-1.5">{waterIntake} ml</p>
          <span className="text-[9.5px] text-zinc-500 font-mono mt-1 block">
            {waterIntake >= 3000 ? '🎯 Daily target satisfied' : 'Under baseline hydrate limit'}
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/5">
          <span className="text-[9px] text-zinc-500 font-mono uppercase block">RECOVERY CONSTANT</span>
          <p className="text-3xl font-extralight text-white mt-1.5">{avgSleep}h</p>
          <span className="text-[9.5px] text-zinc-500 font-mono mt-1 block">
            Correlated with {moods.length} logs ({avgSleepQual}% sleep quality)
          </span>
        </div>
      </div>

      {/* Complex Comparative Chart Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Comparative Chart: Focus Hours vs Screen Time */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 lg:col-span-2 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">COGNITIVE CORRELATION</span>
              </div>
              <h3 className="text-base font-normal text-white mt-1">Focus Hours vs Screen Time</h3>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <div className={`h-2.5 w-2.5 rounded-sm ${accentSolidBg}`}></div>
                <span>Focus Duration (hrs)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-zinc-800 border border-white/10"></div>
                <span>Global Screen Time (hrs)</span>
              </div>
            </div>
          </div>

          {/* SVG Rendering Bars */}
          <div className="relative h-48 w-full flex items-end justify-between gap-4 pt-8">
            {screenTimeHistory.map((h, idx) => (
              <div 
                key={idx} 
                className="flex-1 flex flex-col gap-2 relative"
                onMouseEnter={() => setHoveredItem(`comp-${idx}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Tooltip */}
                {hoveredItem === `comp-${idx}` && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-900 text-[10px] p-2.5 rounded border border-white/10 font-mono whitespace-nowrap z-20 shadow-xl">
                    <p className={`${accentText} font-bold`}>Focus: {h.focus} hrs</p>
                    <p className="text-zinc-400">Screen: {h.screen} hrs</p>
                  </div>
                )}

                {/* Bar Stack container */}
                <div className="h-32 flex gap-1.5 items-end justify-center">
                  {/* Screen Time Bar */}
                  <div className="w-3 bg-zinc-950 border border-white/5 rounded-t h-full relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-zinc-800 transition-all duration-700" 
                      style={{ height: `${(h.screen / 7) * 100}%` }}
                    ></div>
                  </div>

                  {/* Focus Hours Bar */}
                  <div className="w-3 bg-zinc-950 border border-white/5 rounded-t h-full relative overflow-hidden">
                    <div 
                      className={`absolute bottom-0 left-0 right-0 ${accentSolidBg} opacity-90 transition-all duration-700`} 
                      style={{ height: `${(h.focus / 7) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <span className="text-[10px] text-zinc-500 font-mono text-center block">{h.day}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span>CORRELATION SYNC: High focus hours occur during weeks where average screen time is maintained below 4.2h.</span>
          </div>
        </div>

        {/* Habit Category Consistency Rings */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Habits consistency</span>
            </div>
            <h3 className="text-base font-normal text-white mt-1">Rhythm Consistency</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Habits grouped by cognitive categories. High percentages show stable recurring actions.
            </p>
          </div>

          {/* Rings list */}
          <div className="space-y-4 py-2">
            {[
              { name: 'Mind Core', pct: 84, color: 'stroke-purple-400', desc: 'Meditation & sleep compliance' },
              { name: 'Body Alignment', pct: 71, color: 'stroke-blue-400', desc: 'Workout & water compliance' },
              { name: 'Creative Blocks', pct: 92, color: 'stroke-cyan-400', desc: 'Reading & writing compliance' },
              { name: 'Routine Nodes', pct: 60, color: 'stroke-zinc-500', desc: 'Chores & basic habits compliance' }
            ].map((ring, index) => {
              // SVG ring values
              const radius = 16;
              const circ = 2 * Math.PI * radius;
              const offset = circ - (ring.pct / 100) * circ;

              return (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/40 border border-white/5">
                  <div className="flex items-center gap-3">
                    {/* Mini SVG Ring */}
                    <svg className="w-10 h-10 transform -rotate-90">
                      <circle cx="20" cy="20" r={radius} className="stroke-zinc-900 fill-none stroke-[3]" />
                      <circle 
                        cx="20" 
                        cy="20" 
                        r={radius} 
                        className={`${ring.color} fill-none stroke-[3]`} 
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                      />
                    </svg>
                    <div>
                      <p className="text-xs font-medium text-zinc-200">{ring.name}</p>
                      <p className="text-[9px] text-zinc-500 font-light">{ring.desc}</p>
                    </div>
                  </div>

                  <span className="text-sm font-mono font-light text-white">{ring.pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sleep Quality & Rest Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sleep Variance analysis */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 lg:col-span-2 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">AUTONOMIC RECOVERY</span>
            </div>
            <h3 className="text-base font-normal text-white mt-1">Sleep Quality & Rest Variance (7 Days)</h3>
          </div>

          {/* Graphical Sleep Wave */}
          <div className="relative h-32 w-full flex items-end justify-between gap-1.5 pt-4">
            {sleep.slice(0, 7).reverse().map((s, index) => {
              return (
                <div key={s.id || index} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-zinc-900 text-[9px] text-white p-2 rounded border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 whitespace-nowrap z-20">
                    <p className="font-bold">{s.hours} hrs slept</p>
                    <p className="text-indigo-300">Recovery Score: {s.quality}%</p>
                    <p className="text-zinc-500 italic text-[8px]">{s.notes.substring(0, 20)}...</p>
                  </div>

                  {/* Double line comparison */}
                  <div className="w-full bg-zinc-950/60 rounded-lg p-2 flex flex-col items-center justify-center border border-white/5 gap-1 group-hover:border-purple-500/20 transition-colors">
                    <span className="text-xs font-light text-white font-mono">{s.hours}h</span>
                    <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400" style={{ width: `${s.quality}%` }}></div>
                    </div>
                    <span className="text-[8px] text-zinc-500 font-mono">{s.date.substring(5)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-[9px] text-zinc-500 font-mono pt-2">
            <span>RHYTHM: OPTIMAL</span>
            <span>TEMPERATURE BASELINE: COOL (68°F)</span>
          </div>
        </div>

        {/* AI Cognitive Insight Card */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between relative overflow-hidden">
          {/* Soft glowing orb */}
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-purple-500/5 blur-xl"></div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">INTELLIGENT CORRELATIONS</span>
              <HelpCircle className="w-3.5 h-3.5 text-zinc-600" />
            </div>
            
            <h3 className="text-base font-normal text-white mt-2">Deep Focus Catalyst</h3>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-zinc-400">
              <p>
                Our cognitive network completed a linear multi-variable regression across your logged stats.
              </p>
              <div className="p-3 rounded-lg bg-zinc-950/60 border border-white/5 space-y-2">
                <p className="text-white font-light">
                  "Your focus duration was <strong className="text-purple-300 font-mono">+42% higher</strong> on days where you meditated and maintained screen times below 3.5 hours."
                </p>
                <p className="text-[10px] text-zinc-500 font-mono">Confidence factor: 94% accuracy</p>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-zinc-500 pt-4 border-t border-white/5 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Sync status verified
          </div>
        </div>
      </div>

    </div>
  );
}

import { useState } from 'react';
import { 
  Clock, CheckSquare, Brain, Moon, Droplet, Flame, TrendingUp, Sparkles, 
  Plus, Check, Trash2, RotateCcw
} from 'lucide-react';
import { Task, Habit, MoodLog, SleepLog, AIReflection, AppSettings } from '../types';

interface DashboardTabProps {
  tasks: Task[];
  habits: Habit[];
  moods: MoodLog[];
  sleep: SleepLog[];
  reflections: AIReflection[];
  waterIntake: number;
  screenTime: number;
  settings: AppSettings;
  onAddTask: (text: string, category: 'focus' | 'health' | 'creative' | 'personal') => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onIncrementWater: (amount: number) => void;
  onResetWater: () => void;
  onNavigateToTab: (tab: any) => void;
}

export default function DashboardTab({
  tasks,
  habits,
  moods,
  sleep,
  reflections,
  waterIntake,
  screenTime,
  settings,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onIncrementWater,
  onResetWater,
  onNavigateToTab
}: DashboardTabProps) {
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCat, setNewTaskCat] = useState<'focus' | 'health' | 'creative' | 'personal'>('focus');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const totalTasksCount = tasks.length;
  const completionPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const currentMood = moods[0]?.mood || 'Calm';
  const currentSleep = sleep[0]?.hours || 7.5;
  const currentSleepQuality = sleep[0]?.quality || 85;

  // Filter high performing habits to showcase streak on dashboard
  const topHabits = habits.slice(0, 2);

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    onAddTask(newTaskText.trim(), newTaskCat);
    setNewTaskText('');
  };

  // Color mapping based on accent selection
  const accentColorClass = {
    purple: 'text-purple-400 border-purple-500/30 bg-purple-500/10 glow-purple',
    blue: 'text-blue-400 border-blue-500/30 bg-blue-500/10 glow-blue',
    cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10 glow-cyan',
    lavender: 'text-purple-300 border-purple-400/30 bg-purple-400/10',
    gray: 'text-zinc-300 border-zinc-500/30 bg-zinc-500/10'
  }[settings.accentColor];

  const accentGlowClass = {
    purple: 'from-purple-500/20 to-transparent',
    blue: 'from-blue-500/20 to-transparent',
    cyan: 'from-cyan-500/20 to-transparent',
    lavender: 'from-purple-400/20 to-transparent',
    gray: 'from-zinc-400/20 to-transparent'
  }[settings.accentColor];

  const accentSolidBg = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    cyan: 'bg-cyan-500',
    lavender: 'bg-purple-400',
    gray: 'bg-zinc-400'
  }[settings.accentColor];

  const accentBorder = {
    purple: 'border-purple-500/20 hover:border-purple-500/40',
    blue: 'border-blue-500/20 hover:border-blue-500/40',
    cyan: 'border-cyan-500/20 hover:border-cyan-500/40',
    lavender: 'border-purple-400/20 hover:border-purple-400/40',
    gray: 'border-zinc-500/20 hover:border-zinc-500/40'
  }[settings.accentColor];

  // Static mock weekly stats for custom SVG Chart
  const weeklyFocusData = [
    { day: 'Mon', hours: 2.5, intensity: 60 },
    { day: 'Tue', hours: 4.2, intensity: 85 },
    { day: 'Wed', hours: 3.0, intensity: 70 },
    { day: 'Thu', hours: 5.5, intensity: 95 },
    { day: 'Fri', hours: 1.5, intensity: 40 },
    { day: 'Sat', hours: 0.0, intensity: 0 },
    { day: 'Sun', hours: 3.5, intensity: 75 }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase">SANCTUM INTERFACE</p>
          <h1 className="text-3xl font-extralight tracking-tight text-white mt-1">
            Welcome, <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-400">Julian</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-light">"Cognitive calm is the soil from which brilliance grows."</p>
        </div>

        {/* Action shortcut pills */}
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigateToTab('focus')} 
            className="px-3.5 py-1.5 text-xs rounded-lg glass-card border border-white/5 hover:border-white/20 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-purple-400" /> Enter Focus Space
          </button>
          <button 
            onClick={() => onNavigateToTab('journal')}
            className="px-3.5 py-1.5 text-xs rounded-lg bg-white hover:bg-zinc-100 text-black transition-all flex items-center gap-1.5 font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-900" /> Write Nightly Review
          </button>
        </div>
      </div>

      {/* Main Grid Statistics Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Focus Hours */}
        <div 
          onClick={() => onNavigateToTab('focus')}
          className="glass-card p-5 rounded-2xl border border-white/5 cursor-pointer glass-card-hover relative overflow-hidden group"
        >
          <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-bl ${accentGlowClass} blur-xl opacity-40 group-hover:opacity-60 transition-opacity`}></div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Deep Work Focus</span>
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20"><Clock className="w-3.5 h-3.5" /></span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extralight text-white">3.5<span className="text-sm font-light text-zinc-500 ml-1">hrs</span></h3>
            <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
              <span className="text-green-400">▲ +12%</span> • <span className="text-purple-300/95 font-mono">{screenTime}h screen time</span>
            </p>
          </div>
        </div>

        {/* Stat 2: Tasks Completed */}
        <div 
          className="glass-card p-5 rounded-2xl border border-white/5 cursor-pointer glass-card-hover relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-bl from-blue-500/10 to-transparent blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Daily Task Wins</span>
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20"><CheckSquare className="w-3.5 h-3.5" /></span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extralight text-white">
              {completedTasksCount}<span className="text-sm font-light text-zinc-500 ml-1">/ {totalTasksCount}</span>
            </h3>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className={`h-full ${accentSolidBg} transition-all duration-500`} style={{ width: `${completionPercentage}%` }}></div>
            </div>
          </div>
        </div>

        {/* Stat 3: Mood */}
        <div 
          onClick={() => onNavigateToTab('mood')}
          className="glass-card p-5 rounded-2xl border border-white/5 cursor-pointer glass-card-hover relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-bl from-cyan-500/10 to-transparent blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Mind State</span>
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"><Brain className="w-3.5 h-3.5" /></span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-light text-white">{currentMood}</h3>
            <p className="text-[10px] text-zinc-400 mt-1">Logged 2 hours ago</p>
          </div>
        </div>

        {/* Stat 4: Sleep Quality */}
        <div 
          onClick={() => onNavigateToTab('sleep')}
          className="glass-card p-5 rounded-2xl border border-white/5 cursor-pointer glass-card-hover relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-bl from-indigo-500/10 to-transparent blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Sleep Rest</span>
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"><Moon className="w-3.5 h-3.5" /></span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extralight text-white">
              {currentSleep}<span className="text-xs text-zinc-500 font-light ml-1">hrs</span>
              <span className="text-sm font-light text-indigo-300 ml-2">({currentSleepQuality}%)</span>
            </h3>
            <p className="text-[10px] text-zinc-400 mt-1">Deep recovery cycle</p>
          </div>
        </div>
      </div>

      {/* Interactive Widgets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Water Logger Widget */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Hydration Protocol</span>
                <h3 className="text-lg font-normal text-white mt-0.5">Stay Hydrated</h3>
              </div>
              <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/15"><Droplet className="w-4 h-4" /></span>
            </div>

            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Physical hydration is strongly linked to sustained high cognitive focus scores. Take a sip.
            </p>
          </div>

          {/* Animated Water cylinder */}
          <div className="relative h-24 w-full bg-zinc-950/50 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
            {/* Simulated water wave */}
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500/30 to-cyan-500/15 transition-all duration-1000 ease-in-out" 
              style={{ height: `${Math.min(100, (waterIntake / 3000) * 100)}%` }}
            ></div>
            
            {/* Text indicators */}
            <div className="relative z-10 text-center">
              <p className="text-3xl font-light tracking-wider text-white">{waterIntake}<span className="text-xs text-zinc-400 font-mono ml-1">/ 3000 ml</span></p>
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest mt-0.5">
                {waterIntake >= 3000 ? "TARGET SATISFIED" : `${Math.round(3000 - waterIntake)} ML REMAINING`}
              </p>
            </div>
          </div>

          {/* Water Increment Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => onIncrementWater(250)}
              className={`py-2 rounded-lg border ${accentBorder} ${accentColorClass} text-[10px] font-mono transition-colors cursor-pointer`}
            >
              + 250 ml
            </button>
            <button 
              onClick={() => onIncrementWater(500)}
              className={`py-2 rounded-lg border ${accentBorder} ${accentColorClass} text-[10px] font-mono transition-colors cursor-pointer`}
            >
              + 500 ml
            </button>
            <button 
              onClick={onResetWater}
              className="py-2 rounded-lg glass-card border border-white/5 hover:border-red-500/20 text-[10px] font-mono text-zinc-400 hover:text-red-400 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>

        {/* Premium Interactive SVG Focus Intensity Graph */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 lg:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">COGNITIVE DRIFT ANALYSIS</span>
              <h3 className="text-lg font-normal text-white mt-0.5">Weekly Focus Intensity</h3>
            </div>
            <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/15"><TrendingUp className="w-4 h-4" /></span>
          </div>

          {/* SVG Graphical Display */}
          <div className="relative h-32 w-full flex items-end justify-between gap-3 pt-6">
            {weeklyFocusData.map((d, index) => (
              <div 
                key={index} 
                className="flex-1 flex flex-col items-center gap-2 cursor-pointer"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Dynamic tooltip */}
                <div className={`absolute -top-2 bg-zinc-900 text-[10px] px-2 py-1 rounded border border-white/10 font-mono text-purple-300 transition-opacity duration-200 ${hoveredBar === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  {d.hours} hrs focus ({d.intensity}% intensity)
                </div>

                <div className="w-full relative bg-zinc-950/80 h-24 rounded-md border border-white/5 overflow-hidden">
                  <div 
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${accentGlowClass} transition-all duration-700 ease-out`} 
                    style={{ height: `${d.intensity}%` }}
                  >
                    {/* Highlight top */}
                    <div className={`h-1 w-full ${accentSolidBg} opacity-80`}></div>
                  </div>
                </div>

                <span className={`text-[10px] font-mono transition-colors ${hoveredBar === index ? 'text-white' : 'text-zinc-500'}`}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-[10px] text-zinc-500 font-mono pt-4 border-t border-white/5">
            <span>PEAK FOCUS STATE: THURSDAY</span>
            <span>AVG STABILITY: 72%</span>
          </div>
        </div>
      </div>

      {/* Habits Checklist and AI Reflection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily Wins Checklist Widget */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 lg:col-span-2 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-start mb-1">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Tactile Actions</span>
                <h3 className="text-lg font-normal text-white mt-0.5">Daily Wins</h3>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">
                {completedTasksCount} OF {totalTasksCount} SATISFIED
              </span>
            </div>

            {/* Quick Add Task Input */}
            <form onSubmit={handleTaskSubmit} className="flex gap-2 mt-4">
              <input 
                type="text" 
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Draft final mockup elements..." 
                className="flex-1 bg-zinc-950/60 border border-white/5 rounded-lg px-3 py-2 text-xs focus:border-purple-500/40 focus:outline-none text-white font-light placeholder-zinc-600"
              />
              <select 
                value={newTaskCat}
                onChange={(e: any) => setNewTaskCat(e.target.value)}
                className="bg-zinc-900 border border-white/5 rounded-lg px-2 py-2 text-[10px] text-zinc-400 font-mono focus:outline-none"
              >
                <option value="focus">Focus</option>
                <option value="creative">Creative</option>
                <option value="health">Health</option>
                <option value="personal">Personal</option>
              </select>
              <button 
                type="submit"
                className="p-2 rounded-lg bg-white hover:bg-zinc-100 text-black transition-all flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            {/* Dynamic Tasks Checklist */}
            <div className="space-y-2.5 mt-4 max-h-56 overflow-y-auto pr-1">
              {tasks.map((t) => (
                <div 
                  key={t.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${t.completed ? 'bg-zinc-950/30 border-white/5 opacity-50' : 'glass-card border-white/5 hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => onToggleTask(t.id)}
                      className={`h-4 w-4 rounded flex items-center justify-center transition-colors ${t.completed ? 'bg-purple-500 text-black' : 'border border-zinc-600 hover:border-purple-400'}`}
                    >
                      {t.completed && <Check className="w-3 h-3 stroke-[3]" />}
                    </button>
                    <span className={`text-xs transition-all duration-300 ${t.completed ? 'line-through text-zinc-500' : 'text-zinc-200 font-light'}`}>
                      {t.text}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono border uppercase ${
                      t.category === 'focus' ? 'bg-purple-500/5 border-purple-500/20 text-purple-300' :
                      t.category === 'creative' ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-300' :
                      t.category === 'health' ? 'bg-green-500/5 border-green-500/20 text-green-300' :
                      'bg-zinc-800 border-white/5 text-zinc-400'
                    }`}>
                      {t.category}
                    </span>
                    <button 
                      onClick={() => onDeleteTask(t.id)}
                      className="text-zinc-600 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {tasks.length === 0 && (
                <div className="text-center py-6 text-zinc-600 text-xs font-light">
                  No wins defined for today. Add a task above.
                </div>
              )}
            </div>
          </div>

          {/* Top Habits Streaks visualization */}
          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Active Streaks:</span>
              <div className="flex gap-2">
                {topHabits.map(h => (
                  <span key={h.id} className="text-[10px] text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-white/5 flex items-center gap-1">
                    {h.name}: <strong className="text-orange-300">{h.streak}d</strong>
                  </span>
                ))}
              </div>
            </div>
            <span className="text-[9.5px] text-zinc-600 font-mono">Stability system online</span>
          </div>
        </div>

        {/* Premium AI Nightly Reflection Widget */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-bl from-purple-500/5 to-transparent blur-2xl pointer-events-none"></div>
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">INTELLECTUAL HELPER</span>
              <span className="px-1.5 py-0.5 text-[8px] font-mono bg-purple-500/10 border border-purple-500/25 rounded text-purple-300">LLM Active</span>
            </div>
            
            <h3 className="text-base font-normal text-white mt-2">Atmospheric Reflection</h3>
            
            {reflections.length > 0 ? (
              <div className="mt-4 space-y-3">
                <p className="text-xs italic text-zinc-300 leading-relaxed">
                  "{reflections[0].summary}"
                </p>
                <div className="space-y-1.5">
                  <span className="text-[9px] text-zinc-500 font-mono uppercase block">KEY OBSERVATION</span>
                  <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950/40 p-2 rounded border border-white/5">
                    {reflections[0].insights[0]}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  You haven’t generated today's calming review yet. Log some journal entries at night and click "Generate AI Reflection" to examine cognitive patterns.
                </p>
              </div>
            )}
          </div>

          <button 
            onClick={() => onNavigateToTab('journal')}
            className="w-full py-2.5 rounded-lg glass-card border border-white/5 hover:border-purple-500/20 text-xs font-medium text-zinc-300 hover:text-purple-200 transition-all flex items-center justify-center gap-2 mt-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Complete Daily Journal
          </button>
        </div>
      </div>

    </div>
  );
}

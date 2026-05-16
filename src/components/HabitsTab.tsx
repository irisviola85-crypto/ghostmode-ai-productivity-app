import React, { useState } from 'react';
import { Plus, Check, Flame, Trash2, Activity, Sparkles } from 'lucide-react';
import { Habit, AppSettings } from '../types';

interface HabitsTabProps {
  habits: Habit[];
  settings: AppSettings;
  onToggleHabit: (id: string, date: string) => void;
  onCreateHabit: (name: string, category: 'mind' | 'body' | 'creative' | 'routine') => void;
  onDeleteHabit: (id: string) => void;
}

export default function HabitsTab({
  habits,
  settings,
  onToggleHabit,
  onCreateHabit,
  onDeleteHabit
}: HabitsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCat, setNewHabitCat] = useState<'mind' | 'body' | 'creative' | 'routine'>('mind');
  
  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    onCreateHabit(newHabitName.trim(), newHabitCat);
    setNewHabitName('');
    setIsModalOpen(false);
  };

  // Helper to calculate past dates for calendar heatmap
  const getPastDatesList = (count: number) => {
    const list = [];
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      list.push(d.toISOString().split('T')[0]);
    }
    return list;
  };

  // Generate last 35 days for standard compact heatmap view
  const heatmapDates = getPastDatesList(35);

  // Theme accent mapping
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

  const categoryGlow = {
    mind: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    body: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    creative: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    routine: 'bg-zinc-800 text-zinc-400 border-white/5'
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase">CONSISTENCY PARADIGM</p>
          <h1 className="text-3xl font-extralight tracking-tight text-white mt-1">Habit Matrices</h1>
          <p className="text-xs text-zinc-400 mt-1 font-light">Repetition is the key to effortless flow. Track with intention.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className={`px-4 py-2.5 rounded-xl text-xs font-medium text-black bg-white hover:bg-zinc-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-white/5`}
        >
          <Plus className="w-4 h-4" /> Establish Habit
        </button>
      </div>

      {/* Calendar Heatmap Grid (35 Days) */}
      <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">35-DAY CONSISTENCY HEATMAP Matrix</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono uppercase">All Habits Aggregated</span>
        </div>

        {/* Heatmap */}
        <div className="flex flex-wrap gap-1.5 py-2 justify-between md:justify-start">
          {heatmapDates.map((dateStr) => {
            const completedHabitsForDay = habits.filter(h => h.completedDays.includes(dateStr));
            const totalActiveHabitsOnDay = habits.length;
            
            // Calculate density
            let density = 0;
            if (totalActiveHabitsOnDay > 0) {
              density = completedHabitsForDay.length / totalActiveHabitsOnDay;
            }

            // Color styling based on density
            let cellBg = 'bg-zinc-950 border border-white/5';
            if (density > 0.75) cellBg = `${accentSolidBg} opacity-95`;
            else if (density > 0.5) cellBg = `${accentSolidBg} opacity-75`;
            else if (density > 0.25) cellBg = `${accentSolidBg} opacity-45`;
            else if (density > 0) cellBg = `${accentSolidBg} opacity-20`;

            const dateObj = new Date(dateStr);
            const dateLabel = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            return (
              <div 
                key={dateStr}
                className={`h-8 w-8 rounded flex flex-col items-center justify-center text-[9px] font-mono transition-all relative group ${cellBg} ${density > 0 ? 'text-black font-bold' : 'text-zinc-600 hover:border-zinc-600'}`}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-1.5 bg-zinc-900 text-white text-[9px] py-1 px-2 rounded border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                  {dateLabel}: {completedHabitsForDay.length}/{totalActiveHabitsOnDay} habits done
                </div>
                <span>{dateObj.getDate()}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-white/5 text-[10px] font-mono text-zinc-500">
          <div className="flex gap-4">
            <span>Active Matrix Node count: {habits.length}</span>
            <span>Total completion days logged: {habits.reduce((acc, h) => acc + h.completedDays.length, 0)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Low consistency</span>
            <div className="h-2.5 w-2.5 rounded-sm bg-zinc-900 border border-white/5"></div>
            <div className={`h-2.5 w-2.5 rounded-sm ${accentSolidBg} opacity-20`}></div>
            <div className={`h-2.5 w-2.5 rounded-sm ${accentSolidBg} opacity-50`}></div>
            <div className={`h-2.5 w-2.5 rounded-sm ${accentSolidBg} opacity-95`}></div>
            <span>High focus</span>
          </div>
        </div>
      </div>

      {/* Habit Cards Matrix List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((h) => {
          const isDoneToday = h.completedDays.includes(todayStr);
          const weeklyCompletionCount = getPastDatesList(7).filter(d => h.completedDays.includes(d)).length;

          return (
            <div 
              key={h.id}
              className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6 hover:border-white/10 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase ${categoryGlow[h.category]}`}>
                    {h.category}
                  </span>
                  <h3 className="text-lg font-light text-white mt-2">{h.name}</h3>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Frequency: {h.frequency}</p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Streak Pill */}
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/25 text-[10px] font-mono text-orange-300">
                    <Flame className="w-3.5 h-3.5 fill-current text-orange-400" />
                    <span>{h.streak} Day Streak</span>
                  </div>
                  <button 
                    onClick={() => onDeleteHabit(h.id)}
                    className="text-zinc-600 hover:text-red-400 p-1 transition-colors"
                    title="Abandon Habit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Completion indicators */}
              <div className="space-y-2.5">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">LAST 7 DAYS MATRIX COMPLIANCE</span>
                <div className="grid grid-cols-7 gap-1.5">
                  {getPastDatesList(7).map((dateStr, idx) => {
                    const hasDone = h.completedDays.includes(dateStr);
                    const dateObj = new Date(dateStr);
                    const isTodayCell = dateStr === todayStr;
                    const daysText = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][dateObj.getDay()];

                    return (
                      <button
                        key={idx}
                        onClick={() => onToggleHabit(h.id, dateStr)}
                        className={`h-9 rounded flex flex-col items-center justify-center text-[10px] font-mono transition-all border cursor-pointer ${
                          hasDone 
                            ? `${accentSolidBg} text-black border-transparent font-bold` 
                            : isTodayCell 
                            ? 'bg-zinc-950/60 text-zinc-400 border-zinc-700 hover:border-purple-500/40'
                            : 'bg-zinc-950/20 text-zinc-600 border-white/5 hover:border-white/10'
                        }`}
                      >
                        <span className="opacity-80">{daysText}</span>
                        <span className="text-[8px] opacity-60 font-bold">{dateObj.getDate()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer values */}
              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                <div className="text-zinc-400">
                  Weekly compliance score: <strong className="text-white font-mono">{Math.round((weeklyCompletionCount / 7) * 100)}%</strong>
                </div>

                {/* Check Toggle Button */}
                <button
                  onClick={() => onToggleHabit(h.id, todayStr)}
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isDoneToday 
                      ? 'bg-green-500/10 border border-green-500/20 text-green-300' 
                      : `glass-card border border-white/5 hover:border-purple-500/20 ${accentText}`
                  }`}
                >
                  <Check className="w-3 h-3" /> {isDoneToday ? 'COMPLETED TODAY' : 'MARK TODAY COMPLETE'}
                </button>
              </div>
            </div>
          );
        })}

        {habits.length === 0 && (
          <div className="col-span-2 glass-card p-12 text-center space-y-3 rounded-2xl border border-white/5">
            <p className="text-zinc-400 text-sm font-light">You have no active habit tracking nodes configured.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-white text-black text-xs font-medium rounded-lg hover:bg-zinc-100 cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Setup First Habit
            </button>
          </div>
        )}
      </div>

      {/* Modal Form Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="relative w-full max-w-md bg-[#0b0b0e] border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> DECISION ENGINE
                </span>
                <h3 className="text-lg font-light text-white mt-1">Establish Productivity Habit</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white text-xs font-mono px-2 py-1 border border-white/5 rounded bg-zinc-900"
              >
                ESC
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Habit Label</label>
                <input 
                  type="text" 
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="E.g. Code 2 Hours in Silence" 
                  className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2.5 text-xs focus:outline-none text-white font-light placeholder-zinc-600 focus:border-purple-500/30"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Rhythm Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'mind', label: 'Mind (Meditation, Sleep)' },
                    { id: 'body', label: 'Body (Gym, Water)' },
                    { id: 'creative', label: 'Creative (Reading, Art)' },
                    { id: 'routine', label: 'Routine (Chores, Study)' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setNewHabitCat(cat.id as any)}
                      className={`p-2.5 rounded-lg text-left text-[11px] transition-all border ${
                        newHabitCat === cat.id 
                          ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
                          : 'bg-zinc-950 border-white/5 hover:border-white/10 text-zinc-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className={`w-full py-3 rounded-xl text-xs font-medium bg-white text-black hover:bg-zinc-100 transition-all flex items-center justify-center gap-1.5 mt-6 cursor-pointer`}
              >
                <Plus className="w-3.5 h-3.5" /> Establish Habit Rhythm
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

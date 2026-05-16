import React, { useState } from 'react';
import { Heart, MessageSquare, Send, ShieldAlert } from 'lucide-react';
import { MoodLog, AppSettings } from '../types';

interface MoodTabProps {
  moods: MoodLog[];
  settings: AppSettings;
  onLogMood: (mood: MoodLog['mood'], note: string, intensity: number) => void;
}

export default function MoodTab({ moods, settings, onLogMood }: MoodTabProps) {
  const [selectedMood, setSelectedMood] = useState<MoodLog['mood']>('Calm');
  const [noteText, setNoteText] = useState('');
  const [intensity, setIntensity] = useState(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogMood(selectedMood, noteText, intensity);
    setNoteText('');
    setIntensity(4);
    alert("Your physical and mental baseline has been decrypted and logged.");
  };

  const moodEmojis: Record<MoodLog['mood'], string> = {
    Calm: '🧘',
    Happy: '✨',
    Focused: '🎯',
    Tired: '⏳',
    'Burned Out': '🔥',
    Motivated: '🚀'
  };

  const moodColors: Record<MoodLog['mood'], string> = {
    Calm: 'from-purple-500/20 to-purple-500/5 border-purple-500/35 text-purple-300',
    Happy: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/35 text-yellow-300',
    Focused: 'from-blue-500/20 to-blue-500/5 border-blue-500/35 text-blue-300',
    Tired: 'from-zinc-500/20 to-zinc-500/5 border-zinc-500/35 text-zinc-300',
    'Burned Out': 'from-red-500/20 to-red-500/5 border-red-500/35 text-red-300',
    Motivated: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/35 text-cyan-300'
  };

  // Color helpers based on global accent settings
  const accentColorClass = {
    purple: 'bg-purple-500 hover:bg-purple-400 shadow-purple-500/20',
    blue: 'bg-blue-500 hover:bg-blue-400 shadow-blue-500/20',
    cyan: 'bg-cyan-500 hover:bg-cyan-400 shadow-cyan-500/20',
    lavender: 'bg-purple-400 hover:bg-purple-350 shadow-purple-400/20',
    gray: 'bg-zinc-400 hover:bg-zinc-300 shadow-zinc-400/20'
  }[settings.accentColor];

  // Mood statistics
  const totalLogs = moods.length;
  const avgIntensity = totalLogs > 0 
    ? (moods.reduce((acc, m) => acc + m.intensity, 0) / totalLogs).toFixed(1) 
    : 'N/A';

  const burnOutCount = moods.filter(m => m.mood === 'Burned Out').length;
  const stabilityIndex = totalLogs > 0 
    ? Math.round(((totalLogs - burnOutCount) / totalLogs) * 100) 
    : 100;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase">EMOTIONAL BASELINE</p>
        <h1 className="text-3xl font-extralight tracking-tight text-white mt-1">Mind State Tracker</h1>
        <p className="text-xs text-zinc-400 mt-1 font-light">Trace the variance of your energy. Align focus sessions to your biological clock.</p>
      </div>

      {/* Main Logging Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Log Mood Form */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6 h-fit">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">CRYPTO DECRYPTION INPUT</span>
              <h3 className="text-base font-normal text-white mt-0.5">Log Daily Mindstate</h3>
            </div>
            <Heart className="w-4 h-4 text-purple-400 animate-pulse" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Emojis Select Grid */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Select Current Mood Preset</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Calm', 'Happy', 'Focused', 'Tired', 'Burned Out', 'Motivated'] as const).map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setSelectedMood(mood)}
                    className={`p-3 rounded-xl text-center border transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      selectedMood === mood 
                        ? `bg-gradient-to-b ${moodColors[mood]}` 
                        : 'bg-zinc-950/40 border-white/5 hover:border-white/10 text-zinc-400'
                    }`}
                  >
                    <span className="text-xl">{moodEmojis[mood]}</span>
                    <span className="text-[10px] font-mono">{mood}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity Range slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>COGNITIVE INTENSITY ACCENT</span>
                <span>LEVEL {intensity} / 5</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full accent-purple-400 bg-zinc-800 h-1.5 rounded-lg focus:outline-none"
              />
              <div className="flex justify-between text-[8px] text-zinc-600 font-mono">
                <span>1 (COMPLETELY PASSIVE)</span>
                <span>5 (VIBRANT ENERGY)</span>
              </div>
            </div>

            {/* Daily Notes */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Mental Reflections & Context</label>
              <textarea 
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Deep quiet inside. Woke up early to design without checking notifications..." 
                className="w-full bg-zinc-950 border border-white/5 rounded-lg p-3 text-xs focus:outline-none text-white font-light placeholder-zinc-600 h-24 resize-none focus:border-purple-500/30"
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              className={`w-full py-3 rounded-xl text-xs font-medium text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${accentColorClass}`}
            >
              <Send className="w-3.5 h-3.5" /> Archive Mood Node
            </button>
          </form>
        </div>

        {/* Column 2: Analytics and Feed */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Mood Trend analytics cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-xl border border-white/5">
              <span className="text-[9px] text-zinc-500 font-mono uppercase block">TOTAL LOGS</span>
              <p className="text-2xl font-extralight text-white mt-1">{totalLogs}</p>
              <span className="text-[9px] text-zinc-500">Archived sequences</span>
            </div>
            <div className="glass-card p-4 rounded-xl border border-white/5">
              <span className="text-[9px] text-zinc-500 font-mono uppercase block">AVG INTENSITY</span>
              <p className="text-2xl font-extralight text-purple-300 mt-1">{avgIntensity}</p>
              <span className="text-[9px] text-zinc-500">Out of 5 points</span>
            </div>
            <div className="glass-card p-4 rounded-xl border border-white/5">
              <span className="text-[9px] text-zinc-500 font-mono uppercase block">STABILITY COEFFICIENT</span>
              <p className="text-2xl font-extralight text-cyan-300 mt-1">{stabilityIndex}%</p>
              <span className="text-[9px] text-zinc-500">Resistance to burnout</span>
            </div>
          </div>

          {/* Beautiful Custom Mood Area Wave Chart */}
          <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">AUTONOMIC VARIABILITY WAVE</span>
                <h3 className="text-sm font-normal text-white mt-0.5">Mental Fluctuations (Past 7 Logs)</h3>
              </div>
              <span className="px-2 py-0.5 text-[8px] font-mono bg-purple-500/10 border border-purple-500/20 rounded text-purple-300">Wave active</span>
            </div>

            {/* SVG Area Chart */}
            <div className="relative h-36 w-full pt-4 flex flex-col justify-between">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                <div className="border-t border-white w-full"></div>
                <div className="border-t border-white w-full"></div>
                <div className="border-t border-white w-full"></div>
              </div>

              <div className="h-28 w-full flex items-end justify-between gap-1 relative z-10">
                {moods.slice(0, 7).reverse().map((m, idx) => {
                  const heightPct = (m.intensity / 5) * 100;

                  return (
                    <div key={m.id || idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 bg-zinc-900 text-[9px] text-white p-2 rounded border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300 z-20">
                        <p className="font-bold">{m.mood} ({m.intensity}/5)</p>
                        <p className="text-zinc-500 italic text-[8.5px]">"{m.note.substring(0, 25)}..."</p>
                      </div>

                      {/* Glowing Column Bar */}
                      <div className="w-6 bg-zinc-950 rounded-t-md relative overflow-hidden h-24 border border-white/5">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-500/30 to-blue-500/10 group-hover:from-purple-400/40 transition-all duration-500"
                          style={{ height: `${heightPct}%` }}
                        >
                          <div className="h-1 w-full bg-purple-400"></div>
                        </div>
                      </div>

                      <span className="text-lg mt-1">{moodEmojis[m.mood]}</span>
                      <span className="text-[8px] font-mono text-zinc-600 mt-0.5">{m.date.substring(5)}</span>
                    </div>
                  );
                })}

                {moods.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-xs font-light">
                    No mind waves tracked yet. Log a mood above.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Historical logs list */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">CHRONOLOGICAL BASELINE ENTRIES</span>
            
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {moods.map((m) => (
                <div key={m.id} className="glass-card p-4 rounded-xl border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{moodEmojis[m.mood]}</span>
                      <div>
                        <h4 className="text-xs font-medium text-white">{m.mood}</h4>
                        <p className="text-[9px] text-zinc-500 font-mono">{m.date} at {m.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] text-zinc-400 font-mono">INTENSITY: {m.intensity}/5</span>
                      {m.mood === 'Burned Out' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-mono bg-red-500/10 text-red-400 border border-red-500/20">
                          <ShieldAlert className="w-2.5 h-2.5" /> Warning
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 font-light leading-relaxed bg-zinc-950/40 p-3 rounded border border-white/5 flex items-start gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-600 mt-0.5 flex-shrink-0" />
                    <span>{m.note}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

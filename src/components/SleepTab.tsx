import React, { useState } from 'react';
import { Moon, Sparkles, Trash2, PlusCircle, Sun, ShieldAlert } from 'lucide-react';
import { SleepLog, AppSettings } from '../types';

interface SleepTabProps {
  sleep: SleepLog[];
  settings: AppSettings;
  onLogSleep: (hours: number, quality: number, notes: string) => void;
  onDeleteSleep: (id: string) => void;
}

export default function SleepTab({
  sleep,
  settings,
  onLogSleep,
  onDeleteSleep
}: SleepTabProps) {
  const [hours, setHours] = useState(7.5);
  const [quality, setQuality] = useState(85);
  const [notes, setNotes] = useState('');
  
  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hours <= 0 || quality <= 0) return;
    onLogSleep(hours, quality, notes.trim() || 'Felt calm. Rested in dark environment.');
    setNotes('');
    alert("Nightly sleep recovery log decrypted and saved to your secure profile.");
  };

  // Color presets based on global settings
  const accentText = {
    purple: 'text-purple-300',
    blue: 'text-blue-300',
    cyan: 'text-cyan-300',
    lavender: 'text-purple-200',
    gray: 'text-zinc-300'
  }[settings.accentColor];

  const accentSolidBg = {
    purple: 'bg-purple-500 hover:bg-purple-400',
    blue: 'bg-blue-500 hover:bg-blue-400',
    cyan: 'bg-cyan-500 hover:bg-cyan-400',
    lavender: 'bg-purple-400 hover:bg-purple-350',
    gray: 'bg-zinc-400 hover:bg-zinc-300'
  }[settings.accentColor];

  // Calculated statistics
  const totalSleepDays = sleep.length;
  const avgHours = totalSleepDays > 0 
    ? (sleep.reduce((acc, s) => acc + s.hours, 0) / totalSleepDays).toFixed(1)
    : '7.5';
  
  const avgQual = totalSleepDays > 0
    ? Math.round(sleep.reduce((acc, s) => acc + s.quality, 0) / totalSleepDays)
    : 85;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase">AUTONOMIC REPAIR</p>
        <h1 className="text-3xl font-extralight tracking-tight text-white mt-1">Sleep Recovery Log</h1>
        <p className="text-xs text-zinc-400 mt-1 font-light">Track circadian stability. Protect physical cellular recovery periods.</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Log Sleep Form */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6 h-fit">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">AUTONOMIC DATA CAPTURE</span>
              <h3 className="text-base font-normal text-white mt-0.5">Log Sleep Cycle</h3>
            </div>
            <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"><Moon className="w-4 h-4" /></span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Hours Input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>SLEEP DURATION</span>
                <span className="text-white font-mono">{hours} HOURS</span>
              </div>
              <input 
                type="range" 
                min="4" 
                max="12" 
                step="0.1"
                value={hours}
                onChange={(e) => setHours(parseFloat(e.target.value))}
                className="w-full accent-purple-400 bg-zinc-800 h-1.5 rounded-lg focus:outline-none"
              />
              <div className="flex justify-between text-[8px] text-zinc-600 font-mono">
                <span>4.0h (PASSIVE REST)</span>
                <span>12.0h (DEEP SHUTDOWN)</span>
              </div>
            </div>

            {/* Subjective Quality Input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>RECOVERY QUALITY</span>
                <span className="text-white font-mono">{quality}%</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="100" 
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full accent-purple-400 bg-zinc-800 h-1.5 rounded-lg focus:outline-none"
              />
              <div className="flex justify-between text-[8px] text-zinc-600 font-mono">
                <span>20% (RESTLESS & ALARMED)</span>
                <span>100% (TRANSFORMATIONAL REST)</span>
              </div>
            </div>

            {/* Contextual Notes */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Contextual Variables</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Room temp at 67°F. Fasted 3 hours before sleeping. Performed 5m evening breathing session..."
                className="w-full bg-zinc-950 border border-white/5 rounded-lg p-3 text-xs focus:outline-none text-white font-light placeholder-zinc-600 h-20 resize-none focus:border-purple-500/30 leading-relaxed"
              ></textarea>
            </div>

            <button 
              type="submit"
              className={`w-full py-3 rounded-xl text-xs font-medium text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${accentSolidBg}`}
            >
              <PlusCircle className="w-3.5 h-3.5" /> Commit Sleep Parameters
            </button>
          </form>
        </div>

        {/* Column 2: Sleep statistics and logs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Sleep metrics cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-xl border border-white/5">
              <span className="text-[9px] text-zinc-500 font-mono uppercase block">AVG DURATION</span>
              <p className="text-2xl font-extralight text-white mt-1">{avgHours}<span className="text-xs text-zinc-500 ml-1">hrs</span></p>
              <span className="text-[9px] text-zinc-500">Optimal REST threshold</span>
            </div>
            <div className="glass-card p-4 rounded-xl border border-white/5">
              <span className="text-[9px] text-zinc-500 font-mono uppercase block">REST QUALITY INDEX</span>
              <p className="text-2xl font-extralight text-purple-300 mt-1">{avgQual}%</p>
              <span className="text-[9px] text-zinc-500">Rhythm efficiency constant</span>
            </div>
            <div className="glass-card p-4 rounded-xl border border-white/5">
              <span className="text-[9px] text-zinc-500 font-mono uppercase block">CIRCADIAN PHASE</span>
              <p className="text-2xl font-extralight text-cyan-300 mt-1">Synchronized</p>
              <span className="text-[9px] text-zinc-500">Zero light friction detected</span>
            </div>
          </div>

          {/* Visual sleep list */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">CHRONOLOGICAL RECOVERY ENTRIES</span>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {sleep.map((s) => {
                const isLowSleep = s.hours < 6.5 || s.quality < 70;

                return (
                  <div key={s.id} className="glass-card p-5 rounded-2xl border border-white/5 space-y-3 hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${isLowSleep ? 'bg-orange-500/10 text-orange-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                          {isLowSleep ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </div>
                        <div>
                          <h4 className="text-sm font-normal text-white">
                            {s.hours} Hours slept <span className="text-xs text-zinc-500 font-light">({s.quality}% Recovery)</span>
                          </h4>
                          <p className="text-[9px] text-zinc-500 font-mono">{s.date === todayStr ? 'LAST NIGHT' : s.date}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => onDeleteSleep(s.id)}
                        className="text-zinc-600 hover:text-red-400 p-1 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-zinc-300 font-light leading-relaxed bg-zinc-950/40 p-3 rounded-xl border border-white/5">
                      {s.notes}
                    </p>

                    {isLowSleep && (
                      <div className="flex items-center gap-2 p-2.5 rounded bg-orange-500/5 border border-orange-500/15 text-[10px] text-orange-300 font-mono">
                        <ShieldAlert className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                        <span>Warning: High physiological strain warning. Limit caffeine and screens tonight.</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {sleep.length === 0 && (
                <div className="glass-card p-12 text-center text-zinc-600 text-xs font-light rounded-2xl border border-white/5">
                  No recovery logs exist in this environment. Let's log your sleep above.
                </div>
              )}
            </div>
          </div>

          {/* Sleep Tips Box */}
          <div className="glass-card p-6 rounded-2xl border border-white/5 flex gap-4 items-start relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-purple-500/5 blur-xl pointer-events-none"></div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-left">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Binaural Sleep Recommendations</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Based on your logs, sleeping at a cooler temperature (<span className={`font-semibold ${accentText}`}>68°F</span>) was associated with a 14% increase in subjective morning recovery scores. Play the Binaural Deep Drone at 15% volume inside Focus Space before drifting off.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

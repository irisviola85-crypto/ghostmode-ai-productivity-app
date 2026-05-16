import React, { useState } from 'react';
import { Sparkles, Compass, ShieldCheck, HelpCircle, AlertCircle, Calendar, Send } from 'lucide-react';
import { AIReflection, AppSettings, MoodLog, Task } from '../types';

interface JournalTabProps {
  reflections: AIReflection[];
  moods: MoodLog[];
  tasks: Task[];
  settings: AppSettings;
  onGenerateReflection: (journalText: string, summary: string, insights: string[], recommendation: string) => void;
}

export default function JournalTab({
  reflections,
  moods,
  tasks,
  settings,
  onGenerateReflection
}: JournalTabProps) {
  const [journalInput, setJournalInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  // Dynamic simulation helper based on what they write + today's metrics!
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalInput.trim()) return;

    setIsGenerating(true);
    setGenerationStep('Ingesting raw cognitive input...');

    setTimeout(() => {
      setGenerationStep('Analyzing baseline emotional fluctuations...');
    }, 800);

    setTimeout(() => {
      setGenerationStep('Synthesizing non-judgmental insights...');
    }, 1600);

    setTimeout(() => {
      setGenerationStep('Formulating physiological suggestions...');
    }, 2400);

    setTimeout(() => {
      // Customize the summary and insights based on the user's note + stats!
      const note = journalInput.toLowerCase();
      const currentMood = moods[0]?.mood || 'Calm';
      const completedCount = tasks.filter(t => t.completed).length;
      
      let summary = "A thoughtful cycle marked by personal balance and quiet progress.";
      let insights = [
        "Your focus endurance stays high when meditating in the morning.",
        "Your text reflects emotional stability, matching your logged Calm state."
      ];
      let recommendation = "Introduce a 5-minute visual reset (looking at distant objects) to mitigate screen fatigue.";

      if (note.includes('tired') || note.includes('exhausted') || note.includes('sleep') || currentMood === 'Tired') {
        summary = "A recovery-focused day highlighting physical depletion and the need for restful boundaries.";
        insights = [
          "You reported feeling tired early in the afternoon, correlating with screen time.",
          "Energy reserves were preserved by skipping intense late-night work cycles."
        ];
        recommendation = "Dim all display panels to absolute minimum after 9 PM and prioritize 8 hours of uninterrupted cool sleep.";
      } else if (note.includes('productive') || note.includes('code') || note.includes('design') || completedCount > 2) {
        summary = "A high-signal creative day with strong task execution and deep flow immersion.";
        insights = [
          `You completed ${completedCount} vital daily wins, which is higher than your weekly median.`,
          "Avoided high-dopamine distractions during early-afternoon focus peaks."
        ];
        recommendation = "Ride this creative wave, but introduce a 15-minute sunset walk to allow ideas to crystallize sub-consciously.";
      } else if (note.includes('anxious') || note.includes('stressed') || note.includes('notifications') || currentMood === 'Burned Out') {
        summary = "An overstimulated cycle demanding cognitive boundaries and digital unplugging.";
        insights = [
          "Your text points to high notification friction and minor anxiety factors.",
          "Cognitive drift was successfully arrested by logging out of external communication networks early."
        ];
        recommendation = "Activate complete Zen Mode. Spend 10 minutes doing mindful equal-breathing inside the Focus Space.";
      }

      onGenerateReflection(journalInput.trim(), summary, insights, recommendation);
      setJournalInput('');
      setIsGenerating(false);
      setGenerationStep('');
      alert("AI Reflection successfully generated and committed to the workspace vault.");
    }, 3200);
  };

  // Theme styling
  const accentText = {
    purple: 'text-purple-300',
    blue: 'text-blue-300',
    cyan: 'text-cyan-300',
    lavender: 'text-purple-200',
    gray: 'text-zinc-300'
  }[settings.accentColor];

  const accentGlowClass = {
    purple: 'glow-purple border-purple-500/20 bg-purple-500/5',
    blue: 'glow-blue border-blue-500/20 bg-blue-500/5',
    cyan: 'glow-cyan border-cyan-500/20 bg-cyan-500/5',
    lavender: 'border-purple-400/20 bg-purple-400/5',
    gray: 'border-zinc-500/20 bg-zinc-500/5'
  }[settings.accentColor];

  const accentSolidBg = {
    purple: 'bg-purple-500 hover:bg-purple-400',
    blue: 'bg-blue-500 hover:bg-blue-400',
    cyan: 'bg-cyan-500 hover:bg-cyan-400',
    lavender: 'bg-purple-400 hover:bg-purple-350',
    gray: 'bg-zinc-400 hover:bg-zinc-300'
  }[settings.accentColor];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase">COGNITIVE COMPILER</p>
        <h1 className="text-3xl font-extralight tracking-tight text-white mt-1">Atmospheric Journal</h1>
        <p className="text-xs text-zinc-400 mt-1 font-light">Empty your thoughts at twilight. Uncover quiet patterns in your day.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Writing Section */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6 h-fit lg:col-span-2">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">NIGHTLY SANCTUM PROMPT</span>
              <h3 className="text-lg font-light text-white mt-1">How was your day?</h3>
            </div>
            <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400"><Compass className="w-4 h-4" /></span>
          </div>

          {isGenerating ? (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-5">
              <div className="relative h-14 w-14 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/10 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full border-2 border-purple-400 border-t-transparent animate-spin"></div>
              </div>
              <div className="space-y-2">
                <p className={`text-sm font-mono ${accentText} animate-pulse`}>{generationStep}</p>
                <p className="text-[10px] text-zinc-500 font-light">Executing neural semantic parse...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGenerate} className="space-y-4">
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Write about your focus levels, physical feelings, distractions, or minor victories. Our local supportive compiler will formulate insights based on today's habit & mood stats.
              </p>

              <textarea 
                value={journalInput}
                onChange={(e) => setJournalInput(e.target.value)}
                placeholder="Today felt very serene. I unplugged from Slack at 4 PM and wrote code in complete focus. Felt a bit of minor shoulder fatigue, but drinking 3 liters of water helped keep my cognitive baseline steady..."
                className="w-full bg-zinc-950 border border-white/5 rounded-xl p-4 text-xs focus:outline-none text-white font-light placeholder-zinc-600 h-48 resize-none focus:border-purple-500/30 leading-relaxed"
                required
              ></textarea>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[10px] font-mono text-zinc-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500/50" /> Local vault encryption active
                </span>
                
                <button
                  type="submit"
                  className={`px-5 py-3 rounded-xl text-xs font-semibold text-black transition-all flex items-center gap-2 cursor-pointer shadow-lg ${accentSolidBg}`}
                >
                  <Sparkles className="w-3.5 h-3.5" /> Generate AI Reflection <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Quick statistics / Tips column */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Atmospheric Tone</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Our AI reflection assistant doesn't judge, criticize, or demand. It reads emotional cues, flags potential stressors, and suggests physical corrections.
            </p>
            <div className="p-3 rounded-lg bg-zinc-950/50 border border-white/5 flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 text-purple-300 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Data remains local. GhostMode never sells your personal written diaries or telemetry logs to external aggregators.
              </p>
            </div>
          </div>

          {reflections.length > 0 && (
            <div className={`glass-card p-6 rounded-2xl border ${accentGlowClass} space-y-4`}>
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block">LATEST VAULT INSIGHT</span>
              <h4 className="text-sm font-normal text-white">"{reflections[0].summary}"</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Recommendation: {reflections[0].recommendation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chronological reflection vault */}
      <div className="space-y-4">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">HISTORICAL COGNITIVE VAULT</span>

        <div className="space-y-4">
          {reflections.map((ref) => (
            <div key={ref.id} className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex justify-between items-start pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono text-zinc-300">{ref.date}</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase">RHYTHM SYNC LOG</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User raw diary */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block">RAW DIARY INPUT</span>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light bg-zinc-950/40 p-3 rounded border border-white/5 italic">
                    "{ref.userJournal}"
                  </p>
                </div>

                {/* AI Insights */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block">COGNITIVE OBSERVATIONS</span>
                  <ul className="space-y-2">
                    {ref.insights.map((ins, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2 font-light leading-relaxed">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></span>
                        <span>{ins}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Recommendation */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-purple-400 uppercase block">PHYSIOLOGICAL RECOMMENDATION</span>
                  <p className="text-xs text-purple-200 bg-purple-500/5 border border-purple-500/15 p-3 rounded-xl leading-relaxed font-light">
                    {ref.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {reflections.length === 0 && (
            <div className="glass-card p-12 text-center text-zinc-600 text-xs font-light rounded-2xl border border-white/5">
              No cognitive vault records found. Generate your first reflection above.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

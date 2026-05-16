import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Brain, Wind, RefreshCw, Music } from 'lucide-react';
import { FocusSession, AppSettings } from '../types';
import { CALMING_QUOTES } from '../data/mockData';

interface FocusTabProps {
  sessions: FocusSession[];
  settings: AppSettings;
  onLogSession: (duration: number, soundTrack: string) => void;
}

export default function FocusTab({ sessions, settings, onLogSession }: FocusTabProps) {
  // Timer States
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');
  const [customMinutes, setCustomMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(25 * 60);
  
  // Ambient Sound State
  const [selectedSound, setSelectedSound] = useState<string>('Binaural Deep Drone');
  const [synthActive, setSynthActive] = useState(false);
  const [soundVolume, setSoundVolume] = useState(settings.soundVolume);

  // Quote state
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);

  // Breathing exercises state
  const [breatheState, setBreatheState] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breatheCounter, setBreatheCounter] = useState(4);

  // Web Audio Synth Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Timer execution
  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Session complete
      setIsRunning(false);
      const completedMinutes = Math.round(initialTime / 60);
      onLogSession(completedMinutes, selectedSound);
      alert(`Focus session completed! You focused for ${completedMinutes} minutes. Take a calm breath.`);
      // Reset
      setTimeLeft(initialTime);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, initialTime, selectedSound, onLogSession]);

  // Quote Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIdx(prev => (prev + 1) % CALMING_QUOTES.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Breathing state animation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setBreatheCounter(prev => {
        if (prev <= 1) {
          // Transition
          setBreatheState(current => {
            if (current === 'Inhale') return 'Hold';
            if (current === 'Hold') return 'Exhale';
            return 'Inhale';
          });
          // Reset counter based on state duration
          return 4; // 4s rhythm for equal breathing
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Web Audio Binaural Synth Setup
  const startAudioSynth = () => {
    try {
      if (audioCtxRef.current === null) {
        // Standard AudioContext fallback
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create Oscillator and Gain for Binaural Drone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (selectedSound === 'Binaural Deep Drone') {
        // 110Hz deep focus carrier frequency
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
      } else if (selectedSound === 'Muted Pink Noise') {
        // Low pass drone
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(80, ctx.currentTime);
      } else {
        // Soft sine
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
      }

      // Connect nodes
      osc.connect(gain);
      gain.connect(ctx.destination);

      // Soft volume based on user slider
      const finalVol = (soundVolume / 100) * 0.08; // Keep drone quiet and relaxing
      gain.gain.setValueAtTime(finalVol, ctx.currentTime);

      osc.start();

      oscRef.current = osc;
      gainNodeRef.current = gain;
      setSynthActive(true);
    } catch (e) {
      console.error("Audio synth failed to initiate.", e);
    }
  };

  const stopAudioSynth = () => {
    try {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      setSynthActive(false);
    } catch (e) {
      console.error("Failed to stop synth", e);
    }
  };

  // Handle volume change
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const finalVol = (soundVolume / 100) * 0.08;
      gainNodeRef.current.gain.setValueAtTime(finalVol, audioCtxRef.current.currentTime);
    }
  }, [soundVolume]);

  // Toggle audio synth
  const toggleAudioStream = () => {
    if (synthActive) {
      stopAudioSynth();
    } else {
      startAudioSynth();
    }
  };

  // Sound selection change
  const changeSoundtrack = (track: string) => {
    setSelectedSound(track);
    if (synthActive) {
      stopAudioSynth();
      // Restart with new parameters after a microdelay
      setTimeout(() => startAudioSynth(), 150);
    }
  };

  // Preset Focus Timers
  const applyPreset = (minutes: number, mode: 'work' | 'break') => {
    setIsRunning(false);
    setTimerMode(mode);
    setCustomMinutes(minutes);
    setTimeLeft(minutes * 60);
    setInitialTime(minutes * 60);
  };

  // Manual minutes change
  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (isNaN(val) || val <= 0) return;
    setCustomMinutes(val);
    setTimeLeft(val * 60);
    setInitialTime(val * 60);
  };

  // Format Time
  const formatTimeStr = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = ((initialTime - timeLeft) / initialTime) * 100;

  const currentQuote = CALMING_QUOTES[currentQuoteIdx];

  const completedSessionsCount = sessions.filter(s => s.completed).length;
  const totalFocusMinutes = sessions.reduce((acc, s) => s.completed ? acc + s.duration : acc, 0);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase">COGNITIVE ESCAPE</p>
        <h1 className="text-3xl font-extralight tracking-tight text-white mt-1">Cinematic Focus Space</h1>
        <p className="text-xs text-zinc-400 mt-1 font-light">Unplug the alerts. Drown out the chatter. Sink into cognitive quiet.</p>
      </div>

      {/* Immersive Focus Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1: Primary Pomodoro Engine */}
        <div className="glass-card p-8 rounded-2xl border border-white/5 lg:col-span-2 flex flex-col items-center justify-center relative overflow-hidden min-h-[450px]">
          {/* Background ambient pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl pointer-events-none animate-pulse-slow"></div>
          
          {/* Mode Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/60 border border-white/5 text-[10px] text-purple-300 font-mono uppercase tracking-wider mb-8 z-10">
            <span className={`h-2 w-2 rounded-full ${isRunning ? 'bg-purple-400 animate-ping' : 'bg-zinc-600'}`}></span>
            <span>{timerMode === 'work' ? 'DEEP FLOW STATE' : 'CALM INTEGRATIVE BREAK'}</span>
          </div>

          {/* Circular Progress Timer Display */}
          <div className="relative h-64 w-64 flex items-center justify-center z-10 mb-8">
            {/* Svg outer circle tracking progress */}
            <svg className="absolute inset-0 h-full w-full transform -rotate-95">
              <circle 
                cx="128" 
                cy="128" 
                r="115" 
                className="stroke-zinc-950 fill-none stroke-[4]"
              />
              <circle 
                cx="128" 
                cy="128" 
                r="115" 
                className="stroke-purple-500/30 fill-none stroke-[3] transition-all duration-1000"
                strokeDasharray={722}
                strokeDashoffset={722 - (722 * progressPercentage) / 100}
              />
            </svg>

            {/* Time text */}
            <div className="text-center space-y-1 relative">
              <h2 className="text-6xl font-extralight tracking-wider text-white font-mono">
                {formatTimeStr(timeLeft)}
              </h2>
              <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">
                {isRunning ? "DEEP FOCUS ACTIVE" : "SUSPENDED STATE"}
              </p>
            </div>
          </div>

          {/* Immersive Quote display */}
          <div className="text-center max-w-md mb-8 min-h-[50px] flex flex-col justify-center">
            <p className="text-xs italic text-zinc-300 font-light">
              "{currentQuote.text}"
            </p>
            <p className="text-[9px] text-zinc-500 uppercase font-mono mt-1.5 tracking-wider">
              — {currentQuote.author}
            </p>
          </div>

          {/* Dynamic Controls */}
          <div className="flex items-center gap-4 z-10">
            {/* Play / Pause */}
            {isRunning ? (
              <button 
                onClick={() => setIsRunning(false)}
                className="h-14 w-14 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white transition-all flex items-center justify-center cursor-pointer hover:scale-105 shadow-lg"
              >
                <Pause className="w-5 h-5 fill-current" />
              </button>
            ) : (
              <button 
                onClick={() => setIsRunning(true)}
                className="h-14 w-14 rounded-full bg-white hover:bg-zinc-100 text-black transition-all flex items-center justify-center cursor-pointer hover:scale-105 shadow-lg shadow-white/10"
              >
                <Play className="w-5 h-5 fill-current ml-1" />
              </button>
            )}

            {/* Reset / Stop */}
            <button 
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(initialTime);
              }}
              className="h-10 w-10 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white transition-all flex items-center justify-center cursor-pointer"
              title="Reset Session"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Column 2: Ambient Sound & Breathing Coach */}
        <div className="space-y-6">
          
          {/* Breathing Coach Widget */}
          <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[200px] relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">AUTONOMIC NERVOUS RESET</span>
                <h3 className="text-sm font-normal text-white mt-0.5">Equal Breathing Pacer</h3>
              </div>
              <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400"><Wind className="w-4 h-4 animate-pulse" /></span>
            </div>

            {/* Breathing animation graphic */}
            <div className="py-8 flex items-center justify-center gap-8">
              {/* Scaling breathe circle */}
              <div className={`h-20 w-20 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/5 border border-purple-500/30 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
                breatheState === 'Inhale' ? 'scale-125 shadow-lg shadow-purple-500/15 bg-purple-500/20' :
                breatheState === 'Hold' ? 'scale-125 border-cyan-400/30 shadow-lg shadow-cyan-400/10' : 'scale-95 bg-zinc-950/60 border-white/10'
              }`}>
                <div className="text-center">
                  <span className="text-[10px] font-mono text-white uppercase tracking-wider block">{breatheState}</span>
                  <span className="text-xs font-mono text-purple-300 font-semibold">{breatheCounter}s</span>
                </div>
              </div>

              <div className="text-left max-w-[140px]">
                <p className="text-[10px] text-zinc-400 leading-relaxed">
                  Synchronize your breaths to balance heart-rate variability and instantly mute high brain wave stress peaks.
                </p>
              </div>
            </div>
          </div>

          {/* Real-time Web Audio Binaural Synth Controller */}
          <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">BINAURAL BRAINWAVE SYNTH</span>
                <h3 className="text-sm font-normal text-white mt-0.5">Local Ambient Engine</h3>
              </div>
              <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400"><Brain className="w-4 h-4" /></span>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Generates continuous low-frequency waves directly in your browser using the Web Audio API to induce alpha state.
            </p>

            {/* Wave Selector buttons */}
            <div className="space-y-1.5">
              {[
                { name: 'Binaural Deep Drone', desc: '110Hz focus alpha wave carrier' },
                { name: 'Muted Pink Noise', desc: 'Sub-harmonic relaxing noise floor' },
                { name: 'Quiet Sinusoidal Flow', desc: 'Minimalist clean tone wave' }
              ].map((wave) => (
                <button
                  key={wave.name}
                  onClick={() => changeSoundtrack(wave.name)}
                  className={`w-full p-2.5 rounded-lg text-left border text-xs transition-all flex items-center justify-between ${
                    selectedSound === wave.name 
                      ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
                      : 'bg-zinc-950/50 border-white/5 hover:border-white/10 text-zinc-400 hover:text-zinc-300'
                  }`}
                >
                  <div>
                    <p className="font-medium">{wave.name}</p>
                    <p className="text-[9px] opacity-60">{wave.desc}</p>
                  </div>
                  <Music className={`w-3 h-3 ${selectedSound === wave.name ? 'text-purple-400 animate-pulse' : 'text-zinc-600'}`} />
                </button>
              ))}
            </div>

            {/* Volume and Start Button */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>STREAM VOLUME</span>
                <span>{soundVolume}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={soundVolume}
                onChange={(e) => setSoundVolume(parseInt(e.target.value))}
                className="w-full accent-purple-400 bg-zinc-800 h-1 rounded-lg focus:outline-none" 
              />

              <button 
                onClick={toggleAudioStream}
                className={`w-full py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  synthActive 
                    ? 'bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20' 
                    : 'bg-white text-black hover:bg-zinc-200 font-semibold'
                }`}
              >
                {synthActive ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" /> Silence Binaural Engine
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" /> Initialize Binaural Wave
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Durational Presets & History Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Focus Presets Card */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">INTERVAL SELECTION</span>
            <h3 className="text-base font-normal text-white mt-0.5">Focus Presets</h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => applyPreset(25, 'work')}
              className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 hover:border-purple-500/30 text-xs text-zinc-300 hover:text-white transition-all text-center"
            >
              <p className="font-mono text-base font-light">25m</p>
              <p className="text-[9px] text-zinc-500 uppercase mt-0.5">Standard Pomodoro</p>
            </button>
            <button 
              onClick={() => applyPreset(50, 'work')}
              className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 hover:border-purple-500/30 text-xs text-zinc-300 hover:text-white transition-all text-center"
            >
              <p className="font-mono text-base font-light">50m</p>
              <p className="text-[9px] text-zinc-500 uppercase mt-0.5">Deep Flow Block</p>
            </button>
            <button 
              onClick={() => applyPreset(5, 'break')}
              className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 hover:border-purple-500/30 text-xs text-zinc-300 hover:text-white transition-all text-center"
            >
              <p className="font-mono text-base font-light">5m</p>
              <p className="text-[9px] text-zinc-500 uppercase mt-0.5">Short Break</p>
            </button>
            <button 
              onClick={() => applyPreset(15, 'break')}
              className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 hover:border-purple-500/30 text-xs text-zinc-300 hover:text-white transition-all text-center"
            >
              <p className="font-mono text-base font-light">15m</p>
              <p className="text-[9px] text-zinc-500 uppercase mt-0.5">Long Break</p>
            </button>
          </div>

          <div className="pt-2 space-y-1">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Custom Flow Duration (mins)</label>
            <input 
              type="number" 
              min="1" 
              max="180"
              value={customMinutes}
              onChange={handleManualChange}
              className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-xs focus:border-purple-500/40 focus:outline-none text-white font-mono"
            />
          </div>
        </div>

        {/* Session Analytics Overview */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 lg:col-span-2 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">SESSION JOURNAL</span>
                <h3 className="text-base font-normal text-white mt-0.5">Focus Logs & Endurance</h3>
              </div>
              <span className="text-xs font-mono text-purple-400 font-medium">{completedSessionsCount} Completed Today</span>
            </div>

            {/* Mini logs list */}
            <div className="mt-4 space-y-2.5 max-h-40 overflow-y-auto pr-1">
              {sessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/40 border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${s.completed ? 'bg-green-400' : 'bg-red-400'}`}></span>
                    <span className="text-xs text-zinc-300 font-light">{s.type} ({s.duration} mins)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">{s.soundTrack}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${s.completed ? 'bg-green-500/10 text-green-300 border border-green-500/20' : 'bg-red-500/10 text-red-300 border border-red-500/20'}`}>
                      {s.completed ? 'COMPLETED' : 'ABORTED'}
                    </span>
                  </div>
                </div>
              ))}

              {sessions.length === 0 && (
                <div className="text-center py-6 text-zinc-600 text-xs font-light">
                  No sessions logged for this workspace yet.
                </div>
              )}
            </div>
          </div>

          {/* Focus totals block */}
          <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs">
            <div className="text-zinc-400">
              Cumulative Focus: <strong className="text-white font-mono">{totalFocusMinutes} minutes</strong>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">Sanctum Node Secured</span>
          </div>
        </div>

      </div>

    </div>
  );
}

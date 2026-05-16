import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Clock, Activity, Heart, TrendingUp, Compass, Moon, Settings, 
  LogOut, Menu, X, EyeOff, Sparkles
} from 'lucide-react';

import { 
  ViewType, TabType, Profile, Task, Habit, MoodLog, FocusSession, SleepLog, 
  AIReflection, AppSettings 
} from './types';

import { 
  DEFAULT_PROFILE, DEFAULT_SETTINGS, INITIAL_TASKS, INITIAL_HABITS, 
  INITIAL_MOODS, INITIAL_FOCUS_SESSIONS, INITIAL_SLEEP, INITIAL_REFLECTIONS 
} from './data/mockData';

// Tab Components
import LandingPage from './components/LandingPage';
import AuthScreen from './components/AuthScreen';
import DashboardTab from './components/DashboardTab';
import FocusTab from './components/FocusTab';
import HabitsTab from './components/HabitsTab';
import MoodTab from './components/MoodTab';
import AnalyticsTab from './components/AnalyticsTab';
import JournalTab from './components/JournalTab';
import SleepTab from './components/SleepTab';
import SettingsTab from './components/SettingsTab';

export default function App() {
  // Route / View state
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  // Authentication Sub-state
  const [authInitialView, setAuthInitialView] = useState<'login' | 'signup' | 'forgot-password'>('login');

  // Sidebar Expansion state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core User Workspace States
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [moods, setMoods] = useState<MoodLog[]>(INITIAL_MOODS);
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>(INITIAL_FOCUS_SESSIONS);
  const [sleep, setSleep] = useState<SleepLog[]>(INITIAL_SLEEP);
  const [reflections, setReflections] = useState<AIReflection[]>(INITIAL_REFLECTIONS);
  const [waterIntake, setWaterIntake] = useState(1750); // in ml
  const [screenTime, setScreenTime] = useState(4.2); // in hours

  // Smooth scroll back to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [activeTab]);

  // Dynamic document title updater based on focus active
  useEffect(() => {
    if (currentView === 'app') {
      if (activeTab === 'focus') {
        document.title = "🧘 Flow Active | GhostMode";
      } else {
        document.title = `${profile.name}'s Sanctum | GhostMode`;
      }
    } else {
      document.title = "GhostMode | Disappear from Distraction";
    }
  }, [currentView, activeTab, profile.name]);

  // -------------------------------------------------------
  // STATE ACTION HANDLERS
  // -------------------------------------------------------

  const handleAuthSuccess = (name: string, email: string) => {
    setProfile(prev => ({
      ...prev,
      name: name || prev.name,
      email: email || prev.email
    }));
    setCurrentView('app');
    setActiveTab('dashboard');
  };

  // Task Handlers
  const handleAddTask = (text: string, category: Task['category']) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      text,
      completed: false,
      category
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Habit Handlers
  const handleToggleHabit = (id: string, dateStr: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h;
      const isCompleted = h.completedDays.includes(dateStr);
      let newCompleted = [...h.completedDays];
      let newStreak = h.streak;

      if (isCompleted) {
        newCompleted = newCompleted.filter(d => d !== dateStr);
        // Decrement streak if removing today or yesterday
        newStreak = Math.max(0, newStreak - 1);
      } else {
        newCompleted.push(dateStr);
        newStreak += 1;
      }

      return {
        ...h,
        completedDays: newCompleted,
        streak: newStreak
      };
    }));
  };

  const handleCreateHabit = (name: string, category: Habit['category']) => {
    const newHabit: Habit = {
      id: `habit-${Date.now()}`,
      name,
      category,
      streak: 0,
      completedDays: [],
      frequency: 'daily',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setHabits(prev => [newHabit, ...prev]);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  // Mood Handler
  const handleLogMood = (mood: MoodLog['mood'], note: string, intensity: number) => {
    const now = new Date();
    const newLog: MoodLog = {
      id: `mood-${Date.now()}`,
      date: now.toISOString().split('T')[0],
      time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
      mood,
      note,
      intensity
    };
    setMoods(prev => [newLog, ...prev]);
  };

  // Focus Handler
  const handleLogFocusSession = (duration: number, soundTrack: string) => {
    const newSession: FocusSession = {
      id: `focus-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      duration,
      type: 'Pomodoro',
      soundTrack,
      completed: true
    };
    setFocusSessions(prev => [newSession, ...prev]);
    // Add to screen time and reduce slightly to show positive correlation
    setScreenTime(prev => Math.max(0.5, parseFloat((prev - 0.2).toFixed(1))));
  };

  // Sleep Handlers
  const handleLogSleep = (hours: number, quality: number, notes: string) => {
    const newSleep: SleepLog = {
      id: `sleep-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      hours,
      quality,
      notes
    };
    setSleep(prev => [newSleep, ...prev]);
  };

  const handleDeleteSleep = (id: string) => {
    setSleep(prev => prev.filter(s => s.id !== id));
  };

  // AI Reflection Generator
  const handleGenerateReflection = (userJournal: string, summary: string, insights: string[], recommendation: string) => {
    const newReflection: AIReflection = {
      id: `ref-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      userJournal,
      summary,
      insights,
      recommendation,
      moodTrend: moods[0]?.mood || 'Calm'
    };
    setReflections(prev => [newReflection, ...prev]);
  };

  // Water Handlers
  const handleIncrementWater = (amount: number) => {
    setWaterIntake(prev => prev + amount);
  };

  const handleResetWater = () => {
    setWaterIntake(0);
  };

  // Settings purge & reset
  const handleResetData = () => {
    setProfile(DEFAULT_PROFILE);
    setSettings(DEFAULT_SETTINGS);
    setTasks([]);
    setHabits([]);
    setMoods([]);
    setSleep([]);
    setFocusSessions([]);
    setReflections([]);
    setWaterIntake(0);
    setScreenTime(0.0);
    setActiveTab('dashboard');
  };

  // Cryptographic data export (JSON Download)
  const handleExportData = () => {
    const exportObj = {
      meta: {
        appName: "GhostMode Sanctum Vault",
        version: "2.1",
        exportedAt: new Date().toISOString()
      },
      profile,
      settings,
      tasks,
      habits,
      moods,
      sleep,
      focusSessions,
      reflections,
      waterIntake,
      screenTime
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `ghostmode-sanctum-vault-${profile.name.replace(/\s+/g, '-').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Dynamic Background Theme mapping
  const getThemeBgClass = () => {
    switch(settings.themeMode) {
      case 'midnight': return 'bg-[#02020f] text-[#f4f4f5]';
      case 'deep-space': return 'bg-black text-[#f4f4f5]';
      case 'charcoal':
      default: return 'bg-[#09090b] text-[#f4f4f5]';
    }
  };

  // Accent color highlights
  const accentGlowColor = {
    purple: 'shadow-purple-500/10 border-purple-500/30',
    blue: 'shadow-blue-500/10 border-blue-500/30',
    cyan: 'shadow-cyan-500/10 border-cyan-500/30',
    lavender: 'shadow-purple-400/10 border-purple-400/30',
    gray: 'shadow-zinc-500/10 border-zinc-500/30'
  }[settings.accentColor];

  const accentText = {
    purple: 'text-purple-400',
    blue: 'text-blue-400',
    cyan: 'text-cyan-400',
    lavender: 'text-purple-300',
    gray: 'text-zinc-300'
  }[settings.accentColor];

  // -------------------------------------------------------
  // VIEW RENDERING
  // -------------------------------------------------------

  // View 1: Landing Page
  if (currentView === 'landing') {
    return (
      <LandingPage 
        onGetStarted={() => {
          setAuthInitialView('signup');
          setCurrentView('signup');
        }} 
        onLogin={() => {
          setAuthInitialView('login');
          setCurrentView('login');
        }}
      />
    );
  }

  // View 2: Authentication Screens
  if (currentView === 'login' || currentView === 'signup' || currentView === 'forgot-password') {
    return (
      <AuthScreen 
        initialView={authInitialView}
        onAuthSuccess={handleAuthSuccess}
        onNavigateToView={setCurrentView}
      />
    );
  }

  // View 3: Main Productive Workspace
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'focus', label: 'Focus Mode', icon: Clock },
    { id: 'habits', label: 'Habit Matrix', icon: Activity },
    { id: 'mood', label: 'Mood State', icon: Heart },
    { id: 'analytics', label: 'Quiet Analytics', icon: TrendingUp },
    { id: 'journal', label: 'AI Journal', icon: Compass },
    { id: 'sleep', label: 'Sleep Rest', icon: Moon },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className={`min-h-screen ${getThemeBgClass()} selection:bg-purple-500/30 selection:text-purple-200 relative transition-colors duration-500`}>
      {/* Glowing Ambient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full ambient-orb-1 opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-20%] w-[55vw] h-[55vw] rounded-full ambient-orb-2 opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      {/* Master Dashboard Grid Container */}
      <div className="flex min-h-screen relative z-10">
        
        {/* Expandable Sidebar (Desktop) */}
        <aside className={`hidden md:flex flex-col justify-between border-r border-white/5 bg-[#0b0b0d]/50 backdrop-blur-xl transition-all duration-500 relative ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
          <div className="space-y-6 py-6">
            {/* Sidebar Header */}
            <div className="px-6 flex items-center justify-between">
              {!sidebarCollapsed && (
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
                  <img src="/ghostmode-logo.png" alt="GhostMode" className="h-6 w-6 rounded" />
                  <span className="text-sm font-medium tracking-widest text-white font-sans">
                    GHOST<span className="font-light text-zinc-500">MODE</span>
                  </span>
                </div>
              )}

              {sidebarCollapsed && (
                <img src="/ghostmode-logo.png" alt="GhostMode" className="h-6 w-6 rounded mx-auto cursor-pointer" onClick={() => setSidebarCollapsed(false)} />
              )}

              <button 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="text-zinc-500 hover:text-white p-1.5 rounded bg-zinc-950/40 border border-white/5 hidden lg:block"
              >
                {sidebarCollapsed ? '→' : '←'}
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="px-3 space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs transition-all duration-300 cursor-pointer group relative ${
                      isActive 
                        ? `bg-[#141419] text-white border border-white/10 shadow-lg ${accentGlowColor}` 
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950/30'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-colors group-hover:scale-105 ${isActive ? accentText : 'text-zinc-500'}`} />
                    {!sidebarCollapsed && (
                      <span className="font-light tracking-wide">{item.label}</span>
                    )}

                    {/* Micro Dot */}
                    {isActive && !sidebarCollapsed && (
                      <span className="absolute right-4 h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Profile Bottom Card */}
          <div className="p-4 border-t border-white/5 space-y-3">
            {!sidebarCollapsed ? (
              <div className="p-3 rounded-xl bg-zinc-950/40 border border-white/5 flex items-center gap-3 justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src={profile.avatar} 
                    alt="Avatar" 
                    className="h-7 w-7 rounded-full border border-white/10 object-cover"
                  />
                  <div className="text-left">
                    <p className="text-[11px] font-medium text-white leading-none">{profile.name.split(' ')[0]}</p>
                    <p className="text-[9px] text-zinc-500 font-mono mt-0.5">Zen Active</p>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (confirm("Disconnect secure workspace?")) {
                      setCurrentView('landing');
                    }
                  }}
                  className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                  title="Exit Sanctum"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('landing')}
                className="h-10 w-10 mx-auto rounded-xl bg-zinc-950/40 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                title="Exit Sanctum"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </aside>

        {/* Main Content Space */}
        <div className="flex-1 flex flex-col min-h-screen">
          
          {/* Floating Top Navbar */}
          <header className="sticky top-0 z-30 glass-navbar py-4 px-6 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Trigger */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-zinc-400 hover:text-white p-1 bg-zinc-950/40 border border-white/5 rounded"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">VAULT DECRYPTED</span>
              </div>
            </div>

            {/* Right Header Pill widgets */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/5 text-[10px] font-mono text-zinc-400">
                <EyeOff className="w-3.5 h-3.5 text-purple-400" />
                <span>GhostMode Online</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/5 text-[10px] font-mono text-zinc-400">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>{waterIntake} / 3000 ml water</span>
              </div>
            </div>
          </header>

          {/* Mobile Navigation Overlay Menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 top-16 bg-[#09090b]/95 backdrop-blur-xl z-40 p-6 flex flex-col gap-3 md:hidden border-t border-white/5">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">WORKSPACE NAVIGATION</span>
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as TabType);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm transition-all ${
                      isActive 
                        ? 'bg-zinc-900 text-white border border-white/15' 
                        : 'text-zinc-400 bg-zinc-950/30 hover:text-zinc-200'
                    }`}
                  >
                    <Icon className={`w-4.5 h-4.5 ${isActive ? accentText : 'text-zinc-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setCurrentView('landing');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm text-red-400 bg-red-500/5 border border-red-500/10 mt-8"
              >
                <LogOut className="w-4.5 h-4.5" />
                <span>Exit Workspace Sanctum</span>
              </button>
            </div>
          )}

          {/* Render Target Tab Workspace Area */}
          <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full">
            {activeTab === 'dashboard' && (
              <DashboardTab 
                tasks={tasks}
                habits={habits}
                moods={moods}
                sleep={sleep}
                reflections={reflections}
                waterIntake={waterIntake}
                screenTime={screenTime}
                settings={settings}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onIncrementWater={handleIncrementWater}
                onResetWater={handleResetWater}
                onNavigateToTab={setActiveTab}
              />
            )}

            {activeTab === 'focus' && (
              <FocusTab 
                sessions={focusSessions}
                settings={settings}
                onLogSession={handleLogFocusSession}
              />
            )}

            {activeTab === 'habits' && (
              <HabitsTab 
                habits={habits}
                settings={settings}
                onToggleHabit={handleToggleHabit}
                onCreateHabit={handleCreateHabit}
                onDeleteHabit={handleDeleteHabit}
              />
            )}

            {activeTab === 'mood' && (
              <MoodTab 
                moods={moods}
                settings={settings}
                onLogMood={handleLogMood}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsTab 
                habits={habits}
                moods={moods}
                sessions={focusSessions}
                sleep={sleep}
                waterIntake={waterIntake}
                screenTime={screenTime}
                settings={settings}
              />
            )}

            {activeTab === 'journal' && (
              <JournalTab 
                reflections={reflections}
                moods={moods}
                tasks={tasks}
                settings={settings}
                onGenerateReflection={handleGenerateReflection}
              />
            )}

            {activeTab === 'sleep' && (
              <SleepTab 
                sleep={sleep}
                settings={settings}
                onLogSleep={handleLogSleep}
                onDeleteSleep={handleDeleteSleep}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsTab 
                profile={profile}
                settings={settings}
                onUpdateProfile={(updates) => setProfile(prev => ({ ...prev, ...updates }))}
                onUpdateSettings={(updates) => setSettings(prev => ({ ...prev, ...updates }))}
                onResetData={handleResetData}
                onExportData={handleExportData}
              />
            )}
          </main>

          {/* Native Feel Bottom Navigation Bar (Mobile Only) */}
          <nav className="md:hidden sticky bottom-0 left-0 right-0 z-30 bg-[#09090b]/85 backdrop-blur-xl border-t border-white/5 grid grid-cols-5 py-2 px-1.5">
            {[
              { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
              { id: 'focus', label: 'Focus', icon: Clock },
              { id: 'habits', label: 'Habits', icon: Activity },
              { id: 'mood', label: 'Mood', icon: Heart },
              { id: 'settings', label: 'Setup', icon: Settings }
            ].map((navItem) => {
              const Icon = navItem.icon;
              const isActive = activeTab === navItem.id;

              return (
                <button
                  key={navItem.id}
                  onClick={() => setActiveTab(navItem.id as TabType)}
                  className="flex flex-col items-center justify-center py-1 text-center gap-1 cursor-pointer"
                >
                  <Icon className={`w-4.5 h-4.5 ${isActive ? accentText : 'text-zinc-500'}`} />
                  <span className={`text-[9px] font-light tracking-wide ${isActive ? 'text-white font-medium' : 'text-zinc-500'}`}>
                    {navItem.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

      </div>
    </div>
  );
}

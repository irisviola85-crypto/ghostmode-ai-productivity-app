import { Profile, Task, Habit, MoodLog, FocusSession, SleepLog, AIReflection, AppSettings } from '../types';

// Current date strings for dynamic mock data matching today
const getPastDateString = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const DEFAULT_PROFILE: Profile = {
  name: "Julian Vance",
  email: "julian@ghostmode.fm",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  bio: "Digital artist & deep-focus writer. Creating in silence.",
  joinedDate: "January 2026"
};

export const DEFAULT_SETTINGS: AppSettings = {
  accentColor: 'purple',
  themeMode: 'charcoal',
  soundVolume: 45,
  ambientSoundEnabled: true,
  zenMode: false,
  notificationsEnabled: true
};

export const INITIAL_TASKS: Task[] = [
  { id: 't1', text: 'Draft cinematic landing page copywriting', completed: true, category: 'creative' },
  { id: 't2', text: '2-hour uninterrupted code block for GhostMode', completed: true, category: 'focus' },
  { id: 't3', text: 'Perform sunset mindful breathing exercise', completed: false, category: 'health' },
  { id: 't4', text: 'Review portfolio assets & layout adjustments', completed: false, category: 'creative' },
  { id: 't5', text: 'Export JSON backup and configure sound settings', completed: false, category: 'personal' }
];

// Multi-day completion records for habit tracker heatmap
export const INITIAL_HABITS: Habit[] = [
  {
    id: 'h1',
    name: 'Deep Work Focus',
    category: 'mind',
    streak: 12,
    frequency: 'daily',
    createdAt: getPastDateString(30),
    completedDays: [
      getPastDateString(0),
      getPastDateString(1),
      getPastDateString(2),
      getPastDateString(3),
      getPastDateString(4),
      getPastDateString(5),
      getPastDateString(7),
      getPastDateString(8),
      getPastDateString(9),
      getPastDateString(10),
      getPastDateString(11),
      getPastDateString(12),
      getPastDateString(14),
      getPastDateString(15),
      getPastDateString(16),
      getPastDateString(18),
      getPastDateString(19),
      getPastDateString(20),
    ]
  },
  {
    id: 'h2',
    name: 'Morning Meditation',
    category: 'mind',
    streak: 5,
    frequency: 'daily',
    createdAt: getPastDateString(30),
    completedDays: [
      getPastDateString(0),
      getPastDateString(1),
      getPastDateString(2),
      getPastDateString(3),
      getPastDateString(4),
      getPastDateString(6),
      getPastDateString(7),
      getPastDateString(9),
      getPastDateString(10),
      getPastDateString(12),
      getPastDateString(13),
      getPastDateString(14),
      getPastDateString(17),
      getPastDateString(18),
    ]
  },
  {
    id: 'h3',
    name: 'Stay Hydrated (3L)',
    category: 'body',
    streak: 4,
    frequency: 'daily',
    createdAt: getPastDateString(30),
    completedDays: [
      getPastDateString(0),
      getPastDateString(1),
      getPastDateString(2),
      getPastDateString(3),
      getPastDateString(5),
      getPastDateString(6),
      getPastDateString(8),
      getPastDateString(9),
      getPastDateString(11),
      getPastDateString(12),
      getPastDateString(15),
      getPastDateString(16),
    ]
  },
  {
    id: 'h4',
    name: 'Read 15 Pages',
    category: 'creative',
    streak: 8,
    frequency: 'daily',
    createdAt: getPastDateString(30),
    completedDays: [
      getPastDateString(0),
      getPastDateString(1),
      getPastDateString(2),
      getPastDateString(3),
      getPastDateString(4),
      getPastDateString(5),
      getPastDateString(6),
      getPastDateString(7),
      getPastDateString(9),
      getPastDateString(10),
      getPastDateString(13),
      getPastDateString(14),
    ]
  },
  {
    id: 'h5',
    name: 'Gym Session / Flow State Movement',
    category: 'body',
    streak: 2,
    frequency: 'weekly',
    createdAt: getPastDateString(30),
    completedDays: [
      getPastDateString(0),
      getPastDateString(2),
      getPastDateString(4),
      getPastDateString(7),
      getPastDateString(10),
      getPastDateString(14),
      getPastDateString(17),
    ]
  }
];

export const INITIAL_MOODS: MoodLog[] = [
  { id: 'm1', date: getPastDateString(0), time: '10:30', mood: 'Focused', note: 'Mind felt clear after early coffee and silent environment.', intensity: 5 },
  { id: 'm2', date: getPastDateString(1), time: '09:15', mood: 'Calm', note: 'Gentle morning air. Wrote journal in complete silence.', intensity: 4 },
  { id: 'm3', date: getPastDateString(2), time: '14:00', mood: 'Motivated', note: 'Killed a major programming milestone. Fast and fluid.', intensity: 5 },
  { id: 'm4', date: getPastDateString(3), time: '16:45', mood: 'Tired', note: 'Slight screen fatigue. Need to disconnect early tonight.', intensity: 3 },
  { id: 'm5', date: getPastDateString(4), time: '11:00', mood: 'Calm', note: 'Rain outside. Feeling deep focus while ambient sound plays.', intensity: 5 },
  { id: 'm6', date: getPastDateString(5), time: '15:30', mood: 'Burned Out', note: 'Had too many notifications today. Switching on GhostMode permanently.', intensity: 2 },
  { id: 'm7', date: getPastDateString(6), time: '08:30', mood: 'Happy', note: 'Great night of sleep, clear vision for the upcoming week.', intensity: 4 }
];

export const INITIAL_FOCUS_SESSIONS: FocusSession[] = [
  { id: 'f1', date: getPastDateString(0), duration: 25, type: 'Pomodoro', soundTrack: 'Rainforest Static', completed: true },
  { id: 'f2', date: getPastDateString(0), duration: 25, type: 'Pomodoro', soundTrack: 'Rainforest Static', completed: true },
  { id: 'f3', date: getPastDateString(1), duration: 50, type: 'Pomodoro', soundTrack: 'Lo-Fi Chill FM', completed: true },
  { id: 'f4', date: getPastDateString(2), duration: 25, type: 'Pomodoro', soundTrack: 'Muted Pink Noise', completed: true },
  { id: 'f5', date: getPastDateString(3), duration: 25, type: 'Pomodoro', soundTrack: 'Deep Forest Silence', completed: true },
  { id: 'f6', date: getPastDateString(4), duration: 50, type: 'Pomodoro', soundTrack: 'Lo-Fi Chill FM', completed: true },
  { id: 'f7', date: getPastDateString(5), duration: 25, type: 'Pomodoro', soundTrack: 'Muted Pink Noise', completed: false }
];

export const INITIAL_SLEEP: SleepLog[] = [
  { id: 's1', date: getPastDateString(0), hours: 7.8, quality: 88, notes: 'Woke up feeling light. Did not check phone for first 30 minutes.' },
  { id: 's2', date: getPastDateString(1), hours: 8.2, quality: 94, notes: 'Excellent deep sleep. Felt refreshed.' },
  { id: 's3', date: getPastDateString(2), hours: 6.5, quality: 70, notes: 'Slightly restless, drank tea too close to sleep.' },
  { id: 's4', date: getPastDateString(3), hours: 7.2, quality: 80, notes: 'Solid recovery. Cool bedroom temperature helped.' },
  { id: 's5', date: getPastDateString(4), hours: 8.0, quality: 91, notes: 'Perfect deep sleep sequence.' },
  { id: 's6', date: getPastDateString(5), hours: 5.9, quality: 55, notes: 'Worked too late on design mockups. Hard to unwind.' },
  { id: 's7', date: getPastDateString(6), hours: 7.5, quality: 85, notes: 'Very consistent, calm dream state.' }
];

export const INITIAL_REFLECTIONS: AIReflection[] = [
  {
    id: 'ref1',
    date: getPastDateString(1),
    userJournal: "I felt really good today. Got 2 hours of coding done in complete silence and avoided looking at social media until 5 PM. Feeling a bit of low neck strain but overall very quiet inside my mind.",
    summary: "A highly productive day characterized by strong mental discipline and excellent focus blocks.",
    insights: [
      "Your longest focus interval of 50 minutes occurred when playing 'Lo-Fi Chill FM'.",
      "Your mood rose by 2 levels after a 30-minute morning digital detox.",
      "Habit completion was 100% on this low screen-time day."
    ],
    recommendation: "To alleviate neck strain, introduce a 3-minute physical reset stretch during every break. Consider setting a recurring reminder.",
    moodTrend: "Steadily rising and peaceful."
  }
];

export const CALMING_QUOTES = [
  { text: "Disappear into the work until the work appears on its own.", author: "Rick Rubin" },
  { text: "The quiet mind is the sovereign mind. Avoid the noise, seek the signal.", author: "Marcus Aurelius" },
  { text: "If you seek peace, do less. Better yet, do what is essential.", author: "Marcus Aurelius" },
  { text: "Muddy water is best cleared by leaving it alone.", author: "Alan Watts" },
  { text: "All of humanity's problems stem from man's inability to sit quietly in a room alone.", author: "Blaise Pascal" },
  { text: "Be silent, and let your creative spirit make the noise.", author: "Zen Proverb" },
  { text: "In the middle of noise, absolute focus is the ultimate superpower.", author: "Naval Ravikant" },
  { text: "The quieter you become, the more you are able to hear.", author: "Ram Dass" }
];

export type ViewType = 'landing' | 'login' | 'signup' | 'forgot-password' | 'app';

export type TabType = 'dashboard' | 'focus' | 'habits' | 'mood' | 'analytics' | 'journal' | 'sleep' | 'settings';

export interface Profile {
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinedDate: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: 'focus' | 'health' | 'creative' | 'personal';
}

export interface Habit {
  id: string;
  name: string;
  category: 'mind' | 'body' | 'creative' | 'routine';
  streak: number;
  completedDays: string[]; // Dates formatted as YYYY-MM-DD
  frequency: 'daily' | 'weekly';
  createdAt: string;
}

export interface MoodLog {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  mood: 'Calm' | 'Happy' | 'Focused' | 'Tired' | 'Burned Out' | 'Motivated';
  note: string;
  intensity: number; // 1 to 5
}

export interface FocusSession {
  id: string;
  date: string; // YYYY-MM-DD
  duration: number; // in minutes
  type: 'Pomodoro' | 'Short Break' | 'Long Break';
  soundTrack: string;
  completed: boolean;
}

export interface SleepLog {
  id: string;
  date: string; // YYYY-MM-DD
  hours: number;
  quality: number; // 1-100%
  notes: string;
}

export interface AIReflection {
  id: string;
  date: string;
  userJournal: string;
  summary: string;
  insights: string[];
  recommendation: string;
  moodTrend: string;
}

export interface AppSettings {
  accentColor: 'purple' | 'blue' | 'cyan' | 'lavender' | 'gray';
  themeMode: 'midnight' | 'charcoal' | 'deep-space';
  soundVolume: number;
  ambientSoundEnabled: boolean;
  zenMode: boolean;
  notificationsEnabled: boolean;
}

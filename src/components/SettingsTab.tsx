import React, { useState } from 'react';
import { Shield, User, Palette, Bell, Download, RotateCcw, Volume2 } from 'lucide-react';
import { Profile, AppSettings } from '../types';

interface SettingsTabProps {
  profile: Profile;
  settings: AppSettings;
  onUpdateProfile: (updates: Partial<Profile>) => void;
  onUpdateSettings: (updates: Partial<AppSettings>) => void;
  onResetData: () => void;
  onExportData: () => void;
}

export default function SettingsTab({
  profile,
  settings,
  onUpdateProfile,
  onUpdateSettings,
  onResetData,
  onExportData
}: SettingsTabProps) {
  const [profileName, setProfileName] = useState(profile.name);
  const [profileBio, setProfileBio] = useState(profile.bio);
  const [profileEmail, setProfileEmail] = useState(profile.email);
  const [profileAvatar, setProfileAvatar] = useState(profile.avatar);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: profileName.trim(),
      bio: profileBio.trim(),
      email: profileEmail.trim(),
      avatar: profileAvatar.trim()
    });
    alert("Cryptographic identity update completed.");
  };

  // Accent color mapping
  const accentColors: { id: AppSettings['accentColor']; name: string; hex: string }[] = [
    { id: 'purple', name: 'Muted Purple', hex: 'bg-purple-400' },
    { id: 'blue', name: 'Soft Blue', hex: 'bg-blue-400' },
    { id: 'cyan', name: 'Pastel Cyan', hex: 'bg-cyan-400' },
    { id: 'lavender', name: 'Desaturated Lavender', hex: 'bg-purple-300' },
    { id: 'gray', name: 'Fog Gray', hex: 'bg-zinc-400' }
  ];

  // Theme mode mapping
  const themeModes: { id: AppSettings['themeMode']; name: string; desc: string }[] = [
    { id: 'charcoal', name: 'Deep Charcoal', desc: 'Subtle warm dark hue (baseline)' },
    { id: 'midnight', name: 'Midnight Indigo', desc: 'Atmospheric deep blue tint' },
    { id: 'deep-space', name: 'Deep Space Black', desc: 'Absolute black organic battery saver' }
  ];

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
        <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase">WORKSPACE CONFIGURATION</p>
        <h1 className="text-3xl font-extralight tracking-tight text-white mt-1">Settings Panel</h1>
        <p className="text-xs text-zinc-400 mt-1 font-light">Personalize your quiet space. Adjust visual glows, sounds, and export encrypted parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Col 1: Profile & Identity settings */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6 h-fit lg:col-span-2">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">SANCTUM SECURE PROFILE</span>
              <h3 className="text-lg font-normal text-white mt-0.5">Identity Credentials</h3>
            </div>
            <User className="w-4 h-4 text-purple-400" />
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Profile Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Identity Name</label>
                <input 
                  type="text" 
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-xs focus:outline-none text-white font-light placeholder-zinc-600 focus:border-purple-500/30"
                  required
                />
              </div>

              {/* Profile Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Identity Email</label>
                <input 
                  type="email" 
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-xs focus:outline-none text-white font-light placeholder-zinc-600 focus:border-purple-500/30"
                  required
                />
              </div>
            </div>

            {/* Avatar url */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Avatar Image URL</label>
              <input 
                type="text" 
                value={profileAvatar}
                onChange={(e) => setProfileAvatar(e.target.value)}
                className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-xs focus:outline-none text-white font-light placeholder-zinc-600 focus:border-purple-500/30"
              />
            </div>

            {/* Biography text */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Biography & Focus Vision</label>
              <textarea 
                value={profileBio}
                onChange={(e) => setProfileBio(e.target.value)}
                rows={3}
                className="w-full bg-zinc-950 border border-white/5 rounded-lg p-3 text-xs focus:outline-none text-white font-light placeholder-zinc-600 resize-none focus:border-purple-500/30 leading-relaxed"
              ></textarea>
            </div>

            <button 
              type="submit"
              className={`px-5 py-2.5 rounded-xl text-xs font-medium text-black transition-all flex items-center gap-2 cursor-pointer shadow-md ${accentSolidBg}`}
            >
              Commit Profile Credentials
            </button>
          </form>
        </div>

        {/* Col 2: Accent theme selection and settings */}
        <div className="space-y-6">
          
          {/* Visual Customization */}
          <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">ATMOSPHERIC GLOWS</span>
                <h3 className="text-base font-normal text-white mt-0.5">Palette Selection</h3>
              </div>
              <Palette className="w-4 h-4 text-purple-400" />
            </div>

            {/* Accent Color Picker */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Accent Glow Profile</span>
              <div className="flex items-center gap-2">
                {accentColors.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => onUpdateSettings({ accentColor: col.id })}
                    className={`h-7 px-3.5 rounded-lg text-[10px] font-mono transition-all border flex items-center gap-1.5 cursor-pointer ${
                      settings.accentColor === col.id 
                        ? 'bg-white text-black border-white font-bold' 
                        : 'bg-zinc-950 border-white/5 hover:border-white/10 text-zinc-400'
                    }`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${col.hex}`}></span>
                    {col.name.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Base Mode */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Baseline Dark Theme</span>
              <div className="space-y-1.5">
                {themeModes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => onUpdateSettings({ themeMode: theme.id })}
                    className={`w-full p-2.5 rounded-lg text-left border text-xs transition-all flex items-center justify-between ${
                      settings.themeMode === theme.id 
                        ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
                        : 'bg-zinc-950/50 border-white/5 hover:border-white/10 text-zinc-400'
                    }`}
                  >
                    <div>
                      <p className="font-medium">{theme.name}</p>
                      <p className="text-[9px] opacity-60">{theme.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sound & Notification Controls */}
          <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">SYSTEM BASES</span>
                <h3 className="text-base font-normal text-white mt-0.5">Preferences</h3>
              </div>
              <Bell className="w-4 h-4 text-purple-400" />
            </div>

            {/* Audio Volume */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>DEFAULT SYNTH VOLUME</span>
                <span>{settings.soundVolume}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={settings.soundVolume}
                  onChange={(e) => onUpdateSettings({ soundVolume: parseInt(e.target.value) })}
                  className="w-full accent-purple-400 bg-zinc-800 h-1 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Interactive toggle checkboxes */}
            <div className="space-y-2.5 pt-2">
              <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={settings.zenMode} 
                  onChange={(e) => onUpdateSettings({ zenMode: e.target.checked })}
                  className="rounded border-white/10 bg-zinc-950 text-purple-500 focus:ring-0"
                />
                <div>
                  <p className="text-zinc-300">Zen Space Auto-dim</p>
                  <p className="text-[9px] text-zinc-500">Minimize all background elements during active timer</p>
                </div>
              </label>

              <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={settings.notificationsEnabled} 
                  onChange={(e) => onUpdateSettings({ notificationsEnabled: e.target.checked })}
                  className="rounded border-white/10 bg-zinc-950 text-purple-500 focus:ring-0"
                />
                <div>
                  <p className="text-zinc-300">Supportive Sound Signals</p>
                  <p className="text-[9px] text-zinc-500">Emit quiet synthesizer chime on timer completion</p>
                </div>
              </label>
            </div>
          </div>

        </div>
      </div>

      {/* Cryptographic Data Actions */}
      <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-bl from-purple-500/5 to-transparent blur-2xl pointer-events-none"></div>

        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">DATA CONTROL AND DECRYPTION BACKUPS</span>
            <h3 className="text-base font-normal text-white mt-0.5">Encrypted Storage & Autonomy</h3>
            <p className="text-xs text-zinc-400 mt-2 max-w-xl leading-relaxed">
              We support total cognitive autonomy. You can download a complete cryptographically compiled JSON file containing all your habits, checklist wins, sleep indicators, and logged focus sessions with zero server locks.
            </p>
          </div>
          <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20"><Shield className="w-4.5 h-4.5" /></span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onExportData}
            className="px-5 py-3 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/5 hover:border-white/10 transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5 text-purple-300" /> Export Sanctum Backup Vault (JSON)
          </button>

          <button
            onClick={() => {
              if (confirm("Warning: This will clear all logged habits, sleep hours, and focus logs inside this sandbox. Are you sure?")) {
                onResetData();
              }
            }}
            className="px-5 py-3 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Purge Sanctuary Workspace
          </button>
        </div>
      </div>

    </div>
  );
}

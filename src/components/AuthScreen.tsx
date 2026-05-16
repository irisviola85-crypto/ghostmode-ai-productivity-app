import { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, ArrowRight, Shield, Eye, EyeOff } from 'lucide-react';
import { ViewType } from '../types';

interface AuthScreenProps {
  initialView: 'login' | 'signup' | 'forgot-password';
  onAuthSuccess: (userName: string, userEmail: string) => void;
  onNavigateToView: (view: ViewType) => void;
}

export default function AuthScreen({ initialView, onAuthSuccess, onNavigateToView }: AuthScreenProps) {
  const [view, setView] = useState<'login' | 'signup' | 'forgot-password'>(initialView);
  const [email, setEmail] = useState('julian@ghostmode.fm');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Julian Vance');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    setSubmitStep('Contacting Google authentication node...');
    
    setTimeout(() => {
      setSubmitStep('Establishing secure micro-tunnel...');
    }, 600);

    setTimeout(() => {
      setSubmitStep('Decrypting calm profiles...');
    }, 1200);

    setTimeout(() => {
      setIsSubmitting(false);
      onAuthSuccess(name || 'Calm Explorer', email || 'explorer@ghostmode.fm');
    }, 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setFeedbackMessage('Please provide an email address.');
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage('');

    if (view === 'forgot-password') {
      setSubmitStep('Verifying email records...');
      setTimeout(() => {
        setSubmitStep('Sending cryptographic reset link...');
      }, 800);
      setTimeout(() => {
        setIsSubmitting(false);
        setFeedbackMessage('A recovery signal has been sent. Please inspect your inbox (and spam folder) for instructions.');
      }, 1600);
      return;
    }

    // Login or Signup
    setSubmitStep(view === 'login' ? 'Authenticating focus parameters...' : 'Registering new deep focus workspace...');
    
    setTimeout(() => {
      setSubmitStep('Syncing local databases...');
    }, 700);

    setTimeout(() => {
      setIsSubmitting(false);
      onAuthSuccess(name || 'Julian Vance', email);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full ambient-orb-1 opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] rounded-full ambient-orb-2 opacity-40 pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      {/* Back to Landing Page */}
      <button 
        onClick={() => onNavigateToView('landing')}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-300 px-3 py-1.5 rounded-lg border border-white/5 bg-zinc-950/40"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Quiet
      </button>

      {/* Main Glassmorphism Box */}
      <div className="w-full max-w-md relative z-10">
        {/* Soft outer glowing ring */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur opacity-80"></div>

        <div className="relative glass-card rounded-2xl p-8 border border-white/10 shadow-2xl space-y-6">
          
          {/* Logo Banner */}
          <div className="text-center space-y-2">
            <img src="/ghostmode-logo.png" alt="GhostMode Logo" className="h-10 w-10 rounded-xl mx-auto mb-3" />
            <h2 className="text-2xl font-extralight tracking-widest text-white">
              GHOST<span className="font-normal text-purple-300">MODE</span>
            </h2>
            <p className="text-xs text-zinc-400 font-light">
              {view === 'login' && "Re-enter your sanctuary of focus."}
              {view === 'signup' && "Initiate your digital detox."}
              {view === 'forgot-password' && "Recover access to your calm workspace."}
            </p>
          </div>

          {/* Feedback banner */}
          {feedbackMessage && (
            <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/20 text-xs text-purple-300 text-center">
              {feedbackMessage}
            </div>
          )}

          {/* Simulated submission screen overlay */}
          {isSubmitting ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative h-12 w-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/10"></div>
                <div className="absolute inset-0 rounded-full border-2 border-purple-400 border-t-transparent animate-spin"></div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-mono text-purple-300">{submitStep}</p>
                <p className="text-[10px] text-zinc-500 font-light">Securing interface...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {view === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Your Name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"><User className="w-4 h-4" /></span>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Julian Vance"
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg bg-zinc-950/60 border border-white/5 focus:border-purple-500/50 focus:outline-none transition-colors font-light text-white placeholder-zinc-600"
                        required
                      />
                    </div>
                  </div>
                )}

                {view !== 'forgot-password' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Email Address</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"><Mail className="w-4 h-4" /></span>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="julian@ghostmode.fm"
                          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg bg-zinc-950/60 border border-white/5 focus:border-purple-500/50 focus:outline-none transition-colors font-light text-white placeholder-zinc-600"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Security Password</label>
                        <button 
                          type="button"
                          onClick={() => setView('forgot-password')}
                          className="text-[10px] text-zinc-500 hover:text-purple-300 transition-colors"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"><Lock className="w-4 h-4" /></span>
                        <input 
                          type={showPassword ? "text" : "password"} 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg bg-zinc-950/60 border border-white/5 focus:border-purple-500/50 focus:outline-none transition-colors font-light text-white placeholder-zinc-600"
                          required
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {view === 'forgot-password' && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Recovery Email Address</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"><Mail className="w-4 h-4" /></span>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="julian@ghostmode.fm"
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg bg-zinc-950/60 border border-white/5 focus:border-purple-500/50 focus:outline-none transition-colors font-light text-white placeholder-zinc-600"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Action button */}
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-medium text-black bg-white hover:bg-zinc-100 transition-colors duration-300 flex items-center justify-center gap-2 mt-6 shadow-lg shadow-white/5"
                >
                  {view === 'login' && "Access Sanctum"}
                  {view === 'signup' && "Establish Workspace"}
                  {view === 'forgot-password' && "Dispatch Reset Signals"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Divider line */}
              {view !== 'forgot-password' && (
                <>
                  <div className="relative flex items-center justify-center py-2">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                    <span className="relative z-10 bg-[#111115] px-3 text-[9px] text-zinc-600 font-mono">OR DECRYPT ACCESS</span>
                  </div>

                  {/* Third Party OAuth Simulation */}
                  <div className="space-y-2">
                    <button 
                      onClick={handleGoogleLogin}
                      className="w-full py-2.5 rounded-xl text-xs font-medium text-white glass-card hover:bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {/* Simulated minimal Google logo */}
                      <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M12.24 10.285V13.4h6.887c-.275 1.56-1.77 4.594-6.887 4.594-4.43 0-8.04-3.67-8.04-8.19s3.61-8.19 8.04-8.19c2.52 0 4.21 1.05 5.17 1.97l2.46-2.37C17.93 1.44 15.31 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.89 11.57-11.79 0-.795-.08-1.4-.19-1.925H12.24z" />
                      </svg>
                      Continue via Secure Google node
                    </button>
                  </div>
                </>
              )}

              {/* Toggle Link */}
              <div className="text-center pt-2">
                {view === 'login' ? (
                  <p className="text-xs text-zinc-500">
                    First time disappearing?{' '}
                    <button onClick={() => setView('signup')} className="text-purple-300 hover:underline">
                      Establish identity
                    </button>
                  </p>
                ) : view === 'signup' ? (
                  <p className="text-xs text-zinc-500">
                    Already verified?{' '}
                    <button onClick={() => setView('login')} className="text-purple-300 hover:underline">
                      Decrypt access
                    </button>
                  </p>
                ) : (
                  <button 
                    onClick={() => setView('login')} 
                    className="text-xs text-zinc-500 hover:text-white flex items-center gap-1.5 mx-auto mt-2"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back to decryption lobby
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Micro Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5 text-purple-500/40" /> End-to-End Cryptographic Sandbox
        </div>
      </div>
    </div>
  );
}

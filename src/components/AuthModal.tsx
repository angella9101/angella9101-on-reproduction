import React, { useState } from 'react';
import { X, Lock, Mail, User, AlertCircle, CheckCircle, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { signInWithEmail, signUpWithEmail, signInWithGithub, AppUser } from '../services/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AppUser) => void;
  reason?: string; // e.g. "주문하시려면 먼저 로그인 또는 회원가입이 필요합니다."
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  reason = '주문하시려면 먼저 로그인 또는 회원가입을 진행해주세요.',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('안젤라');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleModeSwitch = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Basic validation with clear Korean messages
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage('이메일 주소를 입력해주세요.');
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setErrorMessage('올바른 이메일 형식이 아닙니다. (예: angela@example.com)');
      return;
    }

    if (!password) {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('비밀번호가 너무 짧습니다. 비밀번호는 6자 이상으로 입력해주세요.');
      return;
    }

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setErrorMessage('비밀번호와 비밀번호 확인이 서로 일치하지 않습니다. 다시 입력해주세요.');
        return;
      }
    }

    setIsLoading(true);

    try {
      let user: AppUser;
      if (mode === 'signup') {
        user = await signUpWithEmail(trimmedEmail, password, name.trim() || '안젤라');
      } else {
        user = await signInWithEmail(trimmedEmail, password);
      }

      onSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || '로그인 처리 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const user = await signInWithGithub();
      onSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'GitHub 로그인 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F0] w-full max-w-md rounded-3xl border-2 border-[#D9CDB7] shadow-2xl overflow-hidden my-6 relative">
        {/* Header */}
        <div className="bg-[#2D5A27] text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#C5E4BE] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>온하루 회원 서비스</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              {mode === 'login' ? '로그인' : '간편 회원가입'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Reason banner if triggered by Order button */}
        {reason && (
          <div className="bg-[#EBF3E8] border-b border-[#D5E6D1] px-5 py-3 text-sm text-[#274E21] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2D5A27] shrink-0" />
            <span>{reason}</span>
          </div>
        )}

        {/* Mode Tabs */}
        <div className="grid grid-cols-2 p-2 bg-[#F2EBE0] border-b border-[#DDD2BD]">
          <button
            type="button"
            onClick={() => handleModeSwitch('login')}
            className={`py-3 rounded-xl font-black text-base transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#203D1A] shadow-sm'
                : 'text-[#64705F] hover:text-[#203D1A]'
            }`}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('signup')}
            className={`py-3 rounded-xl font-black text-base transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white text-[#203D1A] shadow-sm'
                : 'text-[#64705F] hover:text-[#203D1A]'
            }`}
          >
            회원가입
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
          {/* Error message alert box */}
          {errorMessage && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3.5 text-red-700 text-sm font-bold flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="leading-snug">{errorMessage}</div>
            </div>
          )}

          {/* Name Field (Sign Up Only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-extrabold text-[#293B26] mb-1.5">
                성함 / 닉네임 <span className="text-xs font-normal text-[#6C7868]">(로그인 시 화면에 표시됩니다)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="예: 안젤라"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-[#D5C7B0] text-base text-[#1E3318] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
                <User className="w-4 h-4 text-[#8C9885] absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-extrabold text-[#293B26] mb-1.5">
              이메일 주소
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="예: angela@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-[#D5C7B0] text-base text-[#1E3318] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
              />
              <Mail className="w-4 h-4 text-[#8C9885] absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-extrabold text-[#293B26]">
                비밀번호 <span className="text-xs font-normal text-[#758270]">(6자 이상)</span>
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="6자리 이상 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-[#D5C7B0] text-base text-[#1E3318] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
              />
              <Lock className="w-4 h-4 text-[#8C9885] absolute left-3.5 top-3.5" />
            </div>
            {password.length > 0 && password.length < 6 && (
              <p className="text-xs text-red-600 font-bold mt-1">
                ⚠️ 현재 {password.length}자입니다. 6자 이상이어야 합니다.
              </p>
            )}
          </div>

          {/* Confirm Password Field (Sign Up Only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-extrabold text-[#293B26] mb-1.5">
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-[#D5C7B0] text-base text-[#1E3318] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
                <Lock className="w-4 h-4 text-[#8C9885] absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          {/* Submit Button (Big and readable) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4.5 bg-[#2D5A27] hover:bg-[#20401B] active:scale-[0.98] text-white rounded-2xl font-black text-xl shadow-lg shadow-[#2D5A27]/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>처리 중입니다...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? '로그인하고 계속하기' : '회원가입 완료하기'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Social Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DCD0BC]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#FAF7F0] px-3 text-[#798674] font-bold">또는 간편 연결</span>
            </div>
          </div>

          {/* GitHub Login Button */}
          <button
            type="button"
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#24292F] hover:bg-[#1B1F23] active:scale-[0.98] text-white rounded-2xl font-black text-base shadow-md flex items-center justify-center gap-2.5 cursor-pointer transition-all disabled:opacity-60"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub 계정으로 계속하기</span>
          </button>

          {/* Bottom Switch Link */}
          <div className="text-center pt-2">
            {mode === 'login' ? (
              <p className="text-sm text-[#5B6756]">
                아직 계정이 없으신가요?{' '}
                <button
                  type="button"
                  onClick={() => handleModeSwitch('signup')}
                  className="text-[#2D5A27] font-black underline cursor-pointer"
                >
                  3초 간편 회원가입
                </button>
              </p>
            ) : (
              <p className="text-sm text-[#5B6756]">
                이미 계정이 있으신가요?{' '}
                <button
                  type="button"
                  onClick={() => handleModeSwitch('login')}
                  className="text-[#2D5A27] font-black underline cursor-pointer"
                >
                  로그인하기
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

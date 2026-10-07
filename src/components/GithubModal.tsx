import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  GitBranch,
  Terminal,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

interface GithubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubModal: React.FC<GithubModalProps> = ({ isOpen, onClose }) => {
  const [repoUrl, setRepoUrl] = useState(() => {
    return (
      localStorage.getItem('onharu_github_repo') ||
      'https://github.com/angella9101/on-reproduction.git'
    );
  });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('onharu_github_repo');
      if (saved) setRepoUrl(saved);
      else setRepoUrl('https://github.com/angella9101/on-reproduction.git');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanRepoUrl =
    repoUrl.trim() || 'https://github.com/angella9101/on-reproduction.git';

  const commands = [
    {
      title: '1. 변경된 Vercel 배포 설정 파일 스테이징',
      cmd: `git add .`,
    },
    {
      title: '2. Vercel 배포용 커밋 생성',
      cmd: `git commit -m "fix: add vercel.json, package-lock.json, and vite dist config"`,
    },
    {
      title: '3. GitHub 원격 저장소 연결 (최초 1회)',
      cmd: `git remote add origin ${cleanRepoUrl}`,
    },
    {
      title: '4. GitHub에 최신 코드 푸시 (Vercel 자동 재배포 시작)',
      cmd: `git push -u origin main`,
    },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleSaveRepoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('onharu_github_repo', repoUrl.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F0] w-full max-w-2xl rounded-3xl border-2 border-[#D9CDB7] shadow-2xl overflow-hidden my-6 relative">
        {/* Header */}
        <div className="bg-[#24292F] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#24292F] flex items-center justify-center font-bold">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div>
              <span className="text-xs text-white/70 block font-semibold">GitHub & Vercel 배포</span>
              <h3 className="text-2xl sm:text-3xl font-black">Vercel 배포 404 오류 해결 가이드</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Vercel 404 Resolution Notice */}
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-black text-base sm:text-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Vercel 404 원인 분석 및 코드 수정 완료</span>
            </div>
            <ul className="text-xs sm:text-sm text-emerald-800 space-y-1 pl-6 list-disc">
              <li><strong>vercel.json 추가:</strong> Vercel이 빌드 결과물(<code>dist/index.html</code>)을 찾아 서비스하도록 라우팅 rewrite 설정 완료</li>
              <li><strong>esbuild 버전 충돌 해결:</strong> Vercel 빌드 시 발생하던 npm 패키지 의존성 충돌 해결 및 <code>.npmrc</code> 적용</li>
              <li><strong>package-lock.json 생성:</strong> Vercel 배포 시 안정적인 패키지 설치 보장</li>
            </ul>
          </div>

          {/* GitHub Repo Input */}
          <form onSubmit={handleSaveRepoUrl} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-extrabold text-[#243720]">
                내 GitHub 저장소 주소
              </label>
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#2D5A27] font-bold hover:underline flex items-center gap-1"
              >
                <span>GitHub 새 저장소 열기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://github.com/angella9101/on-reproduction.git"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="flex-1 bg-white px-4 py-3 rounded-xl border border-[#D5C7B0] font-mono text-sm text-[#1E3318] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#2D5A27] hover:bg-[#20401B] text-white font-black text-sm rounded-xl cursor-pointer transition-colors shrink-0"
              >
                {isSaved ? '저장됨 ✓' : '저장'}
              </button>
            </div>
          </form>

          {/* Terminal Commands Guide */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#243720] flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#2D5A27]" />
                GitHub 푸시 명령어 (Vercel 자동 배포 트리거)
              </span>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    commands.map((c) => c.cmd).join('\n'),
                    99
                  )
                }
                className="text-xs text-[#2D5A27] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedIndex === 99 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">전체 복사됨!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>전체 명령어 복사</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-2.5">
              {commands.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#1E232A] text-white rounded-xl p-3.5 border border-[#30363D] flex items-center justify-between gap-3 font-mono text-xs sm:text-sm"
                >
                  <div className="truncate">
                    <span className="text-emerald-400 select-none">$ </span>
                    <span className="text-slate-100">{item.cmd}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.cmd, idx)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="명령어 복사"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Vercel Dashboard Settings Guide */}
          <div className="bg-[#FAF7F0] border-2 border-[#DDD1BE] rounded-2xl p-4 text-xs sm:text-sm text-[#4E5C4B] space-y-1.5">
            <span className="font-bold text-[#233B1E] block">⚙️ Vercel 대시보드 프로젝트 설정 (Settings):</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-[#E3DAC8]">
                <span className="text-[#8B9886] block">Framework Preset</span>
                <strong className="text-[#1E3719]">Vite</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#E3DAC8]">
                <span className="text-[#8B9886] block">Build Command</span>
                <strong className="text-[#1E3719]">npm run build (또는 vite build)</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#E3DAC8]">
                <span className="text-[#8B9886] block">Output Directory</span>
                <strong className="text-[#1E3719]">dist</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#E3DAC8]">
                <span className="text-[#8B9886] block">Root Directory</span>
                <strong className="text-[#1E3719]">./ (기본값)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F2ECE0] border-t border-[#DDD1BE] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#24292F] text-white font-bold rounded-xl hover:bg-[#1B1F23] cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

/**
 * Profile Card Component
 * Renders the generated profile data or live preview, supporting Light and Dark themes.
 */
export default function ProfileCard({ data, isPreview = false }) {
  const { name, bio, imageUrl, skills, github, linkedin, theme } = data;

  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  // Authentic placeholder states for empty fields
  const displayName = name || 'Your Name';
  const displayBio = bio || 'Your professional bio will appear here.';
  
  // Normalize skills into an array of strings with deduplication
  let skillArray = [];
  if (Array.isArray(skills)) {
    skillArray = Array.from(new Set(skills.map(s => s.trim()).filter(Boolean)));
  } else if (typeof skills === 'string' && skills.trim().length > 0) {
    skillArray = Array.from(new Set(
      skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
    ));
  }

  const isDark = theme === 'dark';
  const hasSkills = skillArray.length > 0;

  // Validate social URLs so they are only displayed if they pass the regex check
  const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;
  const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;

  const validGithub = github && github.trim() !== '' && githubRegex.test(github.trim()) ? github.trim() : '';
  const validLinkedin = linkedin && linkedin.trim() !== '' && linkedinRegex.test(linkedin.trim()) ? linkedin.trim() : '';

  const showSocial = validGithub || validLinkedin;
  const showImage = imageUrl && !imageError;

  return (
    <div className="relative group w-full max-w-[360px] mx-auto transition-all duration-300 hover:-translate-y-1 hover:scale-[1.005] animate-fadeIn">
      {/* Dynamic Ambient Background Glow - Reduced intensity */}
      <div className={`absolute -inset-0.5 rounded-[2.5rem] opacity-10 blur-xl transition duration-700 group-hover:opacity-15 ${
        isDark 
          ? 'bg-gradient-to-r from-violet-650 via-fuchsia-600 to-indigo-650' 
          : 'bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400'
      }`}></div>

      {/* Main Glassmorphic Card Container */}
      <div className={`relative flex flex-col items-center p-6 rounded-[1.75rem] shadow-lg transition-all duration-300 border backdrop-blur-xl ${
        isDark 
          ? 'bg-slate-950/85 text-slate-100 border-slate-800/80 shadow-black/25' 
          : 'bg-white/80 text-slate-800 border-white/60 shadow-slate-200/25'
      }`}>
        
        {/* Status Indicator */}
        <div className="absolute top-4.5 right-4.5">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wider uppercase border ${
            isPreview
              ? 'bg-amber-500/5 border-amber-500/15 text-amber-600 dark:text-amber-400'
              : 'bg-emerald-500/5 border-emerald-500/15 text-emerald-600 dark:text-emerald-400'
          }`}>
            {isPreview ? 'Preview' : 'GENERATED'}
          </span>
        </div>

        {/* Double-Ring Gradient Avatar Frame */}
        <div className="relative mb-4.5 mt-1 group/avatar">
          {/* Pulsing Outer Gradient Ring - Reduced intensity */}
          <div className={`absolute -inset-1.5 rounded-full opacity-25 blur-xs transition-transform duration-500 group-hover/avatar:scale-102 ${
            isDark 
              ? 'bg-gradient-to-tr from-violet-600 to-indigo-600' 
              : 'bg-gradient-to-tr from-indigo-500 to-violet-500'
          }`}></div>
          
          {/* Inner Border Ring */}
          <div className="absolute -inset-0.5 rounded-full bg-white dark:bg-slate-950 z-0"></div>

          {/* Avatar Area */}
          {showImage ? (
            <img
              src={imageUrl}
              alt={displayName}
              onError={() => setImageError(true)}
              className="relative w-26 h-26 rounded-full object-cover z-10 border-2 border-transparent"
            />
          ) : null}

          {/* Neutral Avatar Placeholder Icon - No text inside or below */}
          {!showImage && (
            <div 
              className={`relative w-26 h-26 rounded-full flex flex-col items-center justify-center z-10 border border-dashed ${
                isDark 
                  ? 'border-slate-800 bg-slate-900/60 text-slate-500' 
                  : 'border-slate-300 bg-slate-100/60 text-slate-400'
              }`}
            >
              {/* User SVG silhouette (large user icon) */}
              <svg className="w-11 h-11 opacity-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>

        {/* Name */}
        <h2 className={`text-lg font-bold tracking-tight text-center ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {displayName}
        </h2>

        {/* Bio Description */}
        <p className={`mt-2 text-xs leading-relaxed text-center font-medium min-h-[54px] max-w-[280px] ${
          isDark ? 'text-slate-400' : 'text-slate-550'
        }`}>
          {displayBio}
        </p>

        {/* Skills Section */}
        <div className="w-full mt-4">
          <h3 className={`text-[9px] font-bold uppercase tracking-widest text-left mb-2 ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Skills
          </h3>

          {hasSkills ? (
            <div className="flex flex-wrap gap-1.5 justify-start max-h-[110px] overflow-hidden">
              {skillArray.map((skill, index) => (
                <span
                  key={index}
                  className={`text-[10px] px-2.5 py-1 rounded-lg font-bold tracking-wide border transition-all duration-200 cursor-default ${
                    isDark
                      ? 'bg-violet-950/30 border-violet-900/40 text-violet-300 hover:bg-violet-900/30 hover:border-violet-750'
                      : 'bg-violet-50/50 border-violet-100/60 text-violet-750 hover:bg-violet-100/50 hover:border-violet-200'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            /* Empty State Placeholder for Skills */
            <div className="text-left py-1">
              <span className={`text-[11px] font-semibold italic select-none ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}>
                No skills added yet
              </span>
            </div>
          )}
        </div>

        {/* Action Button Links - Conditionally rendered only if links are supplied */}
        {showSocial && (
          <div className="w-full mt-5 border-t pt-4 flex gap-3.5 justify-center border-slate-100/10 dark:border-slate-800/80">
            {validGithub ? (
              <a
                href={validGithub.startsWith('http') ? validGithub : `https://${validGithub}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-slate-900 hover:bg-slate-850 text-white shadow-md shadow-black/20 border border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950 hover:bg-slate-900 text-white shadow-md shadow-slate-950/10'
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                <span>GitHub</span>
              </a>
            ) : null}

            {validLinkedin ? (
              <a
                href={validLinkedin.startsWith('http') ? validLinkedin : `https://${validLinkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/20'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/10'
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import ProfileForm from './components/ProfileForm';
import ProfileCard from './components/ProfileCard';
import ThemeSelector from './components/ThemeSelector';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import { generateProfileCard } from './services/api';

const INITIAL_FORM_VALUES = {
  name: '',
  bio: '',
  imageUrl: '',
  skills: '',
  github: '',
  linkedin: '',
  theme: 'light'
};

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_VALUES);
  const [generatedProfile, setGeneratedProfile] = useState(null);
  
  // API interaction states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form changes dynamically (updates live preview card)
  const handleFormChange = (updatedForm) => {
    setFormData(updatedForm);
    
    // Clear success/error banners on input modification to let user continue previewing
    if (successMessage) setSuccessMessage('');
    if (apiError) setApiError(null);
    if (generatedProfile) setGeneratedProfile(null);
  };

  // Handle direct theme change from selector (affects both live preview and backend state)
  const handleThemeChange = (newTheme) => {
    const updated = { ...formData, theme: newTheme };
    setFormData(updated);
    
    // If there is a generated profile, update its theme dynamically as well
    if (generatedProfile) {
      setGeneratedProfile(prev => ({ ...prev, theme: newTheme }));
    }
  };

  // Submit form data to backend Node.js server
  const handleFormSubmit = async (submittedData) => {
    setIsSubmitting(true);
    setApiError(null);
    setSuccessMessage('');
    setGeneratedProfile(null);

    try {
      const result = await generateProfileCard(submittedData);
      
      if (result.success) {
        setGeneratedProfile(result.profile);
        setSuccessMessage('Your profile card has been generated successfully!');
      } else {
        throw new Error(result.message || 'Failed to generate profile.');
      }
    } catch (error) {
      setApiError({
        message: error.message || 'Could not connect to the server. Please verify the connection is active.',
        errors: error.errors || {}
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset the form and preview state
  const handleReset = () => {
    setFormData(INITIAL_FORM_VALUES);
    setGeneratedProfile(null);
    setApiError(null);
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Premium Navigation Header */}
      <nav className="bg-white/80 border-b border-slate-100 py-4 px-6 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            {/* Custom Logomark */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-650 flex items-center justify-center shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <span className="text-md font-bold bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent tracking-tight leading-none block">
                ProfileForge
              </span>
            </div>
          </div>
          
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-bold text-slate-650 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all duration-200 cursor-pointer"
          >
            Reset Form
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto text-center px-6 pt-3.5 pb-1 animate-fadeIn">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-violet-50 border border-violet-100/70 text-violet-750 text-[10px] font-bold mb-2">
          <span className="w-1.2 h-1.2 rounded-full bg-violet-500 animate-ping"></span>
          <span>Profile Builder</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">
          Create Professional{' '}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-650 bg-clip-text text-transparent">
            Profile Cards
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
          Instantly build and showcase a polished professional profile card. Enter your details, choose a theme, and generate a shareable digital card.
        </p>
      </header>

      {/* Main Grid Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 pt-1 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Form Card */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100/80 shadow-md shadow-slate-100/50 space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-md font-bold text-slate-900">Profile Details</h2>
              <p className="text-xs text-slate-500 mt-1">
                Provide your name, bio, image, skills, and social links.
              </p>
            </div>

            {/* Theme Selector Widget */}
            <ThemeSelector theme={formData.theme} onChangeTheme={handleThemeChange} />

            {/* Error Message if API fails */}
            {apiError && (
              <ErrorMessage message={apiError.message} errors={apiError.errors} />
            )}

            {/* Input Form */}
            <ProfileForm
              initialValues={formData}
              onFormChange={handleFormChange}
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Right Column - Card Preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center">
            
            {/* Visual Status Indicator */}
            <div className="text-center mb-5 w-full">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                {generatedProfile ? 'PROFILE CARD GENERATED' : 'Live Preview'}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                {generatedProfile 
                  ? 'Ready to share and showcase.' 
                  : 'Updates in real-time as you type.'
                }
              </p>
            </div>

            {/* Refined Success Alert Box */}
            {successMessage && (
              <div className="w-full max-w-sm mb-5 bg-emerald-50/80 border border-emerald-200/50 p-4.5 rounded-2xl shadow-sm flex items-start space-x-3 animate-fadeIn">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-800">Success</h4>
                  <p className="text-[11px] font-semibold text-emerald-700 mt-0.5 leading-relaxed">
                    {successMessage}
                  </p>
                </div>
              </div>
            )}

            {/* Card Preview Area */}
            <div className="w-full flex items-center justify-center min-h-[400px] p-6 bg-slate-100/30 rounded-3xl border border-slate-200/20 shadow-inner relative">
              {isSubmitting ? (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10 animate-fadeIn">
                  <LoadingSpinner />
                </div>
              ) : null}

              {generatedProfile ? (
                <ProfileCard data={generatedProfile} isPreview={false} />
              ) : (
                <ProfileCard data={formData} isPreview={true} />
              )}
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white/50 py-8 text-center text-xs font-semibold text-slate-450 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ProfileForge. Instantly build your professional card.</p>
          <div className="flex space-x-4 text-[11px] font-bold text-slate-400">
            <span>Create</span>
            <span>•</span>
            <span>Design</span>
            <span>•</span>
            <span>Share</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';

/**
 * Profile Form Component
 * Captures user profile fields and updates parent states for live preview and submission.
 */
export default function ProfileForm({ initialValues, onFormChange, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // Triggered on every keystroke
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    
    // Notify parent immediately for instant live preview updates
    onFormChange(updatedData);

    // Dynamic field validation if already touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Triggered on blur to validate immediately after user finishes editing
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // Individual field validator
  const validateField = (name, value) => {
    let errMessage = '';
    
    if (name === 'name' && (!value || value.trim() === '')) {
      errMessage = 'Full Name is required.';
    } else if (name === 'bio' && (!value || value.trim() === '')) {
      errMessage = 'Short Bio is required.';
    } else if (name === 'imageUrl' && (!value || value.trim() === '')) {
      errMessage = 'Profile Image URL is required.';
    } else if (name === 'imageUrl') {
      try {
        new URL(value);
      } catch (_) {
        errMessage = 'Please enter a valid URL (e.g. https://...).';
      }
    }

    setErrors(prev => ({
      ...prev,
      [name]: errMessage
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all required fields as touched
    const allTouched = {
      name: true,
      bio: true,
      imageUrl: true,
      skills: true,
      github: true,
      linkedin: true
    };
    setTouched(allTouched);

    // Validate all fields
    const newErrors = {};
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Full Name is required.';
    }
    if (!formData.bio || formData.bio.trim() === '') {
      newErrors.bio = 'Short Bio is required.';
    }
    if (!formData.imageUrl || formData.imageUrl.trim() === '') {
      newErrors.imageUrl = 'Profile Image URL is required.';
    } else {
      try {
        new URL(formData.imageUrl);
      } catch (_) {
        newErrors.imageUrl = 'Please enter a valid URL.';
      }
    }

    setErrors(newErrors);

    // If no errors, call onSubmit callback
    if (Object.keys(newErrors).filter(k => newErrors[k]).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      {/* SECTION 1: Personal Profile details */}
      <div className="space-y-5 p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2.5">
          <svg className="w-4.5 h-4.5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Personal Details</span>
        </div>

        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Alex Mercer"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 ${
              errors.name && touched.name
                ? 'border-rose-300 focus:ring-rose-500/10 focus:border-rose-500 bg-rose-50/10'
                : 'border-slate-200 focus:ring-violet-500/10 focus:border-violet-600 bg-white'
            }`}
          />
          {errors.name && touched.name && (
            <p className="mt-1.5 text-xs text-rose-500 font-semibold animate-fadeIn">{errors.name}</p>
          )}
        </div>

        {/* Bio Textarea */}
        <div>
          <label htmlFor="bio" className="block text-xs font-bold text-slate-700 mb-1.5">
            Short Bio <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="3"
            value={formData.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Senior Full-Stack Engineer specializing in React, TypeScript, and clean code architecture."
            className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 ${
              errors.bio && touched.bio
                ? 'border-rose-300 focus:ring-rose-500/10 focus:border-rose-500 bg-rose-50/10'
                : 'border-slate-200 focus:ring-violet-500/10 focus:border-violet-600 bg-white'
            }`}
          ></textarea>
          {errors.bio && touched.bio && (
            <p className="mt-1.5 text-xs text-rose-500 font-semibold animate-fadeIn">{errors.bio}</p>
          )}
        </div>

        {/* Image URL Input */}
        <div>
          <label htmlFor="imageUrl" className="block text-xs font-bold text-slate-700 mb-1.5">
            Profile Image URL <span className="text-rose-500">*</span>
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. https://images.unsplash.com/photo-..."
            className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 ${
              errors.imageUrl && touched.imageUrl
                ? 'border-rose-300 focus:ring-rose-500/10 focus:border-rose-500 bg-rose-50/10'
                : 'border-slate-200 focus:ring-violet-500/10 focus:border-violet-600 bg-white'
            }`}
          />
          {errors.imageUrl && touched.imageUrl && (
            <p className="mt-1.5 text-xs text-rose-500 font-semibold animate-fadeIn">{errors.imageUrl}</p>
          )}
        </div>
      </div>

      {/* SECTION 2: Skills & Tags */}
      <div className="space-y-5 p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2.5">
          <svg className="w-4.5 h-4.5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Skills & Specialties</span>
        </div>

        {/* Skills Input */}
        <div>
          <label htmlFor="skills" className="block text-xs font-bold text-slate-700 mb-1.5">
            Skills <span className="text-slate-400 font-normal">(comma separated)</span>
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, TypeScript, Go, Docker"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-600 bg-white"
          />
          <p className="mt-1.5 text-[10px] text-slate-400 font-semibold">Separate multiple skills with commas.</p>
        </div>
      </div>

      {/* SECTION 3: Social Portfolios */}
      <div className="space-y-5 p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2.5">
          <svg className="w-4.5 h-4.5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Social Links</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* GitHub Link */}
          <div>
            <label htmlFor="github" className="block text-xs font-bold text-slate-700 mb-1.5">
              GitHub Profile URL
            </label>
            <input
              type="text"
              id="github"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="github.com/username"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-600 bg-white"
            />
          </div>

          {/* LinkedIn Link */}
          <div>
            <label htmlFor="linkedin" className="block text-xs font-bold text-slate-700 mb-1.5">
              LinkedIn Profile URL
            </label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="linkedin.com/in/username"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-600 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Generate Profile Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-650 hover:from-violet-750 hover:to-indigo-700 text-white font-bold text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 disabled:opacity-50 transition-all duration-250 cursor-pointer shadow-md shadow-violet-600/10 hover:shadow-lg hover:shadow-violet-600/20 text-center hover:-translate-y-0.5 active:translate-y-0"
      >
        {isSubmitting ? 'Generating Card...' : 'Generate Profile Card'}
      </button>
    </form>
  );
}

/**
 * Profile Controller
 * Handles validation and processing of profile data
 */
export const createProfile = (req, res) => {
  const { name, bio, imageUrl, skills, github, linkedin, theme } = req.body;

  // 1. Validation
  const errors = {};

  if (!name || name.trim() === '') {
    errors.name = 'Full Name is required.';
  }

  if (!bio || bio.trim() === '') {
    errors.bio = 'Short Bio is required.';
  }

  if (imageUrl && imageUrl.trim() !== '') {
    // Simple URL validation
    try {
      new URL(imageUrl);
    } catch (_) {
      errors.imageUrl = 'Please enter a valid Image URL (e.g., https://example.com/avatar.jpg).';
    }
  }

  // Validate GitHub URL if provided
  if (github && github.trim() !== '') {
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;
    if (!githubRegex.test(github.trim())) {
      errors.github = 'Please enter a valid GitHub profile URL.';
    }
  }

  // Validate LinkedIn URL if provided
  if (linkedin && linkedin.trim() !== '') {
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    if (!linkedinRegex.test(linkedin.trim())) {
      errors.linkedin = 'Please enter a valid LinkedIn profile URL.';
    }
  }

  // If validation errors exist, return 400 Bad Request
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors
    });
  }

  // 2. Processing data
  // Split skills by comma, trim whitespace, deduplicate, and filter out empty items
  let processedSkills = [];
  if (skills && typeof skills === 'string') {
    processedSkills = Array.from(new Set(
      skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)
    ));
  } else if (Array.isArray(skills)) {
    processedSkills = Array.from(new Set(
      skills.map(skill => String(skill).trim()).filter(Boolean)
    ));
  }

  // Helper function to sanitize and ensure URLs have protocols
  const formatUrl = (url) => {
    if (!url || url.trim() === '') return '';
    let trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = `https://${trimmed}`;
    }
    try {
      new URL(trimmed);
      return trimmed;
    } catch (_) {
      return ''; // If still invalid, reset it
    }
  };

  const processedGithub = formatUrl(github);
  const processedLinkedin = formatUrl(linkedin);

  // Default theme is light
  const processedTheme = theme === 'dark' ? 'dark' : 'light';

  // 3. Respond with processed profile data
  return res.status(200).json({
    success: true,
    profile: {
      name: name.trim(),
      bio: bio.trim(),
      imageUrl: imageUrl ? imageUrl.trim() : '',
      skills: processedSkills,
      github: processedGithub,
      linkedin: processedLinkedin,
      theme: processedTheme
    }
  });
};

const API_BASE_URL = 'https://profileforge-tnhy.onrender.com/api';

/**
 * Sends profile form data to the backend for validation and formatting.
 * @param {Object} profileData - The form values (name, bio, imageUrl, skills, github, linkedin, theme)
 * @returns {Promise<Object>} The server's response.
 */
export async function generateProfileCard(profileData) {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      // If server returned a structured validation error
      const errorMsg = data.message || 'Failed to generate profile.';
      const err = new Error(errorMsg);
      err.errors = data.errors || {}; // Nested field-specific errors
      throw err;
    }

    return data;
  } catch (error) {
    console.error('API Error in generateProfileCard:', error);
    throw error;
  }
}

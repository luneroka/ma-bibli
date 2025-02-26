const fetch = require('node-fetch');

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch error on ${url}: ${response.statusText}`);
  }
  return response.json();
};

function mapBookCategory(category) {
  if (!category || typeof category !== 'string') return 'Non catégorisé';
  const categoryMapping = {
    'ANTIQUES & COLLECTIBLES': 'Art & Design',
    ARCHITECTURE: 'Art & Design',
    ART: 'Art & Design',
    PHOTOGRAPHY: 'Art & Design',
    DESIGN: 'Art & Design',

    'LITERARY COLLECTIONS': 'Littérature',
    'LITERARY CRITICISM': 'Littérature',
    POETRY: 'Littérature',
    FICTION: 'Littérature',
    DRAMA: 'Littérature',

    'BIOGRAPHY & AUTOBIOGRAPHY': 'Biographie & Mémoires',
    'TRUE CRIME': 'Biographie & Mémoires',

    'BUSINESS & ECONOMICS': 'Affaires & Finance',
    'POLITICAL SCIENCE': 'Affaires & Finance',
    LAW: 'Affaires & Finance',

    COMPUTERS: 'Science & Technologie',
    'TECHNOLOGY & ENGINEERING': 'Science & Technologie',
    SCIENCE: 'Science & Technologie',
    MATHEMATICS: 'Science & Technologie',

    'BODY, MIND & SPIRIT': 'Développement Personnel & Bien-être',
    'SELF-HELP': 'Développement Personnel & Bien-être',
    'HEALTH & FITNESS': 'Développement Personnel & Bien-être',
    PSYCHOLOGY: 'Développement Personnel & Bien-être',

    'FAMILY & RELATIONSHIPS': 'Mode de Vie',
    'HOUSE & HOME': 'Mode de Vie',
    GARDENING: 'Mode de Vie',
    COOKING: 'Mode de Vie',
    PETS: 'Mode de Vie',

    'GAMES & ACTIVITIES': 'Divertissement',
    HUMOR: 'Divertissement',
    'SPORTS & RECREATION': 'Divertissement',
    'PERFORMING ARTS': 'Divertissement',
    MUSIC: 'Divertissement',
    'COMICS & GRAPHIC NOVELS': 'Divertissement',

    EDUCATION: 'Éducation & Référence',
    'STUDY AIDS': 'Éducation & Référence',
    REFERENCE: 'Éducation & Référence',
    'LANGUAGE ARTS & DISCIPLINES': 'Éducation & Référence',
    'LANGUAGE STUDY': 'Éducation & Référence',

    PHILOSOPHY: 'Sciences Sociales & Culturelles',
    RELIGION: 'Sciences Sociales & Culturelles',
    'SOCIAL SCIENCE': 'Sciences Sociales & Culturelles',
    HISTORY: 'Sciences Sociales & Culturelles',
    TRAVEL: 'Sciences Sociales & Culturelles',

    'JUVENILE FICTION': 'Jeunesse & Young Adult',
    'JUVENILE NONFICTION': 'Jeunesse & Young Adult',
    'YOUNG ADULT FICTION': 'Jeunesse & Young Adult',
    'YOUNG ADULT NONFICTION': 'Jeunesse & Young Adult',

    MEDICAL: 'Sujets Spécialisés',
    NATURE: 'Sujets Spécialisés',
    TRANSPORTATION: 'Sujets Spécialisés',
    'CRAFTS & HOBBIES': 'Sujets Spécialisés',
    BIBLES: 'Sujets Spécialisés',
  };

  return categoryMapping[category.toUpperCase()] || 'Autres';
}

// Simple function to generate a random ID.
function generateRandomId(length = 8) {
  return Math.random().toString(36).substr(2, length);
}

module.exports = { fetchJson, mapBookCategory, generateRandomId };

const fetch = require('node-fetch');

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Fetch error on ${url}: ${response.statusText}`);
  }
  return response.json();
};

const categoryKeywords = {
  'Jeunesse & Young Adult': ['juvenile', 'young adult', 'children', "children's books", 'kids', 'teen', 'picture books', 'tween', 'middle grade', 'YA'],
  'Fantasy & SF': ['fantasy', 'science fiction', 'fiction fantasy', 'fantasy fiction', 'fiction / fantasy'],
  'Policier': ['detective', 'mystery', 'detective novel', 'detective stories', 'detective fiction', 'thrillers', 'suspense', 'crime & mystery'],
  'BD & Manga': ['comics', 'graphic novels', 'manga', 'bd', 'anime', 'superhero', 'comic book'],
  'Littérature': ['fiction', 'paranormal', 'poetry', 'drama', 'literary', 'criticism', 'novel', 'short stories', 'narrative', 'classics'],
  'Business': ['business', 'economics', 'finance', 'law', 'political', 'management', 'money', 'investing', 'entrepreneurship', 'startup', 'leadership', 'marketing', 'strategy'],
  'Développement Personnel': ['body', 'mind', 'spirit', 'self-help', 'health', 'fitness', 'psychology', 'wellness', 'motivation', 'productivity', 'happiness', 'meditation', 'mental health'],
  'Non-fiction': [
    // Biographie
    'biography', 'autobiography', 'true crime', 'memoir', 'life story', 'diary',
    // Science & Tech
    'science', 'technology', 'engineering', 'computers', 'mathematics', 'math', 'biology', 'physics', 'chemistry', 'data science', 'AI', 'robotics', 'astronomy',
    // Mode de Vie
    'family', 'relationships', 'house', 'home', 'gardening', 'cooking', 'pets', 'lifestyle', 'interior design', 'parenting', 'recipes', 'diy',
    // Divertissement
    'games', 'activities', 'humor', 'sports', 'recreation', 'performing arts', 'music', 'entertainment', 'cinema', 'movies', 'tv shows', 'board games',
  ],
  'Éducation & Culture': [
    // Éducation
    'education', 'study aids', 'reference', 'language arts', 'language study', 'school', 'curriculum', 'academic', 'encyclopedia', 'dictionaries',
    // Culture
    'philosophy', 'religion', 'social science', 'history', 'travel', 'culture', 'anthropology', 'sociology', 'mythology', 'geography',
  ],
  'Sujets Spécialisés': ['medical', 'nature', 'transportation', 'crafts', 'hobbies', 'bibles', 'special', 'aviation', 'automotive', 'sewing', 'knitting', 'military', 'manuals'],
};

function mapBookCategory(category) {
  if (Array.isArray(category)) {
    const normalizedSubjects = category.map(s => s.toLowerCase());
    // For each category (in order), check all subjects for a match
    for (const target of Object.keys(categoryKeywords)) {
      for (const keyword of categoryKeywords[target]) {
        for (const ns of normalizedSubjects) {
          if (ns.includes(keyword)) {
            return target;
          }
        }
      }
    }
    return 'Autres';
  }

  if (!category || typeof category !== 'string') return 'Autres';

  const normalized = category.toLowerCase();
  for (const target of Object.keys(categoryKeywords)) {
    for (const keyword of categoryKeywords[target]) {
      if (normalized.includes(keyword)) {
        return target;
      }
    }
  }
  return 'Autres';
}

// Simple function to generate a random ID.
function generateRandomId(length = 8) {
  return Math.random().toString(36).substr(2, length);
}

module.exports = { fetchJson, mapBookCategory, generateRandomId };

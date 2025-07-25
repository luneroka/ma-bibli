const fetch = require('node-fetch');

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Fetch error on ${url}: ${response.statusText}`);
  }
  return response.json();
};

function mapBookCategory(category) {
  if (!category || typeof category !== 'string') return 'Autres';
  const categoryKeywords = {
    'Art & Design': ['art', 'design', 'architecture', 'photography', 'antiques', 'collectibles', 'painting', 'sculpture', 'fashion', 'graphic design'],
    'Littérature': ['fiction', 'poetry', 'drama', 'literary', 'criticism', 'novel', 'short stories', 'narrative', 'classics'],
    'Biographie & Mémoires': ['biography', 'autobiography', 'true crime', 'memoir', 'life story', 'diary'],
    'Affaires & Finance': ['business', 'economics', 'finance', 'law', 'political', 'management', 'money', 'investing', 'entrepreneurship', 'startup', 'leadership', 'marketing', 'strategy'],
    'Science & Technologie': ['science', 'technology', 'engineering', 'computers', 'mathematics', 'math', 'biology', 'physics', 'chemistry', 'data science', 'AI', 'robotics', 'astronomy'],
    'Développement Personnel & Bien-être': ['body', 'mind', 'spirit', 'self-help', 'health', 'fitness', 'psychology', 'wellness', 'motivation', 'productivity', 'happiness', 'meditation', 'mental health'],
    'Mode de Vie': ['family', 'relationships', 'house', 'home', 'gardening', 'cooking', 'pets', 'lifestyle', 'interior design', 'parenting', 'recipes', 'diy'],
    'Divertissement': ['games', 'activities', 'humor', 'sports', 'recreation', 'performing arts', 'music', 'entertainment', 'cinema', 'movies', 'tv shows', 'board games'],
    'BD & Manga': ['comics', 'graphic novels', 'manga', 'bd', 'anime', 'superhero', 'comic book'],
    'Éducation & Référence': ['education', 'study aids', 'reference', 'language arts', 'language study', 'school', 'curriculum', 'academic', 'encyclopedia', 'dictionaries'],
    'Sciences Sociales & Culturelles': ['philosophy', 'religion', 'social science', 'history', 'travel', 'culture', 'anthropology', 'sociology', 'mythology', 'geography'],
    'Jeunesse & Young Adult': ['juvenile', 'young adult', 'children', "children's books", 'kids', 'teen', 'picture books', 'tween', 'middle grade', 'YA'],
    'Sujets Spécialisés': ['medical', 'nature', 'transportation', 'crafts', 'hobbies', 'bibles', 'special', 'aviation', 'automotive', 'sewing', 'knitting', 'military', 'manuals'],
  };

  const normalized = category.toLowerCase();
  for (const target in categoryKeywords) {
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

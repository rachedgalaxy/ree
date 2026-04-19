export const normalizeArabicText = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    // Remove diacritics (Tashkeel)
    .replace(/[\u064B-\u065F]/g, '')
    // Normalize Alef forms to bare Alef
    .replace(/[أإآ]/g, 'ا')
    // Normalize Yeh and Alef Maksura to Yeh
    .replace(/[ىي]/g, 'ي')
    // Normalize Teh Marbuta and Heh to Heh
    .replace(/[ةه]/g, 'ه');
};

const levenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

export const findClosestMatch = (query, storeData) => {
  const normalizedQuery = normalizeArabicText(query);
  if (!normalizedQuery || normalizedQuery.length < 3) return null;

  let bestMatch = null;
  // Dynamic threshold: allow more typos for longer words
  let minDistance = normalizedQuery.length > 5 ? 3 : 2; 

  const candidates = new Set();
  const isMultiWord = normalizedQuery.includes(' ');
  
  // Extract all potential valid search targets
  storeData.forEach(category => {
    category.products.forEach(product => {
      const nameAr = product.translations?.ar?.name || product.name;
      const nameEn = product.translations?.en?.name || product.name;
      
      if (nameAr) candidates.add(nameAr.trim());
      if (nameEn) candidates.add(nameEn.trim());
      
      // If it's a single word search, we also check against individual words of product names
      if (!isMultiWord) {
        if (nameAr) nameAr.split(' ').forEach(w => w.length > 2 && candidates.add(w.trim()));
        if (nameEn) nameEn.split(' ').forEach(w => w.length > 2 && candidates.add(w.trim()));
      }
    });
  });

  // Find the candidate with the lowest edit distance
  candidates.forEach(candidate => {
    const normCandidate = normalizeArabicText(candidate);
    if (normCandidate.length < 3) return;
    
    const dist = levenshteinDistance(normalizedQuery, normCandidate);
    
    // Check if it's closer than the previously found match
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = candidate; 
    }
  });

  return bestMatch;
};

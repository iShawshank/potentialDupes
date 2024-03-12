import fs from 'fs';
import Levenshtein from 'js-levenshtein';

// Threshold Modifier
const THRESHOLD_MOD = 0.2;

export const findPotentialDupes = async (advertisersFile) => {
  const potentialDupes = {};
  const memo = {};

  // Grab file contents
  const fileContents = fs.readFileSync(advertisersFile, 'utf8');
  const advertisers = fileContents.split('\r\n');

  for (let i = 0; i < advertisers.length; i++) {
    const current = advertisers[i];
    // remove non-alphanumeric characters and convert to lowercase for better comparison
    let normalizedCurrent = current
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase();

    for (let j = i + 1; j < advertisers.length; j++) {
      const next = advertisers[j];
      const normalizedNext = next
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase();

      // Calculate Levenshtein distance between both names
      // https://www.npmjs.com/package/js-levenshtein
      const levenshteinDistance =
        calculateLevenshteinDistanceWithMemo(
          normalizedCurrent,
          normalizedNext,
          memo
        );

      // Calculate the threshold for considering a name as a potential dupe
      const threshold =
        Math.max(normalizedCurrent.length, normalizedNext.length) *
        THRESHOLD_MOD;

      if (levenshteinDistance < threshold) {
        console.log(`Potential Dupe: current:${current} next${next}`);
        if (!potentialDupes[current]) {
          potentialDupes[current] = [];
        }
        potentialDupes[current].push(next);
      }
    }
  }

  console.log('potentialDupes', potentialDupes);

  return potentialDupes;
};

const calculateLevenshteinDistanceWithMemo = (
  current,
  next,
  memo
) => {
  // Check if the distance has already been calculated
  if (
    memo.hasOwnProperty(current) &&
    memo[current].hasOwnProperty(next)
  ) {
    return memo[current][next];
  }

  // Calculate Levenshtein distance
  let distance = Levenshtein(current, next);

  // Store the distance in the memoization object
  if (!memo.hasOwnProperty(current)) {
    memo[current] = {};
  }
  memo[current][next] = distance;

  return distance;
};

findPotentialDupes('./data/advertisers.txt');

import fs from 'fs';
import Levenshtein from 'js-levenshtein';
import _ from 'lodash';

// Threshold Modifier for determining accuracy
const THRESHOLD_MOD = 0.25;

export const findPotentialDupes = (advertisersFile) => {
  const potentialDupes = {};
  const groups = {};
  let fileContents = null;
  let advertisers = [];

  // Read file contents and convert string to array of names
  try {
    fileContents = fs.readFileSync(advertisersFile, 'utf8');
    advertisers = fileContents.split(/\r?\n/);
  } catch (error) {
    console.error(`Unable to read file from ${advertisersFile}`);
    return null;
  }

  // map each advertiser by initial alphanumeric character
  for (const name of advertisers) {
    // get first alphanumeric character for the key of the group
    const key = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()[0];
    if (_.isEmpty(key)) {
      continue;
    }
    if (!groups[key]) {
      groups[key] = [];
    }
    // Add name to it's associated group
    groups[key].push(name);
  }

  for (const group of Object.values(groups)) {
    for (let i = 0; i < group.length; i++) {
      const current = group[i];
      const currentInitialWord = current
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .toLowerCase()
        .split(' ')[0];

      for (let j = i + 1; j < group.length; j++) {
        const next = group[j];
        const normalizedNext = next
          .replace(/[^a-zA-Z0-9]/g, '')
          .toLowerCase();

        // Add any advertisers matching the current first word
        if (normalizedNext.includes(currentInitialWord)) {
          if (!potentialDupes[current]) {
            potentialDupes[current] = [];
          }
          potentialDupes[current].push(next);
        } else {
          // Otherwise, calculate the Levenshtein distance between both normalized names
          const normalizedCurrent = current
            .replace(/[^a-zA-Z0-9]/g, '')
            .toLowerCase();
          // Calculate Levenshtein distance between both names
          // Using https://www.npmjs.com/package/js-levenshtein
          const levenshteinDistance = Levenshtein(
            normalizedCurrent,
            normalizedNext
          );

          /**
           * Determine threshold based off maximum name length of both
           * names muliplied by threshold modifier.
           */
          const threshold =
            Math.max(
              normalizedCurrent.length,
              normalizedNext.length
            ) * THRESHOLD_MOD;

          if (levenshteinDistance < threshold) {
            if (!potentialDupes[current]) {
              potentialDupes[current] = [];
            }
            potentialDupes[current].push(next);
          }
        }
      }
    }
  }

  // console.log(potentialDupes)
  return potentialDupes;
};

// findPotentialDupes('./data/advertisers.txt');

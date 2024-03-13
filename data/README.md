# Potential Dupes

## Installation:

1. I advise having Node 18+ installed. [Installation Documentation](https://nodejs.org/en/download/package-manager)
2. Once you have node and nvm installed run the following:

```
nvm install
npm ci
```

## Running locally

1. To run this program locally, I recommend uncommenting the last line in ./index.js to run the function against the given text file.
2. Next, you can run the following to run the program.

```
npm start
```

## Testing instructions

To run the test suite, run

```
npm test
```

## The Problem

Our advertiser database had duplicate entries with slightly different names for the same advertiser.
One such example is: "1-800-Flowers.com" and "1800Flowers.com"

## The Challenge

Write a program that accepts as input a text file of advertiser names and outputs potential duplicate advertisers. A perfect result is impossible so don't attempt to do so. (Are "Penske" and "Penske System, Inc." the same? I don't know.) We're very much looking for a "good enough" solution. False positives (and false negatives) are inevitable. Use Google and StackOverflow (but make sure to call out any code that isn't yours). Your code should be documented, readable, and maintainable - such that you'd be comfortable committing it to a shared public repository. We ask that you don’t spend more than 60-90 minutes on this as we understand your personal time is valuable. Accordingly, please also provide us a few thoughts on what you would do next if given more time.

## Things I would change / add if given more time

1. I would greatly improve the unit testing of this solution if I had more time.
2. I would add deduping to prevent multiple duplicates from being added as keys in the response.
   Example: The following text file

```
1-800-Flowers.com
1800Flowers.com
1 800 Flowers
```

Yields the following response:

```
{
  '1-800-Flowers.com': ['1800Flowers.com', '1 800 Flowers'],
  '1800Flowers.com': ['1 800 Flowers'],
};
```

3. Given the short timeframe of this challenge, I would've spent far more time investigating options for how to better filter for potential duplicates.
4. I would've added further performance improvements such as parallelization, preprocessing, etc...

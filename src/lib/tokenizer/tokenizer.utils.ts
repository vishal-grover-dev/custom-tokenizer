import { ETokenType, ETokenizationMethod, IToken, ITokenizerResult } from "@/types/tokenizer.types";

// Import js-tiktoken for GPT-style tokenization
let tiktoken: any;
try {
  tiktoken = require("js-tiktoken/ranks/cl100k_base");
} catch (error) {
  console.warn("js-tiktoken not available, will use fallback tokenization");
}

/**
 * Generates a unique ID for a token based on its index and value
 */
function generateTokenId(index: number, value: string): string {
  return `token-${index}-${value.replace(/\s/g, "_").substring(0, 10)}`;
}

/**
 * Determines the type of a token based on its content
 */
function determineTokenType(value: string): ETokenType {
  // Check for whitespace (spaces, tabs, newlines)
  if (/^\s+$/.test(value)) {
    return ETokenType.WHITESPACE;
  }

  // Check for punctuation (common punctuation marks)
  if (/^[.,;:!?'"()\[\]{}\-_/\\@#$%^&*+=<>|`~]+$/.test(value)) {
    return ETokenType.PUNCTUATION;
  }

  // Check for words (letters, numbers, and some special characters like apostrophes in contractions)
  if (/^[a-zA-Z0-9']+$/.test(value)) {
    return ETokenType.WORD;
  }

  // Everything else is considered special (emojis, special unicode characters, etc.)
  return ETokenType.SPECIAL;
}

/**
 * Tokenizes input text into an array of tokens
 * Handles various input types including special characters, punctuation, and whitespace
 */
export function tokenizeText(input: string): IToken[] {
  if (!input || input.length === 0) {
    return [];
  }

  const tokens: IToken[] = [];
  let currentIndex = 0;

  // Regular expression to split text while preserving delimiters
  // This captures words, punctuation, whitespace, and special characters
  const tokenRegex = /(\w+|[^\w\s]|\s+)/g;
  let match;

  while ((match = tokenRegex.exec(input)) !== null) {
    const value = match[0];
    const token: IToken = {
      id: generateTokenId(currentIndex, value),
      value,
      index: currentIndex,
      type: determineTokenType(value),
    };

    tokens.push(token);
    currentIndex++;
  }
  return tokens;
}

/**
 * Calculates comprehensive statistics for tokenized text (legacy function for backward compatibility)
 */
export function calculateTokenStats(tokens: IToken[], originalText: string): ITokenizerResult {
  return calculateTokenStatsWithMethod(tokens, originalText, ETokenizationMethod.CUSTOM);
}

/**
 * Tokenizes input text using js-tiktoken (GPT-style tokenization)
 * Pure JavaScript implementation without WASM dependencies
 */
export function tokenizeTextWithTiktoken(input: string): IToken[] {
  if (!input || input.length === 0) {
    return [];
  }

  try {
    if (!tiktoken) {
      throw new Error("js-tiktoken not available");
    }

    const { encode, decode } = tiktoken;

    // Encode the input text
    const encoded = encode(input);
    const tokens: IToken[] = [];

    // Decode each token individually to get the text representation
    encoded.forEach((tokenId: number, index: number) => {
      try {
        // Decode single token
        const tokenText = decode([tokenId]);

        const token: IToken = {
          id: `tiktoken-${index}-${tokenId}`,
          value: tokenText,
          index: index,
          type: determineTokenType(tokenText),
        };

        tokens.push(token);
      } catch (decodeError) {
        console.warn(`Failed to decode token ${tokenId}:`, decodeError);
        // Create a fallback token
        const token: IToken = {
          id: `tiktoken-${index}-${tokenId}`,
          value: `[Token ${tokenId}]`,
          index: index,
          type: ETokenType.SPECIAL,
        };
        tokens.push(token);
      }
    });

    return tokens;
  } catch (error) {
    console.error("js-tiktoken tokenization failed:", error);
    console.warn("Falling back to tiktoken simulation");
    return tokenizeTextWithTiktokenSimulation(input);
  }
}

/**
 * Async version for consistency (now just calls the sync version)
 */
export async function tokenizeTextWithTiktokenAsync(input: string): Promise<IToken[]> {
  return tokenizeTextWithTiktoken(input);
}

/**
 * Simulation of TikToken tokenization for fallback
 */
function tokenizeTextWithTiktokenSimulation(input: string): IToken[] {
  const tokens: IToken[] = [];
  let currentIndex = 0;

  // More aggressive tokenization that breaks words into smaller pieces
  // This simulates how GPT models tokenize text
  const tiktokenRegex = /(\w{1,4}|[^\w\s]|\s+)/g;
  let match;

  while ((match = tiktokenRegex.exec(input)) !== null) {
    const value = match[0];
    const token: IToken = {
      id: `tiktoken-sim-${currentIndex}-${value.replace(/\s/g, "_").substring(0, 10)}`,
      value,
      index: currentIndex,
      type: determineTokenType(value),
    };

    tokens.push(token);
    currentIndex++;
  }

  return tokens;
}

/**
 * Calculates comprehensive statistics for tokenized text with method info
 */
export function calculateTokenStatsWithMethod(
  tokens: IToken[],
  originalText: string,
  method: ETokenizationMethod
): ITokenizerResult {
  const totalCount = tokens.length;

  // Count only word tokens for word count (for custom method)
  // For tiktoken, we'll count all non-whitespace tokens as "words"
  const wordCount =
    method === ETokenizationMethod.TIKTOKEN
      ? tokens.filter((token) => token.type !== ETokenType.WHITESPACE).length
      : tokens.filter((token) => token.type === ETokenType.WORD).length;

  // Character count from original text (preserves original length)
  const characterCount = originalText.length;

  return {
    tokens,
    totalCount,
    wordCount,
    characterCount,
    method,
  };
}

/**
 * Main tokenization function that combines tokenization and statistics calculation
 * This is the primary function that components will use
 */
export function processTokenization(
  input: string,
  method: ETokenizationMethod = ETokenizationMethod.CUSTOM
): ITokenizerResult {
  const tokens = method === ETokenizationMethod.TIKTOKEN ? tokenizeTextWithTiktoken(input) : tokenizeText(input);
  return calculateTokenStatsWithMethod(tokens, input, method);
}

/**
 * Async version of processTokenization that uses real tiktoken when possible
 */
export async function processTokenizationAsync(
  input: string,
  method: ETokenizationMethod = ETokenizationMethod.CUSTOM
): Promise<ITokenizerResult> {
  const tokens =
    method === ETokenizationMethod.TIKTOKEN ? await tokenizeTextWithTiktokenAsync(input) : tokenizeText(input);
  return calculateTokenStatsWithMethod(tokens, input, method);
}

/**
 * Utility function to get tokens of a specific type
 */
export function getTokensByType(tokens: IToken[], type: ETokenType): IToken[] {
  return tokens.filter((token) => token.type === type);
}

/**
 * Utility function to get token statistics by type
 */
export function getTokenTypeStats(tokens: IToken[]): Record<ETokenType, number> {
  const stats: Record<ETokenType, number> = {
    [ETokenType.WORD]: 0,
    [ETokenType.PUNCTUATION]: 0,
    [ETokenType.WHITESPACE]: 0,
    [ETokenType.SPECIAL]: 0,
  };

  tokens.forEach((token) => {
    stats[token.type]++;
  });

  return stats;
}

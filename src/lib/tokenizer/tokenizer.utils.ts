import { ETokenType, ETokenizationMethod, IToken, ITokenizerResult } from "@/types/tokenizer.types";

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
 * Tokenizes input text using tiktoken (GPT-style tokenization)
 * Currently falls back to custom tokenization due to WASM compatibility issues
 */
export function tokenizeTextWithTiktoken(input: string): IToken[] {
  if (!input || input.length === 0) {
    return [];
  }

  // TODO: Implement tiktoken when WASM issues are resolved
  console.warn("TikToken tokenization not yet implemented, falling back to custom tokenization");
  return tokenizeText(input);
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

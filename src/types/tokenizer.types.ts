/**
 * Token type enumeration with E prefix following naming conventions
 */
export enum ETokenType {
  WORD = "word",
  PUNCTUATION = "punctuation",
  WHITESPACE = "whitespace",
  SPECIAL = "special",
}

/**
 * Tokenization method enumeration
 */
export enum ETokenizationMethod {
  CUSTOM = "custom",
  TIKTOKEN = "tiktoken",
}

/**
 * Token interface with I prefix following naming conventions
 */
export interface IToken {
  id: string;
  value: string;
  index: number;
  type: ETokenType;
}

/**
 * Tokenizer result interface with I prefix following naming conventions
 */
export interface ITokenizerResult {
  tokens: IToken[];
  totalCount: number;
  wordCount: number;
  characterCount: number;
  method: ETokenizationMethod;
}

/**
 * Component prop types with T prefix following naming conventions
 */
export type TTokenizerInputProps = {
  onTokenize: (result: ITokenizerResult) => void;
  placeholder?: string;
  className?: string;
  method?: ETokenizationMethod;
};

export type TTokenDisplayProps = {
  tokens: IToken[];
  className?: string;
};

export type TTokenStatsProps = {
  result: ITokenizerResult;
  className?: string;
};

export type THeaderProps = {
  className?: string;
};

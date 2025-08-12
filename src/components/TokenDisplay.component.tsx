import React from "react";
import { TTokenDisplayProps, ETokenType } from "@/types/tokenizer.types";

const TokenDisplay: React.FC<TTokenDisplayProps> = ({ tokens, className = "" }) => {
  // Function to get token-specific styling based on token type
  const getTokenTypeStyles = (type: ETokenType): string => {
    switch (type) {
      case ETokenType.WORD:
        return "bg-orange-200 text-orange-900 border-orange-300";
      case ETokenType.PUNCTUATION:
        return "bg-blue-200 text-blue-900 border-blue-300";
      case ETokenType.WHITESPACE:
        return "bg-gray-200 text-gray-700 border-gray-300";
      case ETokenType.SPECIAL:
        return "bg-purple-200 text-purple-900 border-purple-300";
      default:
        return "bg-gray-200 text-gray-700 border-gray-300";
    }
  };

  // Function to display whitespace tokens visually
  const formatTokenValue = (value: string, type: ETokenType): string => {
    if (type === ETokenType.WHITESPACE) {
      return value.replace(/ /g, "·").replace(/\t/g, "→").replace(/\n/g, "↵");
    }
    return value;
  };

  // Function to get token type label
  const getTokenTypeLabel = (type: ETokenType): string => {
    switch (type) {
      case ETokenType.WORD:
        return "Word";
      case ETokenType.PUNCTUATION:
        return "Punct";
      case ETokenType.WHITESPACE:
        return "Space";
      case ETokenType.SPECIAL:
        return "Special";
      default:
        return "Unknown";
    }
  };

  if (!tokens || tokens.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div
          className='flex items-center justify-center h-48 bg-gray-100 rounded-2xl
                        shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff]'
        >
          <div className='text-center text-gray-500'>
            <div className='text-4xl mb-2'>📝</div>
            <p className='text-lg'>No tokens to display</p>
            <p className='text-sm'>Enter some text to see tokenization results</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`} role='region' aria-labelledby='tokens-heading'>
      {/* Header */}
      <div className='mb-4'>
        <h3 id='tokens-heading' className='text-xl font-semibold text-gray-800 mb-2'>
          Tokens
        </h3>
        <div className='flex flex-wrap gap-2 text-xs'>
          <div className='flex items-center gap-1'>
            <div className='w-3 h-3 bg-orange-200 rounded border border-orange-300'></div>
            <span className='text-gray-600'>Words</span>
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-3 h-3 bg-blue-200 rounded border border-blue-300'></div>
            <span className='text-gray-600'>Punctuation</span>
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-3 h-3 bg-gray-200 rounded border border-gray-300'></div>
            <span className='text-gray-600'>Whitespace</span>
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-3 h-3 bg-purple-200 rounded border border-purple-300'></div>
            <span className='text-gray-600'>Special</span>
          </div>
        </div>
      </div>

      {/* Live region for screen readers */}
      <div aria-live='polite' aria-atomic='true' className='sr-only'>
        {tokens.length > 0 ? `${tokens.length} tokens generated` : "No tokens to display"}
      </div>

      {/* Token Grid */}
      <div
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'
        role='list'
        aria-label={`${tokens.length} tokens displayed`}
      >
        {tokens.map((token) => (
          <div
            key={token.id}
            role='listitem'
            tabIndex={0}
            className={`
              relative p-3 rounded-lg border transition-all duration-200
              shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]
              hover:shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]
              focus:shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50
              hover:scale-105 cursor-pointer
              ${getTokenTypeStyles(token.type)}
            `}
            aria-label={`Token ${token.index + 1}: "${token.value}", type: ${getTokenTypeLabel(token.type)}`}
            title={`Token #${token.index + 1} - Type: ${getTokenTypeLabel(token.type)}`}
          >
            {/* Token Index */}
            <div
              className='absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full
                            shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff]
                            flex items-center justify-center text-xs font-bold text-gray-600'
            >
              {token.index + 1}
            </div>

            {/* Token Value */}
            <div className='font-mono text-sm font-medium break-all min-h-[1.25rem] flex items-center'>
              {formatTokenValue(token.value, token.type)}
            </div>

            {/* Token Type Badge */}
            <div className='mt-2 text-xs font-medium opacity-75'>{getTokenTypeLabel(token.type)}</div>
          </div>
        ))}
      </div>

      {/* Mobile-friendly compact view for smaller screens */}
      <div className='block sm:hidden mt-6'>
        <h4 className='text-lg font-medium text-gray-800 mb-3'>Compact View</h4>
        <div
          className='bg-gray-100 rounded-2xl p-4
                        shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff]'
        >
          <div className='flex flex-wrap gap-1'>
            {tokens.map((token, index) => (
              <span
                key={token.id}
                className={`
                  inline-block px-2 py-1 rounded text-xs font-mono
                  ${getTokenTypeStyles(token.type)}
                  shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff]
                `}
                title={`Token #${index + 1} - ${getTokenTypeLabel(token.type)}`}
              >
                {formatTokenValue(token.value, token.type)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDisplay;

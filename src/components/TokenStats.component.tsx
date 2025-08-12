import React from "react";
import { TTokenStatsProps, ETokenType, ETokenizationMethod } from "@/types/tokenizer.types";
import { getTokenTypeStats } from "@/lib/tokenizer/tokenizer.utils";

const TokenStats: React.FC<TTokenStatsProps> = ({ result, className = "" }) => {
  const { tokens, totalCount, wordCount, characterCount, method } = result;

  // Get detailed token type statistics
  const typeStats = getTokenTypeStats(tokens);

  // Calculate additional metrics
  const averageTokenLength =
    tokens.length > 0 ? (tokens.reduce((sum, token) => sum + token.value.length, 0) / tokens.length).toFixed(1) : "0";

  const compressionRatio =
    characterCount > 0 ? (((characterCount - totalCount) / characterCount) * 100).toFixed(1) : "0";

  return (
    <div className={`w-full ${className}`}>
      {/* Main Stats Panel */}
      <div
        className='bg-gray-100 rounded-2xl p-6
                      shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]'
        role='region'
        aria-labelledby='statistics-heading'
      >
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h3 id='statistics-heading' className='text-xl font-semibold text-gray-800'>
            Statistics
          </h3>
          <div
            className='px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm font-medium
                          shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
          >
            {method === ETokenizationMethod.TIKTOKEN ? "TikToken" : "Custom"}
          </div>
        </div>

        {/* Primary Metrics */}
        <div
          className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'
          role='group'
          aria-label='Primary tokenization metrics'
        >
          {/* Total Tokens */}
          <div
            className='bg-white rounded-xl p-4 text-center
                          shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]
                          hover:shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]
                          transition-shadow duration-200'
            role='group'
            aria-label={`Total tokens: ${totalCount.toLocaleString()}`}
          >
            <div className='text-3xl font-bold text-orange-600 mb-1' aria-hidden='true'>
              {totalCount.toLocaleString()}
            </div>
            <div className='text-sm text-gray-600 font-medium'>Total Tokens</div>
          </div>

          {/* Word Count */}
          <div
            className='bg-white rounded-xl p-4 text-center
                          shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]
                          hover:shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]
                          transition-shadow duration-200'
            role='group'
            aria-label={`${
              method === ETokenizationMethod.TIKTOKEN ? "Non-whitespace tokens" : "Words"
            }: ${wordCount.toLocaleString()}`}
          >
            <div className='text-3xl font-bold text-orange-600 mb-1' aria-hidden='true'>
              {wordCount.toLocaleString()}
            </div>
            <div className='text-sm text-gray-600 font-medium'>
              {method === ETokenizationMethod.TIKTOKEN ? "Non-Whitespace" : "Words"}
            </div>
          </div>

          {/* Character Count */}
          <div
            className='bg-white rounded-xl p-4 text-center
                          shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]
                          hover:shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]
                          transition-shadow duration-200'
            role='group'
            aria-label={`Characters: ${characterCount.toLocaleString()}`}
          >
            <div className='text-3xl font-bold text-orange-600 mb-1' aria-hidden='true'>
              {characterCount.toLocaleString()}
            </div>
            <div className='text-sm text-gray-600 font-medium'>Characters</div>
          </div>
        </div>

        {/* Token Type Breakdown (only for custom tokenization) */}
        {method === ETokenizationMethod.CUSTOM && (
          <div className='mb-6'>
            <h4 className='text-lg font-medium text-gray-800 mb-3'>Token Types</h4>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
              <div
                className='bg-orange-50 rounded-lg p-3 border border-orange-200
                              shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              >
                <div className='text-lg font-bold text-orange-700'>{typeStats[ETokenType.WORD]}</div>
                <div className='text-xs text-orange-600'>Words</div>
              </div>

              <div
                className='bg-blue-50 rounded-lg p-3 border border-blue-200
                              shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              >
                <div className='text-lg font-bold text-blue-700'>{typeStats[ETokenType.PUNCTUATION]}</div>
                <div className='text-xs text-blue-600'>Punctuation</div>
              </div>

              <div
                className='bg-gray-50 rounded-lg p-3 border border-gray-200
                              shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              >
                <div className='text-lg font-bold text-gray-700'>{typeStats[ETokenType.WHITESPACE]}</div>
                <div className='text-xs text-gray-600'>Whitespace</div>
              </div>

              <div
                className='bg-purple-50 rounded-lg p-3 border border-purple-200
                              shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              >
                <div className='text-lg font-bold text-purple-700'>{typeStats[ETokenType.SPECIAL]}</div>
                <div className='text-xs text-purple-600'>Special</div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Metrics */}
        <div className='border-t border-gray-200 pt-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Avg Token Length:</span>
              <span className='font-medium text-gray-800'>{averageTokenLength} chars</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Compression Ratio:</span>
              <span className='font-medium text-gray-800'>{compressionRatio}%</span>
            </div>
            {characterCount > 0 && (
              <>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Tokens per Character:</span>
                  <span className='font-medium text-gray-800'>{(totalCount / characterCount).toFixed(3)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Characters per Token:</span>
                  <span className='font-medium text-gray-800'>{(characterCount / totalCount).toFixed(1)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Empty State Message */}
        {totalCount === 0 && (
          <div className='text-center py-8'>
            <div className='text-4xl mb-2'>📊</div>
            <p className='text-gray-500'>No statistics available</p>
            <p className='text-sm text-gray-400'>Enter some text to see detailed metrics</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenStats;

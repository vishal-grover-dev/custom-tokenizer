"use client";

import React, { useState } from "react";
import Header from "@/components/Header.component";
import TokenizerInput from "@/components/TokenizerInput.component";
import TokenDisplay from "@/components/TokenDisplay.component";
import TokenStats from "@/components/TokenStats.component";
import { ITokenizerResult, ETokenizationMethod } from "@/types/tokenizer.types";

export default function Home() {
  // State management for tokenization flow
  const [tokenizerResult, setTokenizerResult] = useState<ITokenizerResult>({
    tokens: [],
    totalCount: 0,
    wordCount: 0,
    characterCount: 0,
    method: ETokenizationMethod.CUSTOM,
  });

  // State for tokenization method
  const [tokenizationMethod, setTokenizationMethod] = useState<ETokenizationMethod>(ETokenizationMethod.CUSTOM);

  // Handle tokenization results from input component
  const handleTokenize = (result: ITokenizerResult) => {
    setTokenizerResult(result);
  };

  // Handle method toggle
  const handleMethodToggle = (method: ETokenizationMethod) => {
    setTokenizationMethod(method);
  };

  // Handle keyboard navigation for method toggle
  const handleMethodKeyDown = (event: React.KeyboardEvent, method: ETokenizationMethod) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleMethodToggle(method);
    }
  };

  return (
    <main className='min-h-screen bg-neumorphic-background'>
      {/* Skip to main content link for accessibility */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   bg-orange-600 text-white px-4 py-2 rounded-lg z-50
                   focus:outline-none focus:ring-2 focus:ring-orange-300'
      >
        Skip to main content
      </a>

      {/* Container with responsive padding */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12'>
        {/* Header Component */}
        <Header />

        {/* Method Toggle */}
        <div className='w-full max-w-7xl mx-auto mb-6'>
          <div className='bg-white rounded-2xl p-4 shadow-neomorphic'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <div>
                <h2 id='tokenization-method-label' className='text-lg font-semibold text-gray-800 mb-1'>
                  Tokenization Method
                </h2>
                <p className='text-sm text-gray-600'>Choose how you want to tokenize your text</p>
              </div>
              <div
                role='radiogroup'
                aria-labelledby='tokenization-method-label'
                className='flex bg-gray-100 rounded-xl p-1 shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff]'
              >
                <button
                  role='radio'
                  aria-checked={tokenizationMethod === ETokenizationMethod.CUSTOM}
                  aria-label='Use custom tokenization method'
                  onClick={() => handleMethodToggle(ETokenizationMethod.CUSTOM)}
                  onKeyDown={(e) => handleMethodKeyDown(e, ETokenizationMethod.CUSTOM)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
                    tokenizationMethod === ETokenizationMethod.CUSTOM
                      ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Custom
                </button>
                <button
                  role='radio'
                  aria-checked={tokenizationMethod === ETokenizationMethod.TIKTOKEN}
                  aria-label='Use TikToken tokenization method'
                  onClick={() => handleMethodToggle(ETokenizationMethod.TIKTOKEN)}
                  onKeyDown={(e) => handleMethodKeyDown(e, ETokenizationMethod.TIKTOKEN)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
                    tokenizationMethod === ETokenizationMethod.TIKTOKEN
                      ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  TikToken
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div id='main-content' className='w-full max-w-7xl mx-auto'>
          {/* Desktop Layout: Two-column (input left, tokens right) */}
          <div className='hidden lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12'>
            {/* Left Column: Input and Stats */}
            <div className='space-y-6'>
              <div className='bg-white rounded-2xl p-6 shadow-neomorphic'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Input Text</h2>
                <TokenizerInput
                  onTokenize={handleTokenize}
                  placeholder='Enter your text here to see how it gets tokenized in real-time...'
                  className='mb-6'
                  method={tokenizationMethod}
                />
              </div>

              <TokenStats result={tokenizerResult} />
            </div>

            {/* Right Column: Token Display */}
            <div className='bg-white rounded-2xl p-6 shadow-neomorphic'>
              <TokenDisplay tokens={tokenizerResult.tokens} />
            </div>
          </div>

          {/* Tablet Layout: Single-column stacked */}
          <div className='hidden md:block lg:hidden'>
            <div className='space-y-8'>
              {/* Input Section */}
              <div className='bg-white rounded-2xl p-6 shadow-neomorphic'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Input Text</h2>
                <TokenizerInput
                  onTokenize={handleTokenize}
                  placeholder='Enter your text here to see how it gets tokenized...'
                  className='mb-6'
                  method={tokenizationMethod}
                />
              </div>

              {/* Stats and Tokens Row */}
              <div className='grid grid-cols-1 gap-6'>
                <TokenStats result={tokenizerResult} />
                <div className='bg-white rounded-2xl p-6 shadow-neomorphic'>
                  <TokenDisplay tokens={tokenizerResult.tokens} />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout: Compact single-column */}
          <div className='block md:hidden'>
            <div className='space-y-6'>
              {/* Input Section */}
              <div className='bg-white rounded-xl p-4 shadow-neomorphic'>
                <h2 className='text-xl font-semibold text-gray-800 mb-3'>Input Text</h2>
                <TokenizerInput
                  onTokenize={handleTokenize}
                  placeholder='Enter text to tokenize...'
                  className='mb-4'
                  method={tokenizationMethod}
                />
              </div>

              {/* Quick Stats */}
              <div className='bg-white rounded-xl p-4 shadow-neomorphic'>
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-gray-600'>Tokens:</span>
                  <span className='font-semibold text-orange-600'>{tokenizerResult.totalCount}</span>
                </div>
                <div className='flex justify-between items-center text-sm mt-2'>
                  <span className='text-gray-600'>Characters:</span>
                  <span className='font-semibold text-gray-800'>{tokenizerResult.characterCount}</span>
                </div>
              </div>

              {/* Token Display */}
              <div className='bg-white rounded-xl p-4 shadow-neomorphic'>
                <TokenDisplay tokens={tokenizerResult.tokens} />
              </div>

              {/* Full Stats (Collapsible on mobile) */}
              <details className='bg-white rounded-xl shadow-neomorphic'>
                <summary className='p-4 cursor-pointer text-lg font-medium text-gray-800 hover:text-orange-600 transition-colors'>
                  Detailed Statistics
                </summary>
                <div className='px-4 pb-4'>
                  <TokenStats result={tokenizerResult} />
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className='mt-12 pt-8 border-t border-gray-200'>
          <div className='text-center text-sm text-gray-500'>
            <p>CT - Custom Tokenizer | Built with Next.js and Tailwind CSS</p>
            <p className='mt-1'>Experience the power of neumorphic design</p>
          </div>
        </footer>
      </div>
    </main>
  );
}

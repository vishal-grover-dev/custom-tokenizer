import React, { useState, useCallback, useEffect } from "react";
import { TTokenizerInputProps, ETokenizationMethod } from "@/types/tokenizer.types";
import { processTokenization } from "@/lib/tokenizer/tokenizer.utils";

const TokenizerInput: React.FC<TTokenizerInputProps> = ({
  onTokenize,
  placeholder = "Enter your text here to see how it gets tokenized...",
  className = "",
  method = ETokenizationMethod.CUSTOM,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Tokenization function
  const performTokenization = useCallback(
    (text: string) => {
      setIsProcessing(true);
      try {
        const result = processTokenization(text, method);
        onTokenize(result);
      } catch (error) {
        console.error("Tokenization error:", error);
        // Handle error gracefully by providing empty result
        onTokenize({
          tokens: [],
          totalCount: 0,
          wordCount: 0,
          characterCount: 0,
          method,
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [onTokenize, method]
  );

  // Handle input changes with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performTokenization(inputValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, performTokenization]);

  // Re-tokenize when method changes
  useEffect(() => {
    if (inputValue) {
      performTokenization(inputValue);
    }
  }, [method, performTokenization, inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className={`w-full ${className}`}>
      <div className='relative'>
        {/* Neumorphic textarea with inset shadow effects */}
        <textarea
          id='tokenizer-input'
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          aria-label='Text input for tokenization'
          aria-describedby='input-stats tokenization-status'
          className='w-full h-48 p-6 bg-gray-100 rounded-2xl resize-none
                     shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]
                     focus:shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff,0_0_0_3px_rgba(255,107,53,0.3)]
                     focus:outline-none
                     text-gray-800 text-lg leading-relaxed
                     placeholder:text-gray-500 placeholder:text-base
                     transition-shadow duration-300'
          rows={6}
        />

        {/* Processing indicator */}
        {isProcessing && (
          <div className='absolute top-4 right-4' aria-label='Processing tokenization'>
            <div className='w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}

        {/* Clear button */}
        {inputValue && (
          <button
            onClick={handleClear}
            aria-label='Clear input text'
            className='absolute bottom-4 right-4 px-4 py-2 text-sm
                       bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl
                       shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]
                       hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff]
                       active:shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]
                       focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50
                       transition-shadow duration-200
                       font-medium'
          >
            Clear
          </button>
        )}
      </div>

      {/* Input stats */}
      <div id='input-stats' className='mt-4 flex justify-between text-sm text-gray-600'>
        <span>Characters: {inputValue.length}</span>
        {inputValue && (
          <span id='tokenization-status' className='text-orange-600 font-medium' aria-live='polite'>
            {isProcessing ? "Processing..." : "Ready"}
          </span>
        )}
      </div>
    </div>
  );
};

export default TokenizerInput;

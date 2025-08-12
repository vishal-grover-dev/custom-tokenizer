import React from "react";

const Header: React.FC = () => {
  return (
    <header className='w-full mb-8'>
      <div className='text-center'>
        {/* CT Logo with neumorphic treatment */}
        <div className='inline-flex items-center justify-center w-24 h-24 mb-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] hover:shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff] transition-shadow duration-300'>
          <span className='text-4xl font-bold text-white tracking-wider'>CT</span>
        </div>

        {/* Title and Subtitle */}
        <h1 className='text-4xl font-bold text-gray-800 mb-2'>Custom Tokenizer</h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Transform your text into tokens with our intuitive tokenization interface. See how your content gets broken
          down in real-time.
        </p>
      </div>
    </header>
  );
};

export default Header;

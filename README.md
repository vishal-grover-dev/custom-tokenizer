# Custom Tokenizer

A modern, interactive web application for visualizing text tokenization with support for both custom and GPT-style tokenization methods. Built with Next.js, TypeScript, and Tailwind CSS featuring a beautiful neumorphic design.

![Custom Tokenizer](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality

- **Real-time Tokenization**: See your text tokenized as you type with 300ms debouncing
- **Dual Tokenization Methods**:
  - **Custom Tokenizer**: Rule-based tokenization with word, punctuation, whitespace, and special character detection
  - **TikToken Simulation**: GPT-style tokenization that breaks text into smaller, more granular tokens
- **Interactive Token Display**: Click and explore individual tokens with detailed type information
- **Comprehensive Statistics**: Token counts, character counts, compression ratios, and more

### 🎨 Design & UX

- **Neumorphic Design**: Modern, soft UI with subtle shadows and depth
- **Fully Responsive**: Optimized layouts for desktop, tablet, and mobile devices
- **Orange Theme**: Warm, professional color scheme with excellent contrast ratios
- **Smooth Animations**: Hover effects, transitions, and micro-interactions

### ♿ Accessibility

- **WCAG 2.1 Compliant**: Full keyboard navigation and screen reader support
- **ARIA Labels**: Comprehensive labeling for assistive technologies
- **Focus Management**: Clear focus indicators and logical tab order
- **Live Regions**: Real-time announcements for dynamic content
- **Skip Links**: Quick navigation to main content

### 📱 Responsive Layouts

- **Desktop (1024px+)**: Two-column layout with input on the left, tokens on the right
- **Tablet (768px-1023px)**: Single-column stacked layout with optimized spacing
- **Mobile (<768px)**: Compact layout with collapsible statistics and quick stats

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/vishal-grover-dev/custom-tokenizer.git
   cd custom-tokenizer
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
custom-tokenizer/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── globals.css         # Global styles and utilities
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Main page component
│   ├── components/             # React components
│   │   ├── Header.component.tsx
│   │   ├── TokenDisplay.component.tsx
│   │   ├── TokenizerInput.component.tsx
│   │   └── TokenStats.component.tsx
│   ├── lib/                    # Utility libraries
│   │   └── tokenizer/
│   │       └── tokenizer.utils.ts
│   └── types/                  # TypeScript type definitions
│       └── tokenizer.types.ts
├── .kiro/                      # Kiro AI specifications
│   └── specs/
│       └── custom-tokenizer/
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.ts              # Next.js configuration
└── package.json
```

## 🔧 Technology Stack

### Frontend Framework

- **Next.js 15.0**: React framework with App Router
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript 5.0**: Type-safe development

### Styling

- **Tailwind CSS 3.0**: Utility-first CSS framework
- **Custom Neumorphic Design**: Soft UI components with depth
- **Responsive Design**: Mobile-first approach

### Tokenization

- **Custom Tokenizer**: Regex-based tokenization with type classification
- **TikToken Integration**: GPT-style tokenization (simulated)

### Development Tools

- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 🎮 Usage

### Basic Tokenization

1. Enter text in the input area
2. Watch as tokens appear in real-time
3. Toggle between Custom and TikToken methods
4. Explore individual tokens by clicking on them

### Token Types

- **Words**: Alphanumeric characters and contractions
- **Punctuation**: Symbols and punctuation marks
- **Whitespace**: Spaces, tabs, and line breaks
- **Special**: Emojis, unicode characters, and other symbols

### Statistics

- **Total Tokens**: Complete count of generated tokens
- **Word Count**: Number of word-type tokens
- **Character Count**: Total characters in input
- **Compression Ratio**: Efficiency of tokenization
- **Average Token Length**: Mean characters per token

## 🎨 Design System

### Colors

- **Primary Orange**: `#F97316` - Main brand color
- **Orange Variants**: 50-900 scale for different use cases
- **Grays**: Neutral colors for text and backgrounds
- **Neumorphic Background**: `#F3F4F6` - Soft gray base

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the documentation
- Review existing issues for solutions

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

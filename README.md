# IntentFlow 🌸

**Garden Protocol Intent Lifecycle Simulator**

A comprehensive Next.js application that visually simulates the complete lifecycle of an intent in the Garden Protocol. Built with modern web technologies and optimized for performance, accessibility, and user experience.

![IntentFlow Demo](https://via.placeholder.com/800x400/7BDCBA/FFFFFF?text=IntentFlow+Demo)

## 🎯 Overview

IntentFlow provides an educational and interactive experience for understanding cross-chain intent-based transactions in the Garden Protocol ecosystem. Users can walk through each step of the intent lifecycle, from initial quote request to final token redemption.

## ✨ Features

### 🔄 Complete Intent Lifecycle

- **Quote Request**: Interactive token/chain selection with real-time quote generation
- **Intent Signing**: JSON structure visualization with simulated wallet signing
- **Order Book Submission**: Visual addition to pending intents pool
- **Auction Simulation**: Real-time solver competition with 5-second challenge window
- **Solver Selection**: Automated winner selection with detailed reasoning
- **User Settlement**: Transaction submission and confirmation simulation
- **Solver Execution**: Destination chain execution visualization
- **Token Redemption**: Final token receipt with redemption flow

### 🎨 Garden Protocol Branding

- **Official Color Palette**: Mint, rose, and blue gradients from Garden's brand guidelines
- **Custom Logo**: Recreation of Garden's distinctive rounded square logo
- **Consistent Theming**: All components follow Garden's visual identity
- **Professional Design**: Clean, modern interface reflecting Garden's brand values

### 📱 Responsive Design

- **Mobile-First**: Optimized for mobile, tablet, and desktop experiences
- **Touch-Friendly**: Large touch targets and intuitive interactions
- **Adaptive Layouts**: Components stack and flow naturally across screen sizes
- **Performance Optimized**: Fast loading and smooth animations on all devices

### ⚡ Technical Excellence

- **Modern Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Smooth Animations**: Framer Motion powers all transitions and interactions
- **State Management**: Zustand for predictable and performant state handling
- **Accessibility**: WCAG 2.1 AA compliance with semantic HTML and ARIA labels
- **Performance**: Optimized for Core Web Vitals and fast loading

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone ""
   cd intentflow
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install

   # or

   pnpm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev

   # or

   pnpm dev
   \`\`\`

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Architecture

### Directory Structure

````plaintext
intentflow/
├── app/                     # Next.js App Router
│   ├── globals.css         # Global styles and CSS variables
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main application page
├── components/             # React components
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── intent-builder.tsx  # Quote request interface
│   ├── intent-signing.tsx  # Intent signing simulation
│   ├── auction-simulator.tsx # Solver auction visualization
│   ├── solver-selection.tsx # Winner selection display
│   ├── settlement-flow.tsx # Transaction settlement
│   ├── redeem-card.tsx     # Token redemption
│   ├── order-book-submission.tsx # Order book integration
│   ├── step-indicator.tsx  # Progress visualization
│   └── garden-logo.tsx     # Garden Protocol logo
├── lib/                    # Utilities and configuration
│   ├── store.ts           # Zustand state management
│   └── utils.ts           # Helper functions
├── data/                   # Mock data and constants
│   └── mock-data.ts       # Sample tokens, chains, solvers
├── public/                 # Static assets
│   ├── garden-logo.png    # Garden Protocol branding
│   └── garden-colors.png  # Brand color reference
└── types/                  # TypeScript type definitions
    └── index.ts           # Shared type definitions

### Key Technologies

- **Framework**: Next.js 14 with App Router  
- **Language**: TypeScript for type safety  
- **Styling**: Tailwind CSS for utility-first styling  
- **UI Components**: shadcn/ui for consistent design system  
- **Animations**: Framer Motion for smooth interactions  
- **State Management**: Zustand for lightweight state handling  
- **Icons**: Lucide React for consistent iconography  

## 🎨 Design System

### Color Palette (Garden Protocol)

```css
/* Main Colorway */
--garden-mint-500: #7BDCBA;    /* Primary background */
--garden-blue-500: #9BC8FF;    /* Primary gradient */

/* Alternative Colorway 1 */
--garden-sky-500: #8DC0FF;     /* Alt background */
--garden-pink-500: #FFBBD3;    /* Alt gradient */

/* Alternative Colorway 2 */
--garden-rose-500: #FCB9C2;    /* Accent background */
--garden-orange-500: #FDD79D;  /* Accent gradient */


### Code Style and Standards

This project follows Vercel and Lee Robinson's best practices:

#### File Organization
- **Colocation**: Components, hooks, and utilities are colocated when possible
- **Barrel Exports**: Clean imports using index files
- **Naming Conventions**: kebab-case for files, PascalCase for components

#### React Patterns
- **Server Components**: Default to Server Components, use Client Components only when needed
- **Composition**: Favor composition over inheritance
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Error Boundaries**: Graceful error handling throughout the application

#### Performance Optimizations
- **Bundle Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized loading
- **Font Loading**: System fonts for zero layout shift
- **CSS-in-JS**: Tailwind CSS for optimal bundle size

#### TypeScript Best Practices
- **Strict Mode**: Enabled for maximum type safety
- **Interface Definitions**: Clear, reusable type definitions
- **Generic Types**: Flexible, reusable component types
- **Type Guards**: Runtime type checking where needed

### State Management

The application uses Zustand for state management with the following principles:

- **Single Store**: Centralized state for the intent lifecycle
- **Immutable Updates**: State updates follow immutability patterns
- **Computed Values**: Derived state calculated on-demand
- **Persistence**: Optional state persistence for user preferences


## 🎯 Usage Guide

### Intent Lifecycle Walkthrough

1. **Quote Request**
   - Select source and destination blockchain networks
   - Choose input and output tokens from available options
   - Enter desired swap amount
   - Generate real-time quote with fees and estimated time

2. **Intent Signing**
   - Review comprehensive quote summary
   - Examine detailed route information
   - View JSON intent structure for transparency
   - Simulate wallet signing process

3. **Order Book Submission**
   - Watch intent submission to pending pool
   - View other pending intents in the system
   - Automatic progression to auction phase

4. **Auction Simulation**
   - Observe three competing solvers submitting bids
   - Real-time bid updates and competition
   - 5-second challenge window for higher-ranked solvers
   - Visual progress indicators and status updates

5. **Solver Selection**
   - Automatic selection of optimal solver
   - Detailed reasoning for selection criteria
   - Performance metrics and reputation scores
   - Clear winner announcement

6. **Settlement Process**
   - User transaction submission and confirmation
   - Solver execution on destination chain
   - Real-time progress tracking
   - Status updates for both transactions

7. **Token Redemption**
   - Final token receipt confirmation
   - Redemption process simulation
   - Transaction summary and details
   - Option to start new intent


#### Mock Data
- Edit `data/mock-data.ts` to add new tokens, chains, or solvers
- Modify exchange rates and fees for different scenarios
- Add new solver profiles with custom attributes

#### Animation Settings
- Adjust Framer Motion configurations in components
- Modify timing and easing functions
- Customize transition durations and effects

### Development Workflow

1. **Fork Repository**
   \`\`\`bash
   git clone https://github.com/your-username/intentflow.git
   cd intentflow
   \`\`\`

2. **Create Feature Branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`

3. **Make Changes**
   - Follow code style guidelines
   - Add tests for new functionality
   - Update documentation as needed

4. **Commit Changes**
   \`\`\`bash
   git commit -m "feat: add amazing feature"
   \`\`\`

5. **Push and Create PR**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Garden Protocol** for the brand guidelines and protocol inspiration
- **Vercel** for the excellent Next.js framework and deployment platform
- **shadcn** for the beautiful and accessible UI component library
- **Framer** for the powerful animation library
- **Tailwind CSS** for the utility-first CSS framework


**Built with ❤️ for the Garden Protocol ecosystem**

*IntentFlow - Making cross-chain intents accessible and understandable*
````

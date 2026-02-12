# Valentine Proposal React Component (TypeScript + Tailwind) 💖

A fully typed, interactive React component built with TypeScript and Tailwind CSS, perfect for Valentine's Day proposals with falling hearts, animated confetti, and a playful "No" button that runs away from clicks!

## Features ✨

- **TypeScript**: Fully typed with interfaces for type safety
- **Tailwind CSS**: Modern utility-first styling
- **Falling Hearts Background**: Continuous animation of hearts falling from top to bottom
- **Interactive "No" Button**: The "No" button moves to a random position whenever the user tries to hover or click it (works on both desktop and mobile!)
- **Celebration Animation**: When "Yes" is clicked:
  - Hearts explode from the button
  - Confetti cannons shoot from both sides of the screen
  - Celebration sound plays
  - Congratulations message appears
- **Fully Responsive**: Works perfectly on all screen sizes using Tailwind's responsive utilities
- **Smooth Animations**: Uses CSS animations and canvas-confetti library for professional effects

## Installation

### 1. Install Dependencies

Install the required packages:

\`\`\`bash
npm install canvas-confetti
npm install --save-dev @types/canvas-confetti
\`\`\`

### 2. Tailwind CSS Setup

If you haven't set up Tailwind CSS yet:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Update your `tailwind.config.js`:

\`\`\`js
/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
"./src/**/\*.{js,jsx,ts,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}
\`\`\`

Add Tailwind directives to your `src/index.css`:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

### 3. Add Your Audio File

Place your celebration sound file in the `public` folder and name it `celebration-sound.mp3`, or update the audio source path in the component:

\`\`\`tsx
<audio ref={audioRef} src="/your-audio-file.mp3" preload="auto" />
\`\`\`

### 4. Import and Use the Component

\`\`\`tsx
import ValentineProposal from './ValentineProposal';

function App() {
return <ValentineProposal />;
}

export default App;
\`\`\`

## TypeScript Interfaces

The component uses the following TypeScript interfaces:

\`\`\`typescript
interface FallingHeart {
id: number;
left: number;
delay: number;
duration: number;
size: number;
}

interface ExplosionHeart {
id: number;
angle: number;
distance: number;
duration: number;
delay: number;
}

interface ButtonPosition {
top: string;
left: string;
}
\`\`\`

## Customization Options

### Change the Question Text

Modify the heading (around line 227):

\`\`\`tsx

<h1 className="text-2xl md:text-3xl lg:text-4xl text-pink-600 mb-4 font-bold leading-tight">
  Your custom question here
</h1>
\`\`\`

### Customize Colors

The component uses Tailwind's color classes. Main colors used:

- Background: `bg-linear-to-br from-indigo-500 via-purple-500 to-purple-700`
- Text: `text-pink-600`
- Button: `bg-linear-to-r from-pink-600 to-pink-400`

You can easily change these to any Tailwind color:

\`\`\`tsx
// Example: Change to blue theme
className="text-blue-600" // instead of text-pink-600
className="bg-linear-to-r from-blue-600 to-blue-400" // instead of pink
\`\`\`

Or extend your Tailwind config with custom colors:

\`\`\`js
// tailwind.config.js
module.exports = {
theme: {
extend: {
colors: {
'custom-pink': '#ff1493',
'custom-purple': '#764ba2',
}
}
}
}
\`\`\`

### Adjust Number of Falling Hearts

Modify line 42:

\`\`\`tsx
const hearts: FallingHeart[] = Array.from({ length: 25 }, (\_, i) => ({
// Change 25 to your desired number
\`\`\`

### Change Congratulations Message

Modify the congratulations section (around line 270):

\`\`\`tsx

<h1 className="text-3xl md:text-4xl lg:text-5xl text-pink-600 mb-5 font-bold...">
  Your custom congratulations message!
</h1>
\`\`\`

### Modify Confetti Colors

Change the confetti colors in the `triggerConfetti` function (around line 90):

\`\`\`tsx
colors: ['#ff69b4', '#ff1493', '#ff6b9d', '#ffc0cb', '#ff85a1', '#FFD700', '#FF69B4'],
\`\`\`

## Tailwind Classes Reference

Key Tailwind utilities used:

- **Layout**: `relative`, `absolute`, `flex`, `items-center`, `justify-center`
- **Sizing**: `w-screen`, `h-screen`, `max-w-[550px]`
- **Spacing**: `p-10`, `m-5`, `mb-4`
- **Typography**: `text-2xl`, `font-bold`, `leading-tight`
- **Colors**: `bg-pink-600`, `text-white`, `bg-gradient-to-r`
- **Effects**: `shadow-2xl`, `rounded-full`, `opacity-95`
- **Responsive**: `md:text-3xl`, `lg:text-4xl`

## How It Works

1. **Initial State**: User sees the question with "Yes" and "No" buttons
2. **"No" Button Behavior**:
   - On desktop: Moves when mouse hovers (`onMouseEnter`)
   - On mobile: Moves when user touches (`onTouchStart`)
   - Calculates safe boundaries within container
   - Uses TypeScript for type-safe position calculations
3. **"Yes" Button Click**:
   - Triggers heart explosion animation
   - Launches confetti from both sides using `canvas-confetti`
   - Plays celebration sound
   - Shows congratulations message with smooth fade-in
4. **Responsive Design**:
   - Uses Tailwind's responsive prefixes (`md:`, `lg:`)
   - `clamp()` is replaced with responsive text sizes
   - Mobile-first approach

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## TypeScript Benefits

- **Type Safety**: Prevents runtime errors with compile-time checking
- **IntelliSense**: Better IDE autocomplete and suggestions
- **Refactoring**: Safer code refactoring with type checking
- **Documentation**: Interfaces serve as inline documentation

## Performance Optimizations

- Uses `useRef` for DOM references (no re-renders)
- Cleanup timers with `setTimeout` to prevent memory leaks
- CSS animations instead of JavaScript animations where possible
- Tailwind CSS purges unused styles in production

## Troubleshooting

**TypeScript errors:**

- Make sure `@types/canvas-confetti` is installed
- Check `tsconfig.json` has `"jsx": "react-jsx"` enabled

**Tailwind classes not working:**

- Verify Tailwind is properly configured in `tailwind.config.js`
- Check that your component file is in the `content` array
- Make sure Tailwind directives are in your CSS file

**Audio doesn't play:**

- Browsers require user interaction before playing audio
- Check the audio file path is correct
- Look for console errors

**"No" button doesn't move on mobile:**

- Ensure `touch-none` class is applied
- Test on actual device, not just browser dev tools
- Check that `onTouchStart` event is properly bound

## Project Structure

\`\`\`
src/
├── ValentineProposal.tsx # Main component
├── App.tsx # App entry point
└── index.css # Tailwind directives
public/
└── celebration-sound.mp3 # Your audio file
\`\`\`

## Example Usage

\`\`\`tsx
import React from 'react';
import ValentineProposal from './ValentineProposal';

const App: React.FC = () => {
return (

<div className="w-full h-full">
<ValentineProposal />
</div>
);
};

export default App;
\`\`\`

## License

Free to use for personal projects! 💕

---

Made with ❤️ and TypeScript for spreading love on Valentine's Day!

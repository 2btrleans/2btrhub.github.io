# Roblox Scripter Portfolio

## Overview

This is a static portfolio website for a Roblox scripter, built with vanilla HTML, CSS, and JavaScript. The site showcases the developer's skills in Lua programming and Roblox game development through a modern, interactive design featuring particle animations and responsive layouts.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### July 22, 2025 - Social Links and Team Section Updates
- Replaced GitHub link with Discord link using Discord branding colors
- Replaced Roblox profile link with "Get Script" button that redirects to Discord
- Added new "Our Team" section featuring three team members:
  - 2btr (Lead Developer) - with profile picture
  - ShadowBey (Script Specialist) - with profile picture  
  - FlexAndFrag (Game Designer) - with profile picture
- Team member cards include placeholder avatars ready for profile pictures
- Added hover animations and responsive design for team section
- Fixed JavaScript error with anchor link selector

### July 22, 2025 - Feedback System Implementation
- Added interactive 5-star rating system with hover effects
- Created comment textarea with character counter (500 char limit)
- Implemented Discord webhook integration for feedback submission
- Added loading, success, and error states for user feedback
- Responsive design for mobile devices
- Webhook URL placeholder: 'YOUR_DISCORD_WEBHOOK_URL_HERE' - ready for customization
- Feedback messages include rating, comment, and timestamp
- Auto-clear form after successful submission

### July 22, 2025 - Turkish Flag Addition
- Added animated Turkish flag in top right corner
- Flag features authentic colors and symbols (red background, white crescent and star)
- Implemented multiple animations: wave effect, star twinkle, crescent glow
- Hover effects with scaling and enhanced shadow
- Responsive design for mobile devices
- Fixed positioning that stays in place during scrolling

## System Architecture

### Frontend Architecture
- **Static Website**: Built with vanilla HTML5, CSS3, and JavaScript
- **Single Page Application**: All content is contained within a single HTML file
- **Client-Side Rendering**: No server-side processing required
- **Responsive Design**: Mobile-first approach with CSS media queries

### Technology Stack
- **HTML5**: Semantic markup with SEO meta tags and Open Graph properties
- **CSS3**: Modern styling with CSS Grid, Flexbox, and CSS animations
- **Vanilla JavaScript**: Custom particle system and interactive elements
- **External Libraries**:
  - Font Awesome 6.4.0 for icons
  - Google Fonts (Inter) for typography

## Key Components

### 1. HTML Structure (index.html)
- **Purpose**: Main document structure and content
- **Features**:
  - SEO-optimized meta tags
  - Social media sharing tags (Open Graph)
  - Accessibility considerations
  - Semantic HTML structure

### 2. Styling System (styles.css)
- **Purpose**: Visual design and responsive layout
- **Key Features**:
  - CSS Reset for cross-browser compatibility
  - Modern CSS Grid and Flexbox layouts
  - CSS animations and transitions
  - Gradient backgrounds and modern UI elements
  - Mobile-responsive design patterns

### 3. Interactive Elements (script.js)
- **Purpose**: Dynamic user interactions and visual effects
- **Core Feature**: Particle system for animated background
- **Implementation**: Object-oriented JavaScript class structure
- **Optimization**: Device-aware particle count for performance

## Data Flow

1. **Static Content Delivery**: HTML content loads immediately
2. **Asset Loading**: External fonts and icons load asynchronously
3. **JavaScript Initialization**: Particle system initializes on page load
4. **Responsive Adaptation**: CSS media queries adjust layout based on viewport
5. **Animation Loop**: JavaScript manages continuous particle animations

## External Dependencies

### CDN Resources
- **Font Awesome 6.4.0**: Icon library for UI elements
- **Google Fonts (Inter)**: Primary typography system

### Advantages of CDN Approach
- Faster loading times through global distribution
- Reduced server bandwidth requirements
- Automatic caching benefits
- No local asset management needed

## Deployment Strategy

### Static Hosting Compatible
- **Deployment Type**: Static file hosting
- **Requirements**: No server-side processing needed
- **Compatible Platforms**:
  - GitHub Pages
  - Netlify
  - Vercel
  - Traditional web hosting
  - Replit static hosting

### File Structure
```
/
├── index.html          # Main HTML document
├── styles.css          # Stylesheet
└── script.js           # JavaScript functionality
```

### Performance Considerations
- Minimal file structure for fast loading
- Optimized particle count based on device capability
- Efficient CSS animations using transforms
- External resources loaded from CDN

### Browser Compatibility
- Modern browsers with ES6 support
- CSS Grid and Flexbox support required
- Progressive enhancement approach for older browsers
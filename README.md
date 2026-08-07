# YRecall Web Brand

Welcome to the official brand and marketing website repository for **YRecall**, the flagship mobile-first context capture tool designed and developed by the LYFSpot. 

YRecall exists to solve a particular modern frustration: remembering that an answer exists, but not where you left it. This website serves as the digital front door, clearly articulating the product's value proposition, target personas, technical philosophy, and design language.

## 🌟 Brand Story

LYFSpot is an independent conglomerate ecosystem focused on high-quality, consumer-first software for real life. YRecall is our first expression of that belief — a unified place to hold the threads that make up a day.

*“Simplicity is not a smaller ambition. It is a sharper one.”*
— Sravan Sai Vuppula, Founder

YRecall is designed around two speeds:
1. **Capture should take seconds.**
2. **Organization can happen later.**

It is built to be a softer landing for the details that usually disappear between meetings, commutes, and daily life. 

## 🚀 Key Website Features

This repository powers the entire marketing and brand experience, built with modern web technologies:

- **Mobile-First Glassmorphism Design:** Beautiful translucent overlays, subtle shadows, and crisp typography that adapts perfectly to any screen size.
- **Dynamic Workflows:** Interactive tabs demonstrating core use-cases for Founders, Product Leaders, and Engineers without relying on heavy video assets.
- **iOS Waitlist Integration:** A seamless, multi-step early access flow for iOS users.
- **Comparison Matrix:** A transparent, side-by-side look at how YRecall outperforms fragmented tool stacks.
- **Light & Dark Mode:** Native CSS-variable driven theme support that respects system preferences.

## 🛠️ Technology Stack

- **Framework:** React + Vite
- **Styling:** Vanilla CSS (CSS Variables for theming, BEM-inspired architecture)
- **Icons:** Lucide React
- **Type Checking:** TypeScript
- **Routing:** React Router

## 📂 Project Structure

```
├── web/
│   ├── src/
│   │   ├── components/       # Reusable UI components (SiteChrome, PageFrame, Navigation)
│   │   ├── pages/            # Top-level route components (Index, Documentation, SecondaryPages)
│   │   ├── sections/home/    # Modular sections for the homepage (Workflows, Features, etc.)
│   │   ├── App.tsx           # App routing and layout shell
│   │   ├── index.css         # Global design tokens and utilities
│   │   └── main.tsx          # React entry point
│   ├── public/               # Static assets
│   ├── package.json          # Dependencies and scripts
│   └── vite.config.ts        # Vite configuration
```

## 💻 Getting Started

To run this project locally, ensure you have Node.js and npm installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sravansai-26/YRecall-Web-Brand.git
   cd YRecall-Web-Brand/web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🎨 Design Language & Guidelines

When contributing to this repository, please adhere to the LYFSpot standard:
- **Typography:** Inter/Roboto paired with bold, legible headings.
- **Colors:** Deep Navy, Teal, and Lime tones for emphasis. Never use generic palettes.
- **Animations:** Keep transitions under `300ms`. Prefer fade-ins and subtle slide-ups (`.animate-in`). 
- **Simplicity:** Don't build heavy interactive web-apps here. This site must remain an elegant, fast-loading brand presentation for the mobile app.

## 🤝 Ecosystem

YRecall is part of the broader [LYFSpot ecosystem](https://sailyfspot.blogspot.com). 
- Designed by [Build with Sravan](https://buildwithsravan.dev).

---
© LYFSpot. All rights reserved.

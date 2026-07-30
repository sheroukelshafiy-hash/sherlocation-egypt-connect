# SherLocation

---

## [v1.3] - 2026-07-30

### New Features & Enhancements

#### Navigation & Header Updates
* **How It Works Action:** Added dynamic click handler for smooth scrolling to the homepage features section and routing to the `/how-it-works` view.
* **Authentication Entry Point:** Wired the "Log In" button to open the global Auth Modal / navigate to `/login`.
* **Interactive Elements:** Fixed cursor states, click listeners, and hover effects across all primary header navigation links.

#### Preferences & Global Settings
* **Theme Management (Light / Dark Mode):**
  * Integrated a theme toggle button in the main navbar.
  * Implemented app-wide theme switching managed through React Context and Tailwind CSS classes.
* **Internationalization & Directionality (i18n):**
  * Added a language switcher supporting Arabic and English.
  * Configured dynamic document layout direction switching (RTL for Arabic, LTR for English).
* **Settings Interface:**
  * Created a dedicated Settings modal and page accessible via the navbar.
  * Provided user controls for theme selection, language preferences, and notification defaults.

### Identified Issues & Next Steps

The following UI and i18n items are scheduled for resolution in the upcoming update:

1. **Incomplete Localization Coverage:**
   * **Issue:** Language switching currently updates header components while leaving dropdown placeholders, search filter labels, and teacher cards partially in Arabic.
   * **Target:** Wrap all hardcoded UI strings with the `useTranslation()` hook for complete English coverage.

2. **Price Slider Container Alignment:**
   * **Issue:** The price range slider container and display badges experience layout shifts when toggling between RTL and LTR modes.
   * **Target:** Refactor the slider layout using CSS logical properties and explicit direction wrappers to ensure uniform alignment across locales.

3. **Dark Mode Typography Contrast:**
   * **Issue:** Specific headings—including the main Hero section title—retain hardcoded dark color variables, leading to poor contrast against dark backgrounds.
   * **Target:** Transition static Tailwind color classes to semantic, theme-aware tokens (`text-foreground`, `dark:text-white`).

### Demo Video (v1.3)

https://github.com/sheroukelshafiy-hash/sherlocation-egypt-connect/raw/main/public/%D8%A7%D9%84%D8%A7%D8%B5%D8%AF%D8%A7%D8%B1%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D8%AA%20(1).mp4

---
# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

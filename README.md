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

https://github.com/user-attachments/assets/17ec61ea-34dc-4631-9dc0-6b6f6426075a

---

# SherLocation
---
## [v1.2] - 2026-07-29

### New Features & Enhancements

#### Navigation & Header Updates
### SherLocation — Progress Update and UI/UX Enhancements

In this phase, the primary focus was on refining the overall UI and UX, ensuring cross-device responsiveness, and expanding the platform’s geographical coverage for all users.

**Key Improvements**

* **Mobile Responsiveness:** Optimized the layout and navigation for mobile devices and smaller screens, providing a seamless browsing experience across all device types.
* **Geographical Coverage Expansion:** Integrated all Egyptian governorates and resolved missing sub-centers and districts to ensure complete regional coverage for students seeking local tutors and centers.
* **Text Contrast and Readability:** Corrected background and text color contrast issues, particularly in the Hero section, ensuring high legibility and visual clarity.
* **Brand Identity Update:** Updated the primary header logo to the official English version, SherLocation, to strengthen brand recognition and align with standard tech conventions.
* **Search and Filtering Optimization:** Verified dynamic filtering functions, allowing users to efficiently search by governorate, district, academic level, subject, and session price.

<img width="505" height="267" alt="phone1" src="https://github.com/user-attachments/assets/39ba8008-1713-46b9-a066-991e0d4b7fcf" />

<img width="509" height="137" alt="phone" src="https://github.com/user-attachments/assets/a6760377-20fb-4ff6-86a2-66d5ad5b02a8" />

<img width="957" height="442" alt="Screenshot 2026-07-28 174304" src="https://github.com/user-attachments/assets/b7209099-2f1d-45b0-82dc-26d6217fe1fd" />


https://github.com/user-attachments/assets/f6af9cae-fce5-421b-87b9-21d6b3ff104c


  
# SherLocation
---
## [v1.1] - 2026-07-28

### New Features & Enhancements

#### Navigation & Header Updates
### SherLocation — Initial Version (v1.0) Overview

This video demonstrates the initial baseline state of the application interface and its core functionalities prior to any enhancements.


https://github.com/user-attachments/assets/53d18ecf-9f31-4611-b4b7-0ba4d6d8d05f

**Identified Issues and Limitations in Version 1.0**

* **Visual and Contrast:** Low contrast on the Hero section text, leading to poor legibility against light backgrounds.
* **Regional Data:** Incomplete list of Egyptian governorates and missing sub-centers or districts for localized search.
* **Branding:** Header logo displayed solely in Arabic text rather than the standardized English branding, SherLocation.
* **Responsiveness:** Suboptimal layout spacing and element wrapping on smaller mobile screen dimensions.

*Note: All identified issues and limitations have been fully addressed and resolved in subsequent UI and UX update commits.*


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

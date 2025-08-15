# TaxFlow Site

TaxFlow Site is a modern, cross-platform tax filing application built with Expo and React Native. It provides a seamless user experience across web, iOS, and Android platforms with a single codebase.

The app features a complete tax filing workflow including marketing pages, user onboarding, step-by-step tax preparation, document review, digital signatures, payment processing, and e-filing capabilities.

## 🚨 **IMPORTANT DISCLAIMER**

> **⚠️ FOR EDUCATIONAL PURPOSES ONLY ⚠️**
>
> This application is designed for **educational and demonstration purposes only**. The tax calculations, forms, and filing processes shown in this app should **NOT** be relied upon for actual tax preparation or filing.
>
> **Please note:**
> - This software may contain bugs, errors, or inaccuracies
> - Tax calculations are simplified and may not reflect actual tax law
> - No guarantee of accuracy or compliance with current tax regulations
> - Always consult a qualified tax professional for actual tax preparation
> - Use official IRS software or certified tax preparers for real tax filing
>
> The developers assume no responsibility for any financial or legal consequences resulting from the use of this software.

## 🌐 **Live Demo**

**🚀 [View Live Application](https://taxflow-demo.surge.sh)** - Try the full application experience online

**[📱 Video Walkthrough](https://drive.google.com/file/d/1iOOKJie-5RJkgbj5MVDXBztM0PFm6m0N/view?usp=sharing)** - See the app in action with a complete walkthrough of the tax filing process

## Features

### 📋 Tax Filing Workflow
- **Document Preview**: Interactive 1040 tax return preview
- **E-file Consent**: Secure authorization for electronic filing
- **Review & Submit**: Comprehensive return review with validation
- **Digital Signature**: Touch/click signature capture
- **Payment Processing**: Integrated checkout flow (ready for payment gateway)
- **Submission Tracking**: Real-time filing status and confirmation
- **Receipt Generation**: Downloadable filing receipts

### 🏠 Marketing & Support
- **Landing Page**: Modern, responsive home page
- **Pricing Plans**: Clear pricing tiers and feature comparison
- **Help Center**: Searchable support articles and FAQ system
- **Contact Support**: Multiple support channels

### 🎨 User Experience
- **Cross-Platform**: Identical experience on web, iOS, and Android
- **Responsive Design**: Optimized for all screen sizes
- **Type-Safe Navigation**: Expo Router with TypeScript integration
- **State Management**: Centralized app state with context providers
- **Error Handling**: Comprehensive error boundaries and user feedback

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Expo | 53.0.4 | Cross-platform development |
| **Runtime** | React Native | 0.79.1 | Native mobile runtime |
| **Web Runtime** | React Native Web | 0.20.0 | Web compatibility layer |
| **UI Library** | React | 19.0.0 | Component framework |
| **Language** | TypeScript | 5.8.3 | Type safety |
| **Styling** | NativeWind | 4.1.23 | Tailwind CSS for React Native |
| **Navigation** | Expo Router | 5.0.3 | File-based routing with type safety |
| **State Management** | Zustand | 5.0.3 | Lightweight state store |
| **Server State** | TanStack Query | 5.83.0 | Data fetching and caching |
| **Native Modules** | Expo Modules | Various | Camera, haptics, fonts, etc. |

## Prerequisites

- macOS, Linux, or Windows
- Bun 1.2+ (recommended) or Node.js 18+
  - Install Bun:
    ```bash
    curl -fsSL https://bun.sh/install | bash
    # then restart your shell or load it for this session
    export PATH="$HOME/.bun/bin:$PATH"
    ```
- For mobile:
  - iOS Simulator requires Xcode on macOS
  - Android Emulator requires Android Studio
  - Expo Go app on a device if testing on hardware

## Quick Start (Web)

1. **Clone and install dependencies:**
   ```bash
   export PATH="$HOME/.bun/bin:$PATH"
   git clone <your-repo-url>
   cd taxflow-site
   bun install
   ```

2. **Start the development server:**
   ```bash
   bun run start-web-dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:8081` to see the app running.

### Development Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Web (Debug)** | `bun run start-web-dev` | Web with verbose Expo logs |
| **Web (Standard)** | `bun run start-web` | Web without debug output |
| **Universal** | `bun run start` | Web + mobile with QR code |
| **Linting** | `bun run lint` | ESLint code analysis |

## Mobile Development

1. **Start the development server:**
   ```bash
   bun run start
   ```

2. **Choose your testing method:**

   **📱 Physical Device:**
   - Install [Expo Go](https://expo.dev/client) from the App Store/Play Store
   - Scan the QR code displayed in your terminal

   **🖥️ Simulators:**
   - **iOS**: Press `i` (requires Xcode on macOS)
   - **Android**: Press `a` (requires Android Studio)

   **🌐 Web Browser:**
   - Press `w` or visit `http://localhost:8081`

### Expo CLI Controls
| Key | Action | Requirements |
|-----|--------|--------------|
| `i` | Open iOS Simulator | macOS + Xcode |
| `a` | Open Android Emulator | Android Studio |
| `w` | Open in web browser | Any OS |
| `r` | Reload app | - |
| `m` | Toggle dev menu | - |
| `j` | Open debugger | - |
| `?` | Show all commands | - |

## NPM/Yarn alternative (optional)

If you prefer Node.js without Bun:
```bash
npm install # or yarn / pnpm
npx expo start --web --tunnel
```

## Project scripts

Defined in `package.json` → `scripts`:

- `start`: `bunx expo start --tunnel` (web + native entry; shows QR and CLI controls)
- `start-web`: `bunx expo start --web --tunnel` (web only)
- `start-web-dev`: `DEBUG=expo* bunx expo start --web --tunnel` (web with detailed logs)
- `lint`: `expo lint`

## Configuration

Key app settings are in `app.json`:
- `expo.name` and `expo.web.name`/`expo.web.shortName`: what the browser/tab will display
- `expo.ios.bundleIdentifier` and `expo.android.package`: application identifiers
- `expo.splash`, `expo.icon`, and `expo.web.favicon`: branding assets
- `plugins["expo-router"].origin`: origin used by Expo Router tooling

To change the app/browser title, edit:
```json
{
  "expo": {
    "name": "TaxFlow Site",
    "web": { "name": "TaxFlow Site", "shortName": "TaxFlow Site" }
  }
}
```

## Project Structure

```
taxflow-site/
├── app/                          # Expo Router file-based routing
│   ├── (tabs)/                   # Tab navigation layout
│   │   ├── (home)/              # Home page and marketing
│   │   ├── pricing/             # Pricing plans page
│   │   ├── support/             # Help center and FAQ
│   │   └── file/                # Tax filing workflow
│   │       ├── preview-1040.tsx # Tax form preview
│   │       ├── efile-consent.tsx# E-filing authorization
│   │       ├── review-submit.tsx# Final review step
│   │       ├── signature.tsx    # Digital signature capture
│   │       ├── payment.tsx      # Payment processing
│   │       ├── submit.tsx       # Filing submission
│   │       ├── success.tsx      # Success confirmation
│   │       └── receipt.tsx      # Filing receipt
│   ├── _layout.tsx              # Root layout wrapper
│   └── +not-found.tsx           # 404 error page
├── components/                   # Reusable UI components
│   ├── CTAButton.tsx            # Call-to-action buttons
│   ├── ErrorBoundary.tsx        # Error handling wrapper
│   ├── Hero.tsx                 # Landing page hero section
│   ├── FeatureCard.tsx          # Feature highlight cards
│   ├── Accordion.tsx            # Expandable content
│   └── ReturnStatusCard.tsx     # Tax return status display
├── contexts/                     # React Context providers
│   └── TaxReturnContext.tsx     # Global tax return state
├── constants/                    # App configuration
│   ├── colors.ts                # Color palette
│   └── stateTaxes.ts           # State tax information
├── assets/images/               # Static assets
├── mocks/                       # Mock data for development
└── app.json                     # Expo configuration
```

## Troubleshooting

### Common Issues

| Problem | Solution | Command |
|---------|----------|---------|
| **Bun not found** | Add Bun to PATH | `export PATH="$HOME/.bun/bin:$PATH"` |
| **Port 8081 in use** | Kill existing server | `pkill -f "expo start"` |
| **Stale cache** | Clear Metro cache | `bunx expo start -c` |
| **Dependency warnings** | Update to compatible versions | `bunx expo install` |
| **Module resolution** | Restart development server | `bunx expo start --clear` |

### Development Tips

- **Hot Reload**: Changes to most files will automatically refresh the app
- **Debug Mode**: Use `bun run start-web-dev` for detailed logs
- **Network Issues**: If QR code doesn't work, try the tunnel URL directly
- **Performance**: Use `--no-dev` flag for production-like testing

### Environment Requirements

- **Node.js**: 18+ (if not using Bun)
- **Bun**: 1.2+ (recommended for faster installs)
- **iOS**: Xcode 14+ on macOS for iOS Simulator
- **Android**: Android Studio with SDK 33+ for Android Emulator
- **Memory**: 4GB+ RAM recommended for smooth development

## Production Deployment

### 🚀 **Live Deployment**

The application is currently deployed and accessible at:
- **Production URL**: [https://taxflow-demo.surge.sh](https://taxflow-demo.surge.sh)
- **Hosting**: Surge.sh with global CDN
- **SSL**: HTTPS enabled with automatic certificate management

### 📋 **Deployment Options**

This app is ready for deployment to multiple platforms:

| Platform | Method | Best For | Cost |
|----------|--------|----------|------|
| **Surge.sh** | `surge . --domain your-domain.surge.sh` | Quick deployment | Free |
| **Vercel** | Connect GitHub repo at [vercel.com](https://vercel.com) | Professional features | Free tier |
| **Netlify** | Drag & drop at [netlify.com/drop](https://netlify.com/drop) | Easiest setup | Free tier |
| **GitHub Pages** | Enable in repository settings | GitHub integration | Free |

### 🔄 **Updating the Live Site**

To update the deployed application:

1. **Build for production:**
   ```bash
   bunx expo export -p web
   ```

2. **Deploy to Surge:**
   ```bash
   cd dist && surge . taxflow-demo.surge.sh
   ```

### 📱 **Mobile App Deployment**

- **Expo Application Services (EAS)**: Native app builds
- **App Store/Play Store**: Production mobile releases
- **Expo Go**: Development and testing builds

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Run linting: `bun run lint`
5. Submit a pull request

## License

This project is for demonstration purposes. Please ensure compliance with tax software regulations before production use.


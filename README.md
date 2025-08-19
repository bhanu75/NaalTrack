# 💧 NaalTrack - Water Supply Reminder

[![Vercel](https://img.shields.io/badge/vercel-deployed-green)](https://naal-track.vercel.app)
[![React](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.3.3-06B6D4)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> Smart water supply reminder for every households. Never miss your alternate-day water supply schedule.

## 🏠 About

NaalTrack (नाल = tap/pipe in Hindi) helps households in Udaipur track their government water supply schedule. With alternate-day water supply being the norm, this app ensures you never miss filling your tanks.

## ✨ Features

- 📅 **Smart Scheduling**: Set your last supply date once, get automatic calculations
- 📱 **Mobile-First**: Optimized for smartphones with responsive design
- 🌙 **Dark Mode**: Easy on the eyes, perfect for any time of day
- 📊 **Multiple Views**: Home dashboard, calendar view, and upcoming list
- 💾 **Offline Storage**: Your data persists using localStorage
- 🔔 **Browser Notifications**: Get reminded of upcoming supply days
- ⚡ **Lightning Fast**: Built with Vite for instant loading

## 🚀 Live Demo

Visit: [naal-track.vercel.app](https://naal-track.vercel.app)

## 📱 Screenshots

| Home View | Calendar View | Dark Mode |
|-----------|---------------|-----------|
| Clean dashboard showing next supply date | Monthly calendar with highlighted supply days | Beautiful dark theme |

## 🛠 Tech Stack

- **Frontend**: React 18 with hooks
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel
- **Storage**: Browser localStorage

## 🔧 Installation & Setup

### Prerequisites

- Node.js 16+ and npm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/naaltrack.git
cd naaltrack

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

No environment variables required for basic functionality.

## 📂 Project Structure

```
naaltrack/
├── public/
│   ├── naal-icon.svg      # App icon
│   └── manifest.json      # PWA manifest
├── src/
│   ├── App.jsx            # Main component
│   ├── main.jsx           # React entry point
│   └── index.css          # Tailwind CSS
├── index.html             # HTML template
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎯 Usage

### Setting Up Your Schedule

1. Open the app on your mobile device
2. Set your "Last Water Supply Date" using the date picker
3. The app automatically calculates your complete schedule

### Viewing Your Schedule

- **Home**: Quick overview of next supply date
- **Calendar**: Monthly view with all supply days highlighted
- **Upcoming**: List of next 7 supply dates

### Features

- **Auto-Save**: Your date is saved automatically
- **Dark Mode**: Toggle with the moon/sun icon
- **Notifications**: Enable browser notifications for reminders

## 🔄 How It Works

NaalTrack uses a simple alternate-day calculation:

- Input: Last water supply date
- Logic: Next supply = Last supply + 2 days
- Pattern: Every alternate day from your last supply

The app handles month boundaries, leap years, and displays accurate schedules for any time period.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy automatically on every push

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
# Or connect GitHub repository for auto-deployment
```

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization

#### Colors
Modify `tailwind.config.js` to change the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      'naal-blue': {
        500: '#your-color',
        // ... other shades
      }
    }
  }
}
```

#### Features
- Add new views by extending the navigation system
- Implement push notifications using service workers
- Add data export/import functionality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Udaipur community
- Inspired by real water supply challenges
- Icons by [Lucide](https://lucide.dev/)
- Deployed with [Vercel](https://vercel.com/)

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/naaltrack/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/naaltrack/discussions)
- 📧 **Contact**: your-email@example.com

## 🔮 Roadmap

- [ ] Push notifications via service worker
- [ ] Data backup and sync
- [ ] Multiple location support
- [ ] Usage analytics dashboard
- [ ] Community features for neighborhoods
- [ ] WhatsApp integration for reminders

---

**Made with ❤️ for Udaipur households**

*Keep your tanks full, keep your family happy!* 💧

# Pomodoro Timer

A simple, clean Pomodoro Timer web application built with vanilla HTML, CSS, and JavaScript. Features customizable work and break intervals, persistent settings, and keyboard shortcuts.

## Features

- **Timer Display**: Large, readable countdown timer (MM:SS format)
- **Start/Pause/Reset**: Easy-to-use timer controls
- **Customizable Intervals**: 
  - Work Session: 1-60 minutes (default: 25 min)
  - Short Break: 1-30 minutes (default: 5 min)
  - Long Break: 1-60 minutes (default: 15 min)
- **Visual Mode Indicator**: Shows current session type (Work/Break)
- **Settings Modal**: Clean interface for customizing timer durations
- **Persistent Settings**: Your preferences are saved locally
- **Audio Notification**: Simple beep sound when timer completes
- **Keyboard Shortcuts**: 
  - `Space`: Start/Pause timer
  - `R`: Reset timer
  - `S`: Open settings
  - `Escape`: Close settings modal
- **Browser Tab Updates**: Timer shows in browser tab title

## Setup and Usage

### Local Development

1. Clone or download the project files
2. Open `index.html` in any modern web browser
3. Start using the timer immediately!

No build tools, dependencies, or server required.

### GitHub Pages Deployment

1. Upload all files (`index.html`, `style.css`, `script.js`, `README.md`) to your GitHub repository
2. Go to your repository Settings → Pages
3. Select source branch (usually `main` or `master`)
4. Your timer will be available at: `https://yourusername.github.io/repositoryname`

### Other Static Hosting

This application works with any static hosting service:
- Netlify: Drag and drop the project folder
- Vercel: Import from GitHub or upload files
- GitHub Pages: As described above
- Any web server: Upload files to public directory

## Customization

### Through the UI

1. Click the ⚙️ settings button
2. Adjust timer durations as needed
3. Click "Save Settings" to persist changes
4. Use "Reset to Defaults" to restore original values (25/5/15 minutes)

### Through Code

To modify default settings, edit the `defaultSettings` object in `script.js`:

```javascript
this.defaultSettings = {
    work: 25,        // Work session minutes
    shortBreak: 5,   // Short break minutes  
    longBreak: 15    // Long break minutes
};
```

### Styling

The application uses CSS custom properties for easy theming. Modify the `:root` variables in `style.css`:

```css
:root {
    --primary-color: #4a90e2;     /* Main accent color */
    --work-color: #e74c3c;        /* Work session color */
    --break-color: #27ae60;       /* Break session color */
    /* ... other variables ... */
}
```

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (recent versions)
- Requires JavaScript enabled
- Web Audio API for notification sounds (graceful fallback if unavailable)

## File Structure

```
pomodoro/
├── index.html      # Main HTML structure
├── style.css       # All styling and responsive design
├── script.js       # Timer logic and functionality
├── README.md       # This file
└── CLAUDE.md       # Development guidance for Claude Code
```

## License

This project is open source and available under the MIT License.
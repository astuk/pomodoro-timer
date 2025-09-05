// Pomodoro Timer Application
class PomodoroTimer {
    constructor() {
        // Default settings
        this.defaultSettings = {
            work: 25,
            shortBreak: 5,
            longBreak: 15
        };
        
        // Load settings from localStorage or use defaults
        this.settings = this.loadSettings();
        
        // Timer state
        this.currentMode = 'work';
        this.timeRemaining = this.settings.work * 60; // Convert to seconds
        this.isRunning = false;
        this.intervalId = null;
        
        // DOM elements
        this.initializeElements();
        
        // Event listeners
        this.bindEvents();
        
        // Initialize display
        this.updateDisplay();
        this.updateModeIndicator();
    }
    
    // Initialize DOM element references
    initializeElements() {
        this.timerElement = document.getElementById('timer');
        this.startPauseBtn = document.getElementById('start-pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.settingsBtn = document.getElementById('settings-btn');
        this.currentModeElement = document.getElementById('current-mode');
        
        // Modal elements
        this.modal = document.getElementById('settings-modal');
        this.modalBackdrop = document.querySelector('.modal-backdrop');
        this.closeModalBtn = document.getElementById('close-modal');
        this.saveSettingsBtn = document.getElementById('save-settings');
        this.resetDefaultsBtn = document.getElementById('reset-defaults');
        
        // Form inputs
        this.workDurationInput = document.getElementById('work-duration');
        this.shortBreakDurationInput = document.getElementById('short-break-duration');
        this.longBreakDurationInput = document.getElementById('long-break-duration');
    }
    
    // Bind event listeners
    bindEvents() {
        this.startPauseBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        
        // Modal events
        this.closeModalBtn.addEventListener('click', () => this.closeSettings());
        this.modalBackdrop.addEventListener('click', () => this.closeSettings());
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.resetDefaultsBtn.addEventListener('click', () => this.resetToDefaults());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Prevent modal close when clicking inside modal content
        document.querySelector('.modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Handle keyboard shortcuts
    handleKeydown(event) {
        // Only handle shortcuts when modal is not open
        if (this.modal.classList.contains('show')) {
            if (event.key === 'Escape') {
                this.closeSettings();
            }
            return;
        }
        
        switch (event.key) {
            case ' ': // Space for start/pause
                event.preventDefault();
                this.toggleTimer();
                break;
            case 'r':
            case 'R':
                this.resetTimer();
                break;
            case 's':
            case 'S':
                this.openSettings();
                break;
        }
    }
    
    // Load settings from localStorage
    loadSettings() {
        const stored = localStorage.getItem('pomodoroSettings');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        }
        return { ...this.defaultSettings };
    }
    
    // Save settings to localStorage
    saveSettingsToStorage() {
        localStorage.setItem('pomodoroSettings', JSON.stringify(this.settings));
    }
    
    // Toggle timer start/pause
    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }
    
    // Start the timer
    startTimer() {
        this.isRunning = true;
        this.startPauseBtn.textContent = 'Pause';
        
        this.intervalId = setInterval(() => {
            this.timeRemaining--;
            this.updateDisplay();
            this.updateDocumentTitle();
            
            if (this.timeRemaining <= 0) {
                this.completeTimer();
            }
        }, 1000);
    }
    
    // Pause the timer
    pauseTimer() {
        this.isRunning = false;
        this.startPauseBtn.textContent = 'Start';
        clearInterval(this.intervalId);
        this.resetDocumentTitle();
    }
    
    // Reset timer to current mode's default duration
    resetTimer() {
        this.pauseTimer();
        this.timeRemaining = this.getModeDuration(this.currentMode) * 60;
        this.updateDisplay();
        this.resetDocumentTitle();
    }
    
    // Handle timer completion
    completeTimer() {
        this.pauseTimer();
        this.playNotificationSound();
        this.showCompletionMessage();
        
        // Auto-switch to break mode (simplified - just toggle between work and short break)
        if (this.currentMode === 'work') {
            this.switchMode('shortBreak');
        } else {
            this.switchMode('work');
        }
    }
    
    // Switch timer mode
    switchMode(mode) {
        this.currentMode = mode;
        this.timeRemaining = this.getModeDuration(mode) * 60;
        this.updateDisplay();
        this.updateModeIndicator();
    }
    
    // Get duration for a specific mode
    getModeDuration(mode) {
        switch (mode) {
            case 'work':
                return this.settings.work;
            case 'shortBreak':
                return this.settings.shortBreak;
            case 'longBreak':
                return this.settings.longBreak;
            default:
                return this.settings.work;
        }
    }
    
    // Update timer display
    updateDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        this.timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Update mode indicator
    updateModeIndicator() {
        let modeText;
        const indicator = this.currentModeElement.parentElement;
        
        switch (this.currentMode) {
            case 'work':
                modeText = 'Work Session';
                indicator.classList.remove('break');
                break;
            case 'shortBreak':
                modeText = 'Short Break';
                indicator.classList.add('break');
                break;
            case 'longBreak':
                modeText = 'Long Break';
                indicator.classList.add('break');
                break;
            default:
                modeText = 'Work Session';
                indicator.classList.remove('break');
        }
        
        this.currentModeElement.textContent = modeText;
    }
    
    // Update browser tab title with timer
    updateDocumentTitle() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const mode = this.currentMode === 'work' ? 'Work' : 'Break';
        document.title = `${timeString} - ${mode} | Pomodoro Timer`;
    }
    
    // Reset document title
    resetDocumentTitle() {
        document.title = 'Pomodoro Timer';
    }
    
    // Play notification sound
    playNotificationSound() {
        // Create a simple beep using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Audio notification not available:', error);
        }
    }
    
    // Show completion message
    showCompletionMessage() {
        const mode = this.currentMode === 'work' ? 'Work session' : 'Break';
        alert(`${mode} completed! Time for a ${this.currentMode === 'work' ? 'break' : 'work session'}.`);
    }
    
    // Open settings modal
    openSettings() {
        this.populateSettingsForm();
        this.modal.classList.add('show');
        this.modal.setAttribute('aria-hidden', 'false');
        this.workDurationInput.focus();
    }
    
    // Close settings modal
    closeSettings() {
        this.modal.classList.remove('show');
        this.modal.setAttribute('aria-hidden', 'true');
    }
    
    // Populate settings form with current values
    populateSettingsForm() {
        this.workDurationInput.value = this.settings.work;
        this.shortBreakDurationInput.value = this.settings.shortBreak;
        this.longBreakDurationInput.value = this.settings.longBreak;
    }
    
    // Save settings from form
    saveSettings() {
        const newSettings = {
            work: parseInt(this.workDurationInput.value) || this.defaultSettings.work,
            shortBreak: parseInt(this.shortBreakDurationInput.value) || this.defaultSettings.shortBreak,
            longBreak: parseInt(this.longBreakDurationInput.value) || this.defaultSettings.longBreak
        };
        
        // Validate ranges
        newSettings.work = Math.max(1, Math.min(60, newSettings.work));
        newSettings.shortBreak = Math.max(1, Math.min(30, newSettings.shortBreak));
        newSettings.longBreak = Math.max(1, Math.min(60, newSettings.longBreak));
        
        this.settings = newSettings;
        this.saveSettingsToStorage();
        
        // Reset current timer if not running
        if (!this.isRunning) {
            this.timeRemaining = this.getModeDuration(this.currentMode) * 60;
            this.updateDisplay();
        }
        
        this.closeSettings();
    }
    
    // Reset settings to defaults
    resetToDefaults() {
        this.workDurationInput.value = this.defaultSettings.work;
        this.shortBreakDurationInput.value = this.defaultSettings.shortBreak;
        this.longBreakDurationInput.value = this.defaultSettings.longBreak;
    }
}

// Initialize the timer when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});
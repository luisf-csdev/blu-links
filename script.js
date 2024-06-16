const THEME_KEY = '@devlinks:theme-state-1.0.0'

const PREFERS_THEME_DARK = '(prefers-color-scheme: dark)'

function getCurrentTheme() {
  const rootClassList = document.documentElement.classList
  return rootClassList.contains('light') ? 'light' : 'dark'
}

function toggleTheme() {
  const rootClassList = document.documentElement.classList
  rootClassList.toggle('light')
}

function handleThemeToggle() {
  toggleTheme()

  const currentTheme = getCurrentTheme()
  localStorage.setItem(THEME_KEY, currentTheme)
}

function getSystemTheme() {
  if (!window.matchMedia) {
    return
  }

  const isDark = window.matchMedia(PREFERS_THEME_DARK).matches
  return isDark ? 'dark' : 'light'
}

function setInitialTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY)
  const theme = storedTheme || getSystemTheme()

  if (theme !== 'light') {
    return
  }

  toggleTheme()
}

function setCurrentThemeToSystemTheme(isDarkEvent) {
  const storedTheme = localStorage.getItem(THEME_KEY)
  if (storedTheme) {
    return
  }

  const systemTheme = isDarkEvent.matches ? 'dark' : 'light'
  const currentTheme = getCurrentTheme()

  if (currentTheme === systemTheme) {
    return
  }

  toggleTheme()
}

function setAutoThemeToggle() {
  const prefersDark = window.matchMedia(PREFERS_THEME_DARK)
  prefersDark.addEventListener('change', setCurrentThemeToSystemTheme)
}

function setThemeSettings() {
  setInitialTheme()
  setAutoThemeToggle()
}

setThemeSettings()

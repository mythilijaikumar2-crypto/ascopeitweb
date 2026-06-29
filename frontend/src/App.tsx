import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AppRouter } from './routes'
import { LoadingScreen } from './components/common/LoadingScreen'
import { AnimatePresence } from 'framer-motion'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <AppRouter key="app" />
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App

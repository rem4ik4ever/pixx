import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <>
      {theme === 'dark' && <button onClick={() => setTheme('light')}><SunIcon className='w-6 h-6 text-primary' /></button>}
      {theme === 'light' && <button onClick={() => setTheme('dark')}><MoonIcon className='w-6 h-6 text-primary' /></button>}
    </>
  )
}

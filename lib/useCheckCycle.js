'use client'

import { useState, useEffect, createContext, useContext } from 'react'

const CheckCycleContext = createContext()

const CHECK_INTERVAL = 8 // seconds between checks

export function CheckCycleProvider({ children }) {
  const [secondsSinceCheck, setSecondsSinceCheck] = useState(0)
  const [checkCount, setCheckCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsSinceCheck(prev => {
        if (prev >= CHECK_INTERVAL - 1) {
          // Trigger check
          setCheckCount(c => c + 1)
          return 0
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <CheckCycleContext.Provider value={{ secondsSinceCheck, checkCount }}>
      {children}
    </CheckCycleContext.Provider>
  )
}

export const useCheckCycle = () => useContext(CheckCycleContext)

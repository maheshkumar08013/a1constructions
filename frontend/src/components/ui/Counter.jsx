import React, { useState, useEffect, useRef } from 'react'

export default function Counter({ targetValue, duration = 2000, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)
  const hasAnimated = useRef(false)

  // Extract numeric value from string like "12+", "₹500Cr+", "100+"
  const extractNumber = (value) => {
    if (typeof value === 'number') return value
    return parseInt(value.toString().replace(/[^\d]/g, ''), 10) || 0
  }

  const numericTarget = extractNumber(targetValue)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime = null
    let animationFrameId

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const currentCount = Math.floor(progress * numericTarget)
      setCount(currentCount)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(numericTarget)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isVisible, duration, numericTarget])

  // Format the display value
  let displayValue = count.toString()
  
  // Add formatting for large numbers
  if (numericTarget >= 1000) {
    if (targetValue.toString().includes('Cr')) {
      displayValue = `${count}Cr`
    }
  }

  // Add the suffix
  if (targetValue.toString().includes('+')) {
    displayValue += '+'
  }

  return (
    <div ref={elementRef} className="font-montserrat font-black text-white text-xl sm:text-[22px] leading-none">
      {prefix}{displayValue}{suffix}
    </div>
  )
}

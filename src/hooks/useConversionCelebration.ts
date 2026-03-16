import { useCallback } from 'react'
import { toast } from '@/hooks/use-toast'

const CONFETTI_COLORS = ['#732f37', '#375d8a', '#095256', '#b89a5a', '#2d7a4f', '#efdfbb']

export function useConversionCelebration() {
  const celebrate = useCallback((companyName: string, dealValue: number) => {
    // Confetti
    for (let i = 0; i < 70; i++) {
      const el = document.createElement('div')
      const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
      const size = 6 + Math.random() * 6
      const isCircle = Math.random() > 0.5
      el.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -10px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${isCircle ? '50%' : '2px'};
        pointer-events: none;
        z-index: 9999;
        animation: confetti-fall ${1.5 + Math.random() * 2}s linear ${Math.random() * 0.5}s forwards;
      `
      document.body.appendChild(el)
      el.addEventListener('animationend', () => el.remove())
    }

    // Inject keyframes once
    if (!document.getElementById('confetti-styles')) {
      const style = document.createElement('style')
      style.id = 'confetti-styles'
      style.textContent = `
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }

    // Toast
    toast({
      title: `🎉 ${companyName || 'Lead'} converted!`,
      description: `£${dealValue.toLocaleString()}/mo added to MRR.`,
    })
  }, [])

  return { celebrate }
}

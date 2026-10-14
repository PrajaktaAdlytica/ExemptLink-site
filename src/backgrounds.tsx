import { createRoot } from 'react-dom/client'
import { GradientBackground } from '@/components/ui/jade-sky'
import '@/styles/globals.css'
// A decorative React island keeps the existing static routes, forms and demo intact.
// The parent is absolutely positioned; the supplied component fills it unchanged.
document.querySelectorAll<HTMLElement>('[data-jade-sky]').forEach(host=>{
 createRoot(host).render(<GradientBackground className="jade-gradient-background h-full w-full" />)
})

import { useState, useRef, useEffect, useCallback } from 'react'
import css from './t03_characters.module.css'

const CAROUSEL_INTERVAL = 10000

export default function ImageSelector({ char }) {
    const imgs        = Object.values(char.imgs ?? {})
    const [activeIdx, setActiveIdx] = useState(0)
    const [open,      setOpen]      = useState(true)
    const [hovering,  setHovering]  = useState(false)
    const [isLocked,  setIsLocked]  = useState(false)
    const intervalRef = useRef(null)
    const stripRef    = useRef(null)
    const thumbRefs   = useRef([])

    // Reset on char change
    useEffect(() => { setActiveIdx(0) }, [char])

    // Scroll active thumb into view WITHIN the strip only — no page scroll
    useEffect(() => {
        const thumb = thumbRefs.current[activeIdx]
        const strip = stripRef.current
        if (thumb && strip) {
            const thumbLeft  = thumb.offsetLeft
            const thumbRight = thumbLeft + thumb.offsetWidth
            const stripLeft  = strip.scrollLeft
            const stripRight = stripLeft + strip.offsetWidth
            if (thumbLeft < stripLeft) {
                strip.scrollLeft = thumbLeft - 6
            } else if (thumbRight > stripRight) {
                strip.scrollLeft = thumbRight - strip.offsetWidth + 6
            }
        }
    }, [activeIdx])

    // Auto-advance timer
    const startTimer = useCallback(() => {
        if (imgs.length <= 1) return
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() =>
            setActiveIdx(p => (p + 1) % imgs.length), CAROUSEL_INTERVAL)
    }, [imgs.length])

    useEffect(() => {
        if (hovering || isLocked) { clearInterval(intervalRef.current); return }
        startTimer()
        return () => clearInterval(intervalRef.current)
    }, [hovering, isLocked, startTimer])

    // Nav helpers
    const prev = (e) => {
        if (e) e.stopPropagation()
        clearInterval(intervalRef.current)
        setActiveIdx(p => (p - 1 + imgs.length) % imgs.length)
        startTimer()
    }
    const next = (e) => {
        if (e) e.stopPropagation()
        clearInterval(intervalRef.current)
        setActiveIdx(p => (p + 1) % imgs.length)
        startTimer()
    }
    const selectThumb = (i, e) => {
        if (e) e.stopPropagation()
        clearInterval(intervalRef.current)
        setActiveIdx(i)
        startTimer()
    }

    const mainImg = imgs[activeIdx] ?? null

    return (
        <div className={`${css.portraitPanel} ${open ? css.portraitPanelOpen : css.portraitPanelClosed}`}>

            {/* Lock toggle */}
            <button
                className={`${css.portraitToggle} ${isLocked ? css.lockBtnActive : ''}`}
                onClick={(e) => {
                    e.stopPropagation()
                    setIsLocked(l => !l)
                }}
                title={isLocked ? 'Destravar transição' : 'Travar transição'}
            >
                {isLocked ? '🔒' : '🔓'}
            </button>

            {/* Main portrait */}
            <div
                className={css.portrait}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onClick={() => setOpen(o => !o)}
                style={{ cursor: 'pointer' }}
            >
                {mainImg
                    ? <img src={mainImg} alt={char.name} />
                    : <div className={css.portraitPlaceholder} style={{ '--ph': char.color }}>
                        <span>?</span>
                      </div>
                }

                {char.badgeText && open && (
                    <div className={`${css.relationStatus} ${css['status_' + (char.badgeColor || 'blue')]}`} style={{ bottom: '12px' }}>
                        {char.badgeText}
                    </div>
                )}
            </div>

            {/* Carousel strip — shown when >= 1 image and open */}
            {open && imgs.length >= 1 && (
                <div className={css.portraitStripWrapper}>
                    <button className={css.portraitArrow} onClick={prev} aria-label="Prev">&#8249;</button>

                    <nav className={css.portraitStrip} ref={stripRef}>
                        {imgs.map((img, i) => (
                            <img
                                key={i}
                                ref={el => thumbRefs.current[i] = el}
                                className={`${css.portraitThumb} ${i === activeIdx ? css.portraitThumbActive : ''}`}
                                src={img} alt=""
                                onClick={(e) => selectThumb(i, e)}
                            />
                        ))}
                    </nav>

                    <button className={css.portraitArrow} onClick={next} aria-label="Next">&#8250;</button>
                </div>
            )}
        </div>
    )
}

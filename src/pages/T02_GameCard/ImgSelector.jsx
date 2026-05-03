import { useState, useEffect, useRef, useCallback } from "react";
import css from "./t02_gamecard.module.css";

const CAROUSEL_INTERVAL = 10000;

export default function ImgSelector({ selectedGame, onImageChange, onOpenLightbox }) {
    const imgs = Object.values(selectedGame.imgs ?? {})
    const [activeIdx, setActiveIdx] = useState(0)
    const [hovering, setHovering] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const intervalRef = useRef(null)
    const stripRef = useRef(null)
    const thumbRefs = useRef([])

    // Reset index when game changes
    useEffect(() => {
        setActiveIdx(0)
    }, [selectedGame])

    // Update parent's state with the active image
    useEffect(() => {
        if (onImageChange) {
            onImageChange(imgs[activeIdx])
        }
    }, [activeIdx, imgs, onImageChange])

    const startTimer = useCallback(() => {
        if (imgs.length <= 1) return
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setActiveIdx(prev => (prev + 1) % imgs.length)
        }, CAROUSEL_INTERVAL)
    }, [imgs.length])

    useEffect(() => {
        if (hovering || isLocked) {
            clearInterval(intervalRef.current)
        } else {
            startTimer()
        }
        return () => clearInterval(intervalRef.current)
    }, [hovering, isLocked, startTimer])

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

    const prev = () => {
        clearInterval(intervalRef.current)
        setActiveIdx(prev => (prev - 1 + imgs.length) % imgs.length)
        startTimer()
    }

    const next = () => {
        clearInterval(intervalRef.current)
        setActiveIdx(prev => (prev + 1) % imgs.length)
        startTimer()
    }

    const selectThumb = (i) => {
        clearInterval(intervalRef.current)
        setActiveIdx(i)
        startTimer()
    }

    const mainImg = imgs[activeIdx]

    return (
        <section
            className={css.leftSection}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <div className={css.mainCover} onClick={onOpenLightbox} title="Click to expand">
                { mainImg
                    ? <img src={mainImg} alt={selectedGame.title} />
                    : <span className={css.coverPlaceholder}>?</span>
                }
                <div className={css.expandHint}>⛶</div>
                <button
                    className={`${css.lockBtn} ${isLocked ? css.lockBtnActive : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsLocked(l => !l);
                    }}
                    title={isLocked ? 'Destravar transição' : 'Travar transição'}
                    style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(0,0,0,0.6)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        color: '#fff',
                        padding: '4px 6px',
                        cursor: 'pointer',
                        zIndex: 20,
                        fontSize: '0.8rem',
                    }}
                >
                    {isLocked ? '🔒' : '🔓'}
                </button>
            </div>

            <div className={css.stripWrapper}>
                <button className={css.stripArrow} onClick={prev} aria-label="Previous">‹</button>

                <nav className={css.imageStrip} ref={stripRef}>
                    { imgs.map((img, i) =>
                        <img
                            key={i}
                            ref={el => thumbRefs.current[i] = el}
                            className={`${css.stripThumb} ${i === activeIdx ? css.stripThumbActive : ''}`}
                            src={img}
                            alt=""
                            onClick={() => selectThumb(i)}
                        />
                    )}
                </nav>

                <button className={css.stripArrow} onClick={next} aria-label="Next">›</button>
            </div>
        </section>
    )
}
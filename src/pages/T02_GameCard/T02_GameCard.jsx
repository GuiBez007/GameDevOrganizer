// Styles import //
import css from "./t02_gamecard.module.css"

import GameSelector from "./GameSelector.jsx";
import ImgSelector from "./ImgSelector.jsx";
import T03_Characters from "../T03_Characters/T03_Characters.jsx";
import T04_JornadaCompleta from "../T04_JornadaCompleta/T04_JornadaCompleta.jsx";
import T05_GameAreas from "../T05_GameAreas/T05_GameAreas.jsx";
import T06_Monsters from "../T06_Monsters/T06_Monsters.jsx";

// React import //
import { useState, useEffect, useRef, useCallback } from "react";


// ── Placeholder sub-page component ──────────────────────────────────────────
function SubPage({ name, onClose }) {
    return (
        <div className={css.subPage}>
            <div className={css.subPageHeader}>
                <span className={css.subPageTitle}>{name}</span>
                <button className={css.subPageClose} onClick={onClose} aria-label="Close">✕</button>
            </div>
            <div className={css.subPageBody}>
                <p style={{ color: '#000', fontWeight: 600, fontSize: '1rem' }}>{name}</p>
            </div>
        </div>
    )
}


function T02_GameCard({gameObj, setModal}) {

    const [selectedGame, setGame] = useState(gameObj.game_1)

    // ── Sidebar state ───────────────────────────────
    const [sidebarOpen,   setSidebarOpen]   = useState(true)   // toggle show/hide
    const [sidebarLocked, setSidebarLocked] = useState(true)  // lock: never auto-hide

    // ── Active nav button + rendered sub-page ──────
    const [activeNav, setActiveNav] = useState('S1_jornada_completa')  // 'S1_jornada_completa' selected by default

    // ── Extracted Carousel state ───────────────────
    const [mainImg, setMainImg] = useState(null)
    const [expanded, setExpanded] = useState(false)

    // Select a game — auto-close sidebar unless locked
    const handleSelectGame = (game) => {
        setGame(game)
        if (!sidebarLocked) setSidebarOpen(false)
    }

    // ── Nav buttons config ──────────────────────────
    const navButtons = [
        { id: 'S1_jornada_completa',   label: 'Jornada Completa' },
        { id: 'S2_areas_do_jogo',      label: 'Áreas do Jogo' },
        { id: 'S3_monstros_criaturas', label: 'Monstros & Criaturas' },
        { id: 'S4_personagens_chefes', label: 'Personagens & Chefes' },
    ]

    const handleNavClick = (id) => {
        setActiveNav(prev => prev === id ? null : id)
    }

    // ── Lightbox ────────────────────────────────────
    const openLightbox  = () => setExpanded(true)
    const closeLightbox = () => setExpanded(false)

    useEffect(() => {
        if (!expanded) return
        const handler = (e) => { if (e.key === 'Escape') closeLightbox() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [expanded])


    return (<>

    {/* ── Outer wrapper (constrains to max-width 1366) ── */}
    <div className={css.cardWrapper}>

        {/* ══════════════ MAIN CARD ════════════════ */}
        <div className={css.modal}>

            {/* ── TOP: Nav buttons bar ── */}
            <div className={css.topBar}>

                {/* Nav buttons + centered title */}
                <div className={css.navArea}>
                    <span className={css.navTitle}>{selectedGame.title}</span>
                    <div className={css.navButtons}>
                        {navButtons.map(btn => (
                            <button
                                key={btn.id}
                                className={`${css.navBtn} ${activeNav === btn.id ? css.navBtnActive : ''} ${btn.action ? css.navBtnAction : ''}`}
                                onClick={() => btn.action ? btn.action() : handleNavClick(btn.id)}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Close modal */}
                <button className={css.closeBtn} onClick={() => setModal(null)} title="Fechar">✕</button>

            </div>

            {/* ── BODY: Left | Center | Right(sidebar) ── */}
            <div className={css.body}>

                {/* ── Sidebar edge tab: TOGGLE ONLY (lock is inside sidebar header) ── */}
                <div className={`${css.sidebarEdge} ${sidebarOpen ? css.sidebarEdgeOpen : ''}`}>
                    <button
                        className={css.edgeBtn}
                        onClick={() => setSidebarOpen(o => !o)}
                        title={sidebarOpen ? 'Esconder sidebar' : 'Mostrar sidebar'}
                    >{sidebarOpen ? '›' : '‹'}</button>
                </div>

                {/* ── Left: cover + image strip ── */}
                <ImgSelector
                    selectedGame={selectedGame}
                    onImageChange={setMainImg}
                    onOpenLightbox={openLightbox}
                />

                {/* ── Center: info panels + action buttons ── */}
                <section className={css.centerSection}>

                    {/* Description box */}
                    <fieldset className={css.infoBox}>
                        <legend className={css.infoLegend}>Sinopse</legend>
                        <p className={css.synopsis}>{selectedGame.synopsis}</p>
                    </fieldset>

                    {/* Other info box */}
                    <fieldset className={css.infoBox}>
                        <legend className={css.infoLegend}>Outras Informações</legend>
                        <p className={css.otherInfo}>Tenho que pensar...<br/><span style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>(tenho que pensar)</span></p>
                    </fieldset>

                </section>

                {/* ── Right: chapter sidebar ── */}
                <GameSelector
                    gameObj={gameObj}
                    setGame={handleSelectGame}
                    selectedGame={selectedGame}
                    isOpen={sidebarOpen}
                    isLocked={sidebarLocked}
                    onLockToggle={() => setSidebarLocked(l => !l)}
                />

            </div>{/* /body */}

        </div>{/* /modal */}

        {/* ══════════ SUB-PAGE (rendered below card) ══════════ */}
        { activeNav && (
            activeNav === 'S4_personagens_chefes'
                ? <T03_Characters
                    key="personagens"
                    gameObj={selectedGame}
                    onClose={() => setActiveNav(null)}
                  />
                : activeNav === 'S1_jornada_completa'
                    ? <T04_JornadaCompleta
                        key="jornada"
                        gameObj={selectedGame}
                        onClose={() => setActiveNav(null)}
                      />
                : activeNav === 'S2_areas_do_jogo'
                    ? <T05_GameAreas
                        key="areas"
                        gameObj={selectedGame}
                        onClose={() => setActiveNav(null)}
                      />
                : activeNav === 'S3_monstros_criaturas'
                    ? <T06_Monsters
                        key="monsters"
                        gameObj={selectedGame}
                        onClose={() => setActiveNav(null)}
                      />
                    : <SubPage
                        key={activeNav}
                        name={navButtons.find(b => b.id === activeNav)?.label ?? activeNav}
                        onClose={() => setActiveNav(null)}
                      />
        )}

    </div>{/* /cardWrapper */}

    {/* ── Expanded lightbox ── */}
    { expanded &&
        <div className={css.lightbox} onClick={closeLightbox}>

            <div className={css.lightboxFrame} onClick={(e) => e.stopPropagation()}>
                <img
                    className={css.lightboxImg}
                    src={mainImg}
                    alt={selectedGame.title}
                />

                <div className={css.lightboxOverlay}>
                    <h2 className={css.lightboxTitle}>{selectedGame.title}</h2>
                    <p  className={css.lightboxSynopsis}>{selectedGame.synopsis}</p>
                </div>
            </div>

            <button className={css.lightboxClose} onClick={closeLightbox}>✕</button>

        </div>
    }

    </>)
}
export default T02_GameCard;

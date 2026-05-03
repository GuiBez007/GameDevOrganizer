import React, { useState, useEffect } from 'react'
import css from './t03_characters.module.css'
import CharacterSelector from './CharacterSelector.jsx'
import ImageSelector from './ImageSelector.jsx'
import T03_Character_Abilities from './T03_Character_Abilities.jsx'
import T03_Character_Relations from './T03_Character_Relations.jsx'
import T03_Character_Trajectory from './T03_Character_Trajectory.jsx'

// ── Placeholder data ──────────────────────────────────────────────────────────
const SAMPLE_CHARS = [
    {
        id: 'char_1', name: 'Personagem 1', color: '#c070c0',
        relevancia: 'principal',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nostrum deleniti ex assumenda impedit reprehenderit magnam iure sint laborum repudiandae sapiente fugit at itaque illum tenetur nobis odio dolorem.',
        placesCount: 3, introScene: 'Capítulo I', exitScene: 'Capítulo III',
        image: null, imgs: {},
        content: [
            {
                type: 'normal',
                title: 'Nome do lugar',
                text: 'Aqui fica um exemplo de como a TRAJETÓRIA é exibida. O PERSONAGEM passa por um LUGAR e as imagens ao lado mostram os detalhes. << todas as imagens contêm link >>',
                images: [
                    { src: null, caption: 'img lugar',      link: '#' },
                    { src: null, caption: 'img personagem', link: '#' },
                    { src: null, caption: 'img personagem', link: '#' },
                ],
            },
            {
                type: 'explica',
                title: 'Outro Lugar',
                text: 'Neste segundo bloco, as IMAGENS aparecem na ESQUERDA. O texto destaca o PERSONAGEM e o NOVO LUGAR visitado.',
                images: [
                    { src: null, caption: 'img lugar',   link: '#' },
                    { src: null, caption: 'img lugar 2', link: '#' },
                ],
            },
        ],
    },
    {
        id: 'char_2', name: 'Personagem 2', color: '#c03030',
        relevancia: 'aliado',
        description: 'Outro personagem com uma descrição diferente. Lorem ipsum dolor sit amet consectetur.',
        placesCount: 2, introScene: 'Capítulo II', exitScene: 'Capítulo IV',
        image: null, imgs: {}, content: [],
    },
]

export default function T03_Characters({ gameObj, onClose }) {
    // Characters list — from gameObj.sections when available, else sample data
    const chars = gameObj?.sections?.S4_personagens_chefes?.chars ?? SAMPLE_CHARS

    const [selectedChar, setChar] = useState(chars[0])
    const [sidebarOpen,  setSidebarOpen]   = useState(true)
    const [sidebarLocked, setSidebarLocked] = useState(true)

    // Reset selected character when the game changes
    useEffect(() => {
        if (chars && chars.length > 0) {
            setChar(chars[0])
        }
    }, [chars])

    // Nav buttons
    const navButtons = [
        { id: 'habilidades', label: 'Habilidades' },
        { id: 'trajetoria',  label: 'Trajetória' },
        { id: 'relacoes',    label: 'Relações' },
    ]
    const [activeNav, setActiveNav] = useState('habilidades')

    const handleSelectChar = (char) => {
        setChar(char)
        if (!sidebarLocked) setSidebarOpen(false)
    }

    return (
        <div className={css.page}>

            {/* ── TOP BAR ── */}
            <div className={css.topBar}>
                <div className={css.navArea}>
                    <span className={css.navTitle}>
                        {selectedChar.name}
                    </span>
                    <div className={css.navButtons}>
                        {navButtons.map(btn => (
                            <button
                                key={btn.id}
                                className={`${css.navBtn} ${activeNav === btn.id ? css.navBtnActive : ''}`}
                                onClick={() => setActiveNav(btn.id)}
                            >{btn.label}</button>
                        ))}
                    </div>
                </div>

                {/* Close sub-page */}
                <button className={css.closeBtn} onClick={onClose} title="Fechar">&#x2715;</button>
            </div>

            {/* ── BODY ── */}
            <div className={css.body}>

                {/* Left sidebar edge tab: TOGGLE ONLY (lock is inside sidebar header) */}
                <div className={`${css.sidebarEdge} ${sidebarOpen ? css.sidebarEdgeOpen : ''}`}>
                    <button
                        className={css.edgeBtn}
                        onClick={() => setSidebarOpen(o => !o)}
                        title={sidebarOpen ? 'Esconder sidebar' : 'Mostrar sidebar'}
                    >{sidebarOpen ? '‹' : '›'}</button>
                </div>

                {/* LEFT: Character selector sidebar */}
                <CharacterSelector
                    chars={chars}
                    selectedChar={selectedChar}
                    setChar={handleSelectChar}
                    isOpen={sidebarOpen}
                    isLocked={sidebarLocked}
                    onLockToggle={() => setSidebarLocked(l => !l)}
                />

                {/* CENTER: Scrollable content */}
                <main className={css.center}>

                    {/* Name & Description fieldset (Global for all tabs) */}
                    <fieldset className={css.infoBox}>
                        <legend className={css.infoLegend}>
                            {selectedChar.name}
                            {selectedChar.title && <span className={css.charTitleLegend}>- {selectedChar.title}</span>}
                            <span className={css.charSword} style={{ background: selectedChar.color }}>⚔</span>
                        </legend>
                        <p className={css.description}>{selectedChar.description}</p>
                    </fieldset>

                    {/* Content paragraphs — Conditional rendering based on tab */}
                    {activeNav === 'trajetoria' && (
                        <T03_Character_Trajectory char={selectedChar} />
                    )}

                    {activeNav === 'habilidades' && (
                        <T03_Character_Abilities char={selectedChar} />
                    )}

                    {activeNav === 'relacoes' && (
                        <T03_Character_Relations char={selectedChar} allChars={chars} />
                    )}

                </main>

                {/* RIGHT: Portrait panel */}
                <ImageSelector char={selectedChar} />

            </div>

        </div>
    )
}

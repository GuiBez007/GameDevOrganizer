import css from './t04_jornadacompleta.module.css'
import { useState } from 'react'

import { getLegendItems, getLegendColor, getLegendTextColor } from '@/config/legendConfig.js'

function JornadaBlock({ block }) {
    const [hoveredMedia, setHoveredMedia] = useState(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const getMedia = (word) => {
        if (!word) return null
        if (block.media && typeof block.media === 'object' && !Array.isArray(block.media)) {
            const foundKey = Object.keys(block.media).find(k => k.toLowerCase() === word.toLowerCase())
            return foundKey ? { ...block.media[foundKey], name: foundKey } : null
        }
        if (Array.isArray(block.media)) {
            return block.media.find(img => img.name && img.name.toLowerCase() === word.toLowerCase())
        }
        if (Array.isArray(block.images)) {
            return block.images.find(img => img.name && img.name.toLowerCase() === word.toLowerCase())
        }
        return null
    }

    const handleMouseEnter = (word, e) => {
        const found = getMedia(word)
        if (found) setHoveredMedia(found)
    }

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.closest('fieldset').getBoundingClientRect()
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const handleMouseLeave = () => {
        setHoveredMedia(null)
    }

    // Simple parser for words that match names in media/images
    const formatText = (text) => {
        if (!text) return null
        let keys = []
        if (block.media && typeof block.media === 'object' && !Array.isArray(block.media)) {
            keys = Object.keys(block.media)
        } else if (Array.isArray(block.media)) {
            keys = block.media.map(img => img.name).filter(Boolean)
        } else if (Array.isArray(block.images)) {
            keys = block.images.map(img => img.name).filter(Boolean)
        }

        if (keys.length === 0) return text

        keys.sort((a, b) => b.length - a.length)
        const escapedKeys = keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        const pattern = new RegExp(`(\\b(?:${escapedKeys.join('|')})\\b)`, 'gi')

        const parts = text.split(pattern)
        return parts.map((part, i) => {
            const foundMedia = getMedia(part)
            if (foundMedia) {
                return (
                    <span
                        key={i}
                        className={css.mediaLink}
                        onMouseEnter={(e) => handleMouseEnter(part, e)}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {part}
                    </span>
                )
            }
            return part
        })
    }

    const blockColor = getLegendColor(block.type)

    const legendStyle = {
        color: blockColor,
        borderColor: blockColor,
        marginLeft: block.position === 'center' || block.position === 'middle' ? 'auto' : block.position === 'end' ? 'auto' : '0',
        marginRight: block.position === 'center' || block.position === 'middle' ? 'auto' : block.position === 'start' ? 'auto' : '0',
    }

    return (
        <fieldset
            className={css.block}
            data-type={block.type}
            style={{ '--block-color': blockColor }}
        >
            <legend className={css.blockTitle} style={legendStyle}>{block.title}</legend>
            <div className={css.blockContent} style={{ color: getLegendTextColor(block.type) }}>
                {formatText(block.text)}
            </div>

            {/* Hover Image Preview */}
            {hoveredMedia && (
                <div
                    className={css.hoverPreview}
                    style={{
                        top: mousePos.y - 15,
                        left: mousePos.x + 15,
                        transform: 'translateY(-100%)'
                    }}
                >
                    {hoveredMedia.src ? (
                        <img src={hoveredMedia.src} alt={hoveredMedia.caption} />
                    ) : (
                        <div className={css.mediaPlaceholder}>
                            <span>{hoveredMedia.caption || 'Sem imagem'}</span>
                        </div>
                    )}
                    {hoveredMedia.caption && <div className={css.previewCaption}>{hoveredMedia.caption}</div>}
                </div>
            )}
        </fieldset>
    )
}

function T04_JornadaCompleta({ gameObj, onClose }) {
    const [hiddenTypes, setHiddenTypes] = useState(new Set())

    const jornadaData = gameObj?.sections?.S1_jornada_completa?.content || []

    const toggleFilter = (type) => {
        setHiddenTypes(prev => {
            const next = new Set(prev)
            if (next.has(type)) next.delete(type)
            else next.add(type)
            return next
        })
    }

    const clearFilters = () => setHiddenTypes(new Set())

    const filteredData = jornadaData.filter(block => !hiddenTypes.has(block.type))

    return (
        <div className={css.page}>
            <button className={css.closeBtn} onClick={onClose} aria-label="Close">✕</button>
            {/* Header / Legend Area as Middle Fieldset */}
            <fieldset className={css.legendFieldset}>
                <legend
                    className={css.legendTitle}
                    onClick={clearFilters}
                    style={{ cursor: 'pointer' }}
                    title="Clique para limpar todos os filtros"
                >
                    Legenda
                </legend>
                <div className={css.legendItems}>
                    {getLegendItems().map(item => (
                        <div
                            key={item.id}
                            className={`${css.legendItem} ${hiddenTypes.has(item.id) ? css.legendItemDisabled : ''}`}
                            data-type={item.id}
                            onClick={() => toggleFilter(item.id)}
                            style={{ '--text-color': item.color, borderColor: item.color }}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </fieldset>

            {/* Content Area */}
            <div className={css.contentArea}>
                <div className={css.scrollContainer}>
                    {filteredData.map((block, i) => (
                        <JornadaBlock key={i} block={block} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default T04_JornadaCompleta

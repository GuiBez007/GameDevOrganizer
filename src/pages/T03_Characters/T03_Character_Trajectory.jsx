import React, { useState } from 'react'
import css from './t03_characters.module.css'
import { getLegendItems, getLegendColor, getLegendTextColor } from '@/config/legendConfig.js'

// Simple parser for words (3+ chars) to highlight them
const formatText = (text, media, onHover) => {
    if (!text) return null

    let keys = []
    if (media && typeof media === 'object' && !Array.isArray(media)) {
        keys = Object.keys(media)
    } else if (Array.isArray(media)) {
        keys = media.map(img => img.name).filter(Boolean)
    }

    const mediaPattern = keys.length > 0 
        ? keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
        : null
    
    const combinedPattern = mediaPattern 
        ? `(\\b(?:${mediaPattern})\\b)|(\\b[A-Z\u00C0-\u00D6\u00D8-\u00DE]{3,}\\b)`
        : `(\\b[A-Z\u00C0-\u00D6\u00D8-\u00DE]{3,}\\b)`
        
    const regex = new RegExp(combinedPattern, 'gi')
    const parts = text.split(regex)

    const getMediaItem = (part) => {
        if (!part) return null
        if (media && typeof media === 'object' && !Array.isArray(media)) {
            const foundKey = Object.keys(media).find(k => k.toLowerCase() === part.toLowerCase())
            return foundKey ? { ...media[foundKey], name: foundKey } : null
        }
        if (Array.isArray(media)) {
            return media.find(img => img.name && img.name.toLowerCase() === part.toLowerCase())
        }
        return null
    }

    return parts.map((part, i) => {
        if (!part) return null
        
        const mediaItem = getMediaItem(part)
        const isHighlight = /^[A-Z\u00C0-\u00D6\u00D8-\u00DE\s]+$/.test(part) && part.length >= 3

        if (mediaItem) {
            return (
                <span 
                    key={i} 
                    className={css.mediaLink}
                    onMouseEnter={() => onHover.enter(mediaItem)}
                    onMouseMove={onHover.move}
                    onMouseLeave={onHover.leave}
                >
                    {part}
                </span>
            )
        }
        
        if (isHighlight) {
            return <span key={i} className={css.mediaLinkSimple}>{part}</span>
        }
        
        return part
    })
}

// Layout alternates:
function ContentBlock({ block }) {
    const [hoveredMedia, setHoveredMedia] = useState(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const hoverHandlers = {
        enter: (item) => setHoveredMedia(item),
        move:  (e) => {
            const rect = e.currentTarget.closest('fieldset').getBoundingClientRect()
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        },
        leave: () => setHoveredMedia(null)
    }

    // Legend alignment: start | center | end
    const blockColor = getLegendColor(block.type)
    const legendStyle = {
        marginLeft:  block.titleAlign === 'center' ? 'auto' : block.titleAlign === 'end' ? 'auto' : '0',
        marginRight: block.titleAlign === 'center' ? 'auto' : block.titleAlign === 'start' ? 'auto' : '0',
        color:       blockColor,
        borderColor: blockColor
    }

    return (
        <div 
            className={css.contentBlock} 
            data-type={block.type || 'normal'}
            style={{ '--block-color': blockColor }}
        >
            <fieldset className={css.blockText}>
                <legend className={css.blockTitle} style={legendStyle}>
                    {block.title}
                </legend>
                <p 
                    className={css.blockParagraph} 
                    style={{ color: getLegendTextColor(block.type) }}
                >
                    {formatText(block.text, block.media, hoverHandlers)}
                </p>

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
        </div>
    )
}

export default function T03_Character_Trajectory({ char }) {
    const [hiddenTypes, setHiddenTypes] = useState(new Set())

    const toggleFilter = (type) => {
        setHiddenTypes(prev => {
            const next = new Set(prev)
            if (next.has(type)) next.delete(type)
            else next.add(type)
            return next
        })
    }

    const clearFilters = () => setHiddenTypes(new Set())

    return (
        <>
            {/* Metadata cards (side by side) */}
            <div className={css.metaCards}>
                <fieldset className={css.metaCard}>
                    <legend className={css.metaCardLabel}>Relevância</legend>
                    <div className={css.metaCardValue}>{char.trajectory?.stats?.relevancia ?? '—'}</div>
                </fieldset>
                <fieldset className={css.metaCard}>
                    <legend className={css.metaCardLabel}>Introduzido no</legend>
                    <div className={css.metaCardValue}>{char.trajectory?.stats?.introScene ?? '—'}</div>
                </fieldset>
                <fieldset className={css.metaCard}>
                    <legend className={css.metaCardLabel}>Sai de cena no</legend>
                    <div className={css.metaCardValue}>{char.trajectory?.stats?.exitScene ?? '—'}</div>
                </fieldset>
                <fieldset className={css.metaCard}>
                    <legend className={css.metaCardLabel}>Lugares visitados</legend>
                    <div className={css.metaCardValue}>{char.trajectory?.list?.length || 0}</div>
                </fieldset>
            </div>

            {/* Legend / Filter Area */}
            <div className={css.legendWrapper}>
                <div 
                    className={css.legendTitle} 
                    onClick={clearFilters}
                    style={{ cursor: 'pointer' }}
                    title="Clique para limpar todos os filtros"
                >
                    Legenda
                </div>
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
            </div>

            {/* Filtered Content Blocks */}
            {char.trajectory?.list
                ?.filter(block => !hiddenTypes.has(block.type))
                ?.map((block, i) => (
                    <ContentBlock
                        key={i}
                        block={block}
                        index={i}
                    />
                ))
            }
        </>
    )
}

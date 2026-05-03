import React from 'react'
import css from './t03_characters.module.css'

export default function T03_Character_Relations({ char, allChars = [] }) {
    const stats = char.relations?.stats || {}
    const rawList = (char.relations?.list || []).map(rel => {
        if (rel.char || rel.charId) {
            const linkedChar = rel.char || allChars.find(c => c.name === rel.charId || c.id === rel.charId)
            if (linkedChar) {
                return {
                    name: linkedChar.name,
                    title: linkedChar.title,
                    color: linkedChar.color,
                    charDesc: linkedChar.description,
                    relDesc: rel.relDesc,
                    status: rel.badgeColor || linkedChar.badgeColor || rel.status,
                    text: rel.badgeText || linkedChar.badgeText || rel.text,
                    image: linkedChar.image
                }
            }
        }
        return rel
    })

    // Sort: blue -> yellow -> red
    const colorOrder = { blue: 1, yellow: 2, red: 3 }
    const sortedList = [...rawList].sort((a, b) => (colorOrder[a.status] || 99) - (colorOrder[b.status] || 99))

    return (
        <div className={css.relationsView}>
            {/* Stats row */}
            <div className={css.relationsStatsGrid}>
                <fieldset className={css.statField}>
                    <legend>Qtd personagens conhecidos</legend>
                    <div className={css.statValue}>{rawList.length || 0}</div>
                </fieldset>
                <fieldset className={css.statField}>
                    <legend>Desde o início</legend>
                    <div className={css.statValue}>{stats.desdeInicio || 0}</div>
                </fieldset>
                <fieldset className={css.statField}>
                    <legend>Ao longo</legend>
                    <div className={css.statValue}>{stats.aoLongo || 0}</div>
                </fieldset>
            </div>

            {/* Relations list */}
            <div className={css.relationsList}>
                {sortedList.length > 0 ? sortedList.map((rel, i) => (
                    <fieldset key={i} className={`${css.relationBlock} ${(rel.status === 'yellow' || rel.status === 'purple') ? css.reverseRow : ''}`}>
                        <legend className={`${css.infoLegend} ${css.relationLegend}`}>
                            {rel.name}
                            {rel.title && <span className={css.charTitleLegend}>- {rel.title}</span>}
                            <span className={css.charSword} style={{ background: rel.color }}>⚔</span>
                        </legend>
                        <div className={css.relationContent}>
                            <div className={css.relationTexts}>
                                <div className={css.relBox}>
                                    <p>{rel.charDesc}</p>
                                </div>
                                <div className={css.relBox}>
                                    <p>{rel.relDesc}</p>
                                </div>
                            </div>

                            <div className={`${css.relationMedia} ${css['media_' + rel.status]}`}>
                                {/* Status badge - showing the flexible text field */}
                                <div className={`${css.relationStatus} ${css['status_' + rel.status]}`}>
                                    {rel.text}
                                </div>

                                {rel.image ? (
                                    <img src={rel.image} alt={rel.name} className={css.relationImg} />
                                ) : (
                                    <div className={css.relationImgPlaceholder} style={{ '--ph': rel.color }}>
                                        <span>IMG</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </fieldset>
                )) : (
                    <div className={css.noAbilities}>Nenhuma relação registrada.</div>
                )}
            </div>
        </div>
    )
}

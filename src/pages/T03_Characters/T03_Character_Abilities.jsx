import React from 'react'
import css from './t03_characters.module.css'

export default function T03_Character_Abilities({ char }) {
    const stats = char.abilities?.stats || {}
    const list  = char.abilities?.list  || []

    return (
        <div className={css.abilitiesView}>
            {/* Header Info */}
            <div className={css.charStatsHeader}>

                {/* Stats Grid Wrapper (to ensure vertical alignment) */}
                <div className={css.abilitiesStatsGrid}>
                    <fieldset className={css.statField}>
                        <legend>Total de habilidades</legend>
                        <div className={css.statValue}>{list.length || 0}</div>
                    </fieldset>
                    <fieldset className={`${css.statField} ${css.weaponsField}`}>
                        <legend>Armas utilizadas</legend>
                        <div className={css.weaponsSquares}>
                            {stats.weapons?.map((w, i) => (
                                <div key={i} className={css.weaponSquare} style={{ backgroundColor: w.color }}></div>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className={css.statField}>
                        <legend>Início</legend>
                        <div className={css.statValue}>{stats.inicio || '-'}</div>
                    </fieldset>
                    <fieldset className={css.statField}>
                        <legend>Ao longo</legend>
                        <div className={css.statValue}>{stats.ao_longo || '-'}</div>
                    </fieldset>
                    <fieldset className={css.statField}>
                        <legend>Nativas</legend>
                        <div className={css.statValue}>{stats.nativas || '-'}</div>
                    </fieldset>
                    <fieldset className={css.statField}>
                        <legend>Runas</legend>
                        <div className={css.statValue}>{stats.runas || '-'}</div>
                    </fieldset>
                </div>
            </div>

            {/* Abilities List */}
            <div className={css.abilitiesList}>
                {list.length > 0 ? list.map((abi, i) => {
                    const statusColors = {
                        blue:   '#2b86ff',
                        yellow: '#ffd700',
                        red:    '#ff3e3e',
                        purple: '#9d00ff'
                    }
                    const legendColor = statusColors[abi.status] || 'inherit'
                    
                    // Try to find the GIF by name in the abilityGifs map
                    const gifSrc = char.abilityGifs ? char.abilityGifs[abi.name] : null

                    return (
                        <fieldset key={i} className={css.abilityBlock}>
                            <legend 
                                className={css.abilityName} 
                                style={{ 
                                    color: legendColor, 
                                    border: `solid 1px ${legendColor}`,
                                }}>
                                {abi.name}
                            </legend>
                            <div className={css.abilityContent}>
                                <div className={css.abilityDesc}>
                                    <p>{abi.description}</p>
                                </div>
                                <div className={css.abilityMedia}>
                                    {gifSrc ? (
                                        <img src={gifSrc} alt={abi.name} className={css.abilityGif} />
                                    ) : (
                                        <div className={css.abilityGifPlaceholder}>
                                            <span>GIF {abi.name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </fieldset>
                    )
                }) : (
                    <div className={css.noAbilities}>Nenhuma habilidade registrada.</div>
                )}
            </div>
        </div>
    )
}

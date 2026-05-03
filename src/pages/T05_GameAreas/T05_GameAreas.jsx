import css from "./t05_gameareas.module.css";

function T05_GameAreas({ gameObj, onClose }) {
    const areasData = gameObj.sections?.S2_areas_do_jogo || { stats: {}, list: [] };
    const { list = [] } = areasData;

    const total = list.length;
    const seguro = list.filter(item => (item.badgeColor || item.status) === 'blue').length;
    const livre = list.filter(item => (item.badgeColor || item.status) === 'yellow').length;
    const inimigo = list.filter(item => (item.badgeColor || item.status) === 'red').length;
    const dominio = list.filter(item => (item.badgeColor || item.status) === 'purple').length;

    // Sort by color: blue -> yellow -> red -> purple
    const colorOrder = { blue: 1, yellow: 2, red: 3, purple: 4 };
    const sortedList = [...list].sort((a, b) => {
        const cA = a.badgeColor || a.status;
        const cB = b.badgeColor || b.status;
        return (colorOrder[cA] || 99) - (colorOrder[cB] || 99);
    });

    const statusColors = {
        blue: '#2b86ff',
        yellow: '#ffd700',
        red: '#ff3e3e',
        purple: '#9d00ff'
    };

    return (
        <div className={css.areasPage}>
            <button className={css.closeBtn} onClick={onClose} aria-label="Close">✕</button>
            <div className={css.content}>
                {/* Stats Row embraced by a fieldset */}
                <fieldset className={css.statsContainer}>
                    <legend>Áreas do Jogo</legend>
                    <div className={css.statsGrid}>
                        <fieldset className={css.statField}>
                            <legend>Total</legend>
                            <div className={css.statValue}>{total}</div>
                        </fieldset>
                        <fieldset className={css.statField}>
                            <legend style={{color:'#2b86ff'}}>Seguro</legend>
                            <div className={css.statValue}>{seguro}</div>
                        </fieldset>
                        <fieldset className={css.statField}>
                            <legend style={{color:'#ffd700'}}>Área Livre</legend>
                            <div className={css.statValue}>{livre}</div>
                        </fieldset>
                        <fieldset className={css.statField}>
                            <legend style={{color:'#ff3e3e'}}>Território Inimigo</legend>
                            <div className={css.statValue}>{inimigo}</div>
                        </fieldset>
                        <fieldset className={css.statField}>
                            <legend style={{color:'#9d00ff'}}>Domínio</legend>
                            <div className={css.statValue}>{dominio}</div>
                        </fieldset>
                    </div>
                </fieldset>

                {/* Areas List */}
                <div className={css.areasList}>
                    {sortedList.length > 0 ? sortedList.map((area, i) => {
                        const bColor = area.badgeColor || area.status;
                        const areaColor = statusColors[bColor] || 'var(--char-accent)';
                        const bText = area.badgeText || area.text;
                        const areaTitle = area.title || area.type;

                        return (
                            <fieldset key={i} className={`${css.areaBlock} ${(bColor === 'yellow' || bColor === 'purple') ? css.reverseRow : ''}`}>
                                <legend className={`${css.areaInfoLegend} ${css.areaLegend}`}>
                                    {area.name} {areaTitle ? `- ${areaTitle}` : ''}
                                    <span className={css.areaSword} style={{ background: areaColor }}>⚔</span>
                                </legend>

                                <div className={css.areaContent}>
                                    <div className={css.areaTexts}>
                                        <div className={css.textRow}>
                                            <p>{area.desc}</p>
                                        </div>
                                        <div className={css.textRow}>
                                            <p><strong>Monstros e Criaturas Encontradas:</strong><br/>{area.monsters}</p>
                                        </div>
                                    </div>

                                    <div className={`${css.areaMedia} ${css['media_' + bColor]}`}>
                                        <div className={`${css.statusBadge} ${css['status_' + bColor]}`}>
                                            {bText}
                                        </div>
                                        {area.image ? (
                                            <img src={area.image} alt={area.name} className={css.areaImg} />
                                        ) : (
                                            <div className={css.imgPlaceholder}>
                                                <span>IMG</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </fieldset>
                        );
                    }) : (
                        <div className={css.noData}>Nenhuma área registrada para este jogo.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default T05_GameAreas;

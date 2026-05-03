import css from "./t06_monsters.module.css";

function T06_Monsters({ gameObj, onClose }) {
    const monstersData = gameObj.sections?.S3_monstros_criaturas || { stats: {}, list: [] };
    const { list = [] } = monstersData;

    const total = list.length;
    const comum = list.filter(item => (item.badgeColor || item.status) === 'blue').length;
    const hostil = list.filter(item => (item.badgeColor || item.status) === 'yellow').length;
    const controlada = list.filter(item => (item.badgeColor || item.status) === 'red').length;
    const elite = list.filter(item => (item.badgeColor || item.status) === 'purple').length;

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
        <div className={css.monstersPage}>
            <button className={css.closeBtn} onClick={onClose} aria-label="Close">✕</button>
            
            <div className={css.content}>
                {/* Stats Row embraced by a fieldset */}
                <fieldset className={css.statsContainer}>
                    <legend>Monstros & Criaturas</legend>
                    <div className={css.statsGrid}>
                        <fieldset className={css.statField}>
                            <legend>Total</legend>
                            <div className={css.statValue}>{total}</div>
                        </fieldset>
                        <fieldset className={css.statField}>
                            <legend style={{color:'#2b86ff'}}>Comum</legend>
                            <div className={css.statValue}>{comum}</div>
                        </fieldset>
                        <fieldset className={css.statField}>
                            <legend style={{color:'#ffd700'}}>Hostil</legend>
                            <div className={css.statValue}>{hostil}</div>
                        </fieldset>
                        <fieldset className={css.statField}>
                            <legend style={{color:'#ff3e3e'}}>Controlada</legend>
                            <div className={css.statValue}>{controlada}</div>
                        </fieldset>
                        <fieldset className={css.statField}>
                            <legend style={{color:'#9d00ff'}}>Elite</legend>
                            <div className={css.statValue}>{elite}</div>
                        </fieldset>
                    </div>
                </fieldset>

                {/* Monsters List */}
                <div className={css.monstersList}>
                    {sortedList.length > 0 ? sortedList.map((monster, i) => {
                        const bColor = monster.badgeColor || monster.status;
                        const monsterColor = statusColors[bColor] || 'var(--char-accent)';
                        const bText = monster.badgeText || monster.text;
                        const monsterTitle = monster.title || monster.type;

                        return (
                            <fieldset key={i} className={`${css.monsterBlock} ${(bColor === 'yellow' || bColor === 'purple') ? css.reverseRow : ''}`}>
                                <legend className={`${css.monsterInfoLegend} ${css.monsterLegend}`}>
                                    {monster.name} {monsterTitle ? `- ${monsterTitle}` : ''}
                                    <span className={css.monsterSword} style={{ background: monsterColor }}>⚔</span>
                                </legend>

                                <div className={css.monsterContent}>
                                    <div className={css.monsterTexts}>
                                        <div className={css.textRow}>
                                            <p>{monster.desc}</p>
                                        </div>
                                        <div className={css.textRow}>
                                            <p><strong>Curiosidades:</strong><br/>{monster.curiosities}</p>
                                        </div>
                                    </div>

                                    <div className={`${css.monsterMedia} ${css['media_' + bColor]}`}>
                                        <div className={`${css.statusBadge} ${css['status_' + bColor]}`}>
                                            {bText}
                                        </div>
                                        {monster.image ? (
                                            <img src={monster.image} alt={monster.name} className={css.monsterImg} />
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
                        <div className={css.noData}>Nenhum monstro registrado para este jogo.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default T06_Monsters;

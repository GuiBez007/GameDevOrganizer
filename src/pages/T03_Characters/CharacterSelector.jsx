import css from './charselector.module.css'

// CharacterSelector — left sidebar; toggle edge tab is in parent T03_Characters
const CharacterSelector = ({ chars, selectedChar, setChar, isOpen, isLocked, onLockToggle }) => {

    return (
    <aside className={`${css.sidebar} ${isOpen ? css.sidebarOpen : css.sidebarClosed}`}>

        <div className={css.sidebarHeader}>
            <span className={css.sidebarTitle}>Seleção de personagem</span>
            <button
                className={`${css.lockBtn} ${isLocked ? css.lockBtnActive : ''}`}
                onClick={onLockToggle}
                title={isLocked ? 'Destravar' : 'Travar sidebar'}
            >{isLocked ? '🔒' : '🔓'}</button>
        </div>

        <div className={css.charList}>
            {chars.map((char, i) => (
                <div
                    key={char.id ?? i}
                    className={`${css.charItem} ${char === selectedChar ? css.active : ''}`}
                    onClick={() => setChar(char)}
                >
                    {/* Thumbnail with sword overlay at bottom-right */}
                    <div className={css.charThumb} style={{ '--char-color': char.color }}>
                        {char.image || (char.imgs && Object.values(char.imgs)[0])
                            ? <img src={char.image || Object.values(char.imgs)[0]} alt={char.name} className={css.charThumbImg} />
                            : <div className={css.charThumbPlaceholder} />
                        }
                        <span className={css.thumbSword}>⚔</span>
                    </div>

                    {/* Name & Title */}
                    <div className={css.charLabelWrapper}>
                        <span className={css.charLabel}>{char.name}</span>
                        {char.title && <span className={css.charTitle}>{char.title}</span>}
                    </div>
                </div>
            ))}
        </div>

    </aside>)
}
export default CharacterSelector

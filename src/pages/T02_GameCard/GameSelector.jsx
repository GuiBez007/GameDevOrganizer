// Styles import //
import css from "./gameselector.module.css"


const GameSelector = ({gameObj, setGame, selectedGame, isOpen, isLocked, onLockToggle}) => {

    const chapters = Object.values(gameObj)
        .filter(obj => typeof obj === 'object' && obj !== null && obj.title)

    // If only 1 game, hide entirely
    if (chapters.length <= 1) return null

    return (
    <aside className={`${css.sidebar} ${isOpen ? css.sidebarOpen : css.sidebarClosed}`}>

        <div className={css.sidebarHeader}>
            <span className={css.sidebarTitle}>Seleção de jogo</span>
            <button
                className={`${css.lockBtn} ${isLocked ? css.lockBtnActive : ''}`}
                onClick={onLockToggle}
                title={isLocked ? 'Destravar' : 'Travar sidebar'}
            >{isLocked ? '🔒' : '🔓'}</button>
        </div>

        <div className={css.chapterList}>
            { chapters.map((game, i) =>
                <div
                    key={i}
                    className={`${css.chapterItem} ${game === selectedGame ? css.active : ''}`}
                    onClick={() => setGame(game)}
                >
                    <img
                        className={css.chapterThumb}
                        src={game.covers?.green}
                        alt={game.title}
                    />
                    <span className={css.chapterLabel}>{game.title}</span>
                </div>
            )}
        </div>

    </aside>)
}
export default GameSelector;

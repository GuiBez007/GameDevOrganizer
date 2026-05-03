// Styles import //
import css from "./simplemodal.module.css"

// Pages import //
import T02_GameCard from "@/pages/T02_GameCard/T02_GameCard";

// React import //
import { useState } from "react";


const SimpleModal = ({img, title, data}) => {
    const [showCard, setShowCard] = useState(false)

    return (<>

        {/* ── Trigger card ── */}
        <div
            className={css.card}
            onClick={() => setShowCard(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setShowCard(true)}
        >
            <div className={css.cardCover}>
                {img
                    ? <img src={img} alt={title} />
                    : <span className={css.cardCoverPlaceholder}>?</span>
                }
            </div>
            <div className={css.cardTitle}>{title}</div>
        </div>

        {/* ── Backdrop + modal ── */}
        { showCard &&
            <div
                className={css.backdrop}
                onClick={(e) => { if (e.target === e.currentTarget) setShowCard(false) }}
            >
                <T02_GameCard gameObj={data} setModal={setShowCard}/>
            </div>
        }

    </>)
}
export default SimpleModal;
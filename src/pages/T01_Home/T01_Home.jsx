// Styles import //
import css from "./t01_home.module.css"

// Components import //
import SimpleModal from "@/components/SimpleModal.jsx";

// Games' Data import //
import zExemplo from "@/games/zExemplo/gen/_manager.js";

function T01_Home() {

    const sagas = [zExemplo]

    return (
        <main className={css.page}>

            {/* ── Games section ── */}
            <section className={css.section}>
                <h2 className={css.sectionTitle}>Jogos em Desenvolvimento</h2>

                <div className={css.grid}>
                    {sagas.map((saga, i) => (
                        <SimpleModal
                            key={i}
                            img={saga.covers.black}
                            title={saga.title}
                            data={saga}
                        />
                    ))}
                </div>
            </section>

        </main>)
}
export default T01_Home;

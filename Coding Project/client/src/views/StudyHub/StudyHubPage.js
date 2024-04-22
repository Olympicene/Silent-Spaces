import Timer from "../../components/Timer/Timer";
import NavBar from "../../components/NavBar/NavBar";
import StickyNote from "../../components/StickyNote/StickyNote";
import styles from "./StudyHub.module.css";

const StudyHubPage = () => {

    const dummyuser = {
        first_name: 'naan',
        last_name: 'sheri',
        email: 'urmom@gmail.com',
    }

    return (
        <div className={styles['studyhub-main']}>
            <NavBar info={dummyuser} page="study hub" />
            <div className={styles['studyhub-right']} style={{marginLeft: "20vw"}}>

                <Timer/>
                <div style={{marginTop:"5rem", border:"none"}}>
                    <iframe title="Spotify" style={{borderRadius:"12px" }}
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS?utm_source=generator" 
                    width="100%" height="480" allowfullscreen="" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"></iframe>
                </div>
                <StickyNote/>

            </div>
        </div>
    );
}

export default StudyHubPage;
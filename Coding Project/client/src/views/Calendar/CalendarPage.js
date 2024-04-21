import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Calendar.module.css";

const CalendarPage = () => {

    const dummyuser = {
        first_name: 'naan',
        last_name: 'sheri',
        email: 'urmom@gmail.com',
    }

    return(
        <div className={styles['calendar-nav']}>
            <NavBar info={dummyuser} page="calendar"/>
            <div className={styles['calendar-main']}>
                <iframe src="https://embed.styledcalendar.com/#MWjeHzi9msi7VRxUkYRz" title="Styled Calendar" 
                class="styled-calendar-container" 
                style={{width: "100%", height:"85vh", border: "none"}} data-cy="calendar-embed-iframe"></iframe>
                <script async type="module" src="https://embed.styledcalendar.com/assets/parent-window.js"></script>
            </div>
        </div>
    );
}

export default CalendarPage;
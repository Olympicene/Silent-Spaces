import React from "react";
import NavBar from "../../components/NavBar/NavBar";

const CalendarPage = () => {

    require("./Calendar.css");

    const dummyuser = {
        first_name: 'naan',
        last_name: 'sheri',
        email: 'urmom@gmail.com',
    }

    return(
        <div className="calendar-nav">
            <NavBar info={dummyuser} page="calendar"/>
            <div className="calendar-main">
                <iframe src="https://embed.styledcalendar.com/#MWjeHzi9msi7VRxUkYRz" title="Styled Calendar" 
                class="styled-calendar-container" 
                style={{width: "100%", height:"85vh", border: "none"}} data-cy="calendar-embed-iframe"></iframe>
                <script async type="module" src="https://embed.styledcalendar.com/assets/parent-window.js"></script>
            </div>
        </div>
    );
}

export default CalendarPage;
import Timer from "../../components/Timer/Timer";
import NavBar from "../../components/NavBar/NavBar";

const StudyHubPage = () => {
    require("./StudyHub.css");

    const dummyuser = {
        first_name: 'naan',
        last_name: 'sheri',
        email: 'urmom@gmail.com',
    }

    return (
        <div className="studyhub-main">
            <NavBar info={dummyuser} page="study hub" />
            <div className="studyhub-right">
                <Timer/>
            </div>
        </div>
    );
}

export default StudyHubPage;
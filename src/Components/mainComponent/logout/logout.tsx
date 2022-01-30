
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../redux/authState";
import store from "../../redux/store";
import notify from "../../utils/Notify";
import "./logout.css";

function Logout(): JSX.Element {
    const history = useHistory();
    useEffect(()=>{
        store.dispatch(logoutUser());
        notify.success("successfully loged out");
        history.push("/home")
    });
    return (
        <div className="logout">
			
        </div>
    );
}

export default Logout;

import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import store from "../../redux/store";
import "./header.css";
import logoHeader from "../../../logoHeader.png";
import LogoutIcon from '@mui/icons-material/Logout';
import notify from "../../utils/Notify";

function Header(): JSX.Element {

    const history = useHistory();
    
    let isLogged = ()=>{
        if (store.getState().authState.loginUser.userType != ""){
            return <NavLink exact to="/logout">LOG OUT</NavLink>
        } else {
            return <NavLink exact to="/login">LOG IN</NavLink>
        }
    }

    return (
        <div className="header">
                

            <li className="logo"><NavLink  exact to="/home"><img src={logoHeader} width={100} alt="Coupons logo"/></NavLink></li>
			
            <br />
            
            <nav>
                <ul className="top-menu">
                <li className="normal"><NavLink  exact to="/home">HOME</NavLink></li>
                {/*<li className="active"><NavLink  exact to="/login">LOG IN</NavLink></li>*/}
                <li className="active"><NavLink  exact to="/login">LOG IN</NavLink></li>
                <li className="normal"><NavLink  exact to="/coupons">COUPONS</NavLink></li>
                {/*<li className="normal"><NavLink  exact to="/companies">COMPANIES</NavLink></li>*/}
                <li className="normal"><NavLink  exact to="/customers">CUSTOMERS</NavLink></li>
                <li className="normal"><NavLink  exact to="/contact">CONTACT</NavLink></li>
	            </ul>

            </nav>
                <li className="logout"><NavLink  exact to="/logout"><LogoutIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /></NavLink></li>
        </div>
    );
}

export default Header;

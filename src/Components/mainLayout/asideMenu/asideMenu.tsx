import { NavLink } from "react-router-dom";
import "./asideMenu.css";

function openMenu() {
    document.getElementById("asideMenu")?.classList.toggle('active')
}

function AsideMenu(): JSX.Element {
    return (
        <div className="asideMenu" id="asideMenu">
			<div className="toggle-btn" onClick={openMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul>
                <li>Menu</li>
                <li><NavLink className="a"  exact to="/adminMenu">Administrator</NavLink></li>
                <li><NavLink className="a"  exact to="/companyMenu">Company</NavLink></li>
                <li><NavLink className="a"  exact to="/customerMenu">Customer</NavLink></li>
            </ul>
        </div>
    );
}

export default AsideMenu;

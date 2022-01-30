import { Typography } from "@mui/material";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import store from "../../redux/store";
import notify from "../../utils/Notify";
import "./customerMenu.css";

function CustomerMenu(): JSX.Element {
    const history = useHistory();
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Customer"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });
    return (
        <div className="customerMenu" id="customerMenu">
            <Typography variant="h4" className="HeadLine">Menu</Typography><br/>
            <ul>
                <li><NavLink className="a"  exact to="/purchaseCoupon">Purchase coupon</NavLink></li>  <br />
                <li><NavLink className="a"  exact to="/ShowMyCoupons">Show my coupons</NavLink></li> <br />
                <li><NavLink className="a"  exact to="/ShowMyCouponsByCategory">Show my coupons by category</NavLink></li> <br />
                <li><NavLink className="a"  exact to="/ShowMyCouponsByMaxPrice">Show my coupons by max price</NavLink></li> <br />
                <li><NavLink className="a"  exact to="/myInfo">my info</NavLink></li> <br />

            </ul>
        </div>
    );
}

export default CustomerMenu;

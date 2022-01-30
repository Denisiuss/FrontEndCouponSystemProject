import { Typography } from "@mui/material";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import store from "../../redux/store";
import notify from "../../utils/Notify";
import "./companyMenu.css";

function CompanyMenu(): JSX.Element {
    const history = useHistory();
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Company"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });
    return (
        <div className="companyMenu" id="companyMenu">
            <Typography variant="h4" className="HeadLine">Menu</Typography><br/>
			<ul>
                <li><NavLink className="a"  exact to="/addCoupon">Add Coupon</NavLink></li> <br />
                <li><NavLink className="a"  exact to="/updateCoupon">Update Coupon</NavLink></li> <br />
                <li><NavLink className="a"  exact to="/deleteCoupon">Delete Coupon</NavLink></li> <br />
                <li><NavLink className="a"  exact to="/getAllCompaniesCoupons">Show all coupons</NavLink></li> <br />
                <li><NavLink className="a"  exact to="/getCompaniesCouponByCategory">Show coupons By category</NavLink></li> <br />
                <li><NavLink className="a"  exact to="/getCompaniesCouponByMaxPrice">Show coupons By max price</NavLink></li> <br />
                <li><NavLink className="a"  exact to="/companyInfo">Company info</NavLink></li> <br />
            </ul>
        </div>
    );
}

export default CompanyMenu;

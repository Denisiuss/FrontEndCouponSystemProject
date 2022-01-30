import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import store from "../../redux/store";
import notify from "../../utils/Notify";
import "./adminMenu.css";
import { Typography } from "@mui/material";


function AdminMenu(): JSX.Element {

   const history = useHistory();

useEffect(()=>{
        
    if (store.getState().authState.loginUser.userType != "Administrator"){
        notify.error("you are not allowed to enter!")
        history.push("/login");
    }
});
    return (
        <div className="adminMenu" id="adminMenu">

            
                <Typography variant="h4" className="HeadLine">Menu</Typography><br/>
                <ul>
                <li><NavLink className="a"  exact to="/addCompany">Add Company</NavLink></li> <br />
                <li><NavLink className="a"  exact to="/updateCompany">Update Company</NavLink></li> <br />
                <li><NavLink className="a"  exact to="/deleteCompany">Delete Company</NavLink></li> <br /> 
                <li><NavLink className="a"  exact to="/getAllCompanies">Show all companies</NavLink></li><br /> 
                <li><NavLink className="a"  exact to="/getOneCompany">Show one company by id</NavLink></li><br /> 
                <li><NavLink className="a"  exact to="/addCustomer">Add customer</NavLink></li><br /> 
                <li><NavLink className="a"  exact to="/updateCustomer">Update customer</NavLink></li><br /> 
                <li><NavLink className="a"  exact to="/deleteCustomer">Delete customer</NavLink></li><br /> 
                <li><NavLink className="a"  exact to="/getAllCustomers">Show all customers</NavLink></li><br /> 
                <li><NavLink className="a"  exact to="/getOneCustomer">Show one customer</NavLink></li><br /> 
                </ul>
        </div>
    );
}


export default AdminMenu;

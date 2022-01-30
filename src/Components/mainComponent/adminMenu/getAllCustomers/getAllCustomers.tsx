import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SingleCustomerProps from "../../../axios/singleCustomerProps/singleCustomerProps";
import CompanyDetails from "../../../model/CompanyD";
import CustomerDetails from "../../../model/CustomerD";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import { loginUserString } from "../../../redux/authState";
import notify from "../../../utils/Notify";
import "./getAllCustomers.css";

function GetAllCustomers(): JSX.Element {
    const [customersdata, setData] = useState([new CustomerDetails()]);
    const history = useHistory();
    let token: string = store.getState().authState.loginUser.token;
    useEffect(()=>{
            if (store.getState().authState.loginUser.userType != "Administrator"){
                notify.error("you are not allowed to enter!")
                history.push("/login");
            }
        axios.get(globals.urls.administrator+"allCustomers", {headers: {"authorization": token}}).then((response)=>{
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            console.log(response.data); 
            setData(response.data)
        }).catch(error=>{console.log(error)});
    },[]);
    
    return (
        <div className="getAllCustomers">
            <div className="companies">
                <h1>Customers info</h1><hr/>
                {customersdata.map(item=><SingleCustomerProps
                    id={item.id}
                    first_name={item.first_name}
                    last_name={item.last_name}
                    email={item.email} 
                    password={item.password}/>
                )}
            </div>
        </div>
    );
}

export default GetAllCustomers;

import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CompanyDetails from "../../../model/CompanyD";
import CustomerDetails from "../../../model/CustomerD";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import { loginUserString } from "../../../redux/authState";
import notify from "../../../utils/Notify";
import "./myInfo.css";

function MyInformation(): JSX.Element {
    
    var [customerData, setData] = useState(new CustomerDetails());
    const history = useHistory();
    let token: string = store.getState().authState.loginUser.token;

    useEffect(()=>{
            if (store.getState().authState.loginUser.userType != "Customer"){
                notify.error("you are not allowed to enter!")
                history.push("/login");
            }
        axios.get(globals.urls.customer+"CustomerDetails", {headers: {"authorization": token}}).then((response)=>{
            if(response.data.length<1){
                notify.error("not found");
                setData(new CustomerDetails());
                return;
            }
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            console.log(response.data); 
            setData(response.data);
            notify.success("Info was found");
        }).catch(error=>{console.log(error)});
    },[]);
    return (
        <div className="myInfo">
			My Id : {customerData.id} <br />
            My first name : {customerData.first_name} <br />
            My last_name : {customerData.last_name} <br />
            My Email : {customerData.email} <br /> 
            My Password : {customerData.password} <br />
        </div>
    );
}

export default MyInformation;

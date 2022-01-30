import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CompanyDetails from "../../../model/CompanyD";
import CouponData from "../../../model/Coupon";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import { loginUserString } from "../../../redux/authState";
import notify from "../../../utils/Notify";
import "./companyInfo.css";

function CompanyInfo(): JSX.Element {
    var [companyData, setData] = useState(new CompanyDetails());
    const history = useHistory();
    let token: string = store.getState().authState.loginUser.token;

    useEffect(()=>{
            if (store.getState().authState.loginUser.userType != "Company"){
                notify.error("you are not allowed to enter!")
                history.push("/login");
            }

        axios.get(globals.urls.company+"getDetails", {headers: {"authorization": token}}).then((response)=>{
            if(response.data.length<1){
                notify.error("not found");
                setData(new CompanyDetails());
                return;
            }
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            console.log(response.data); 
            setData(response.data);
            notify.success("Info was found");
        }).catch(error=>{console.log(error)});
    },[]);
    return (
        <div className="companyInfo">
			Company id : {companyData.id} <br />
            Company name : {companyData.name} <br />
            Company  email : {companyData.email} <br />
            Company password : {companyData.password} <br />
        </div>
    );
}

export default CompanyInfo;

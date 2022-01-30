import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AxiosSingleCoupon from "../../../axios/axiosSingleCoupon/axiosSingleCoupon";
import SingleCompanyProps from "../../../axios/singleCompanyProps/singleCompanyProps";
import CompanyD from "../../../model/CompanyD";
import CompanyDetails from "../../../model/CompanyD";
import CouponData from "../../../model/Coupon";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import { loginUserString } from "../../../redux/authState";
import GetOneCompany from "../getOneCompany/getOneCompany";
import "./getAllCompanies.css";


function GetAllCompanies(): JSX.Element {
    const [companyData, setData] = useState([new CompanyDetails()]);
    const history = useHistory();
    let token: string = store.getState().authState.loginUser.token;
    useEffect(()=>{
            if (store.getState().authState.loginUser.userType != "Administrator"){
                notify.error("you are not allowed to enter!")
                history.push("/login");
            }
        axios.get(globals.urls.administrator+"allCompanies", {headers: {"Authorization": token}})
        .then((response)=>{
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            console.log(response.data); 
            setData(response.data)
        }).catch(error=>{console.log(error)});
    },[]);

    return (
        <div className="getAllCompanies">
            <div className="companies">
            <h1>Companies</h1><hr/>
			{companyData.map(item=><SingleCompanyProps
            id={item.id}
            name={item.name}
            email={item.email}/>
            )}
            
        </div>
        </div>
    );
}

export default GetAllCompanies;

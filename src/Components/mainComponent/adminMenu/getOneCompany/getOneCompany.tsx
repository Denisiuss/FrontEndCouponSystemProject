import axios from "axios";
import { useState, useEffect, SyntheticEvent } from "react";
import { useHistory } from "react-router-dom";
import CompanyDetails from "../../../model/CompanyD";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import { loginUserString } from "../../../redux/authState";
import "./getOneCompany.css";

function GetOneCompany(): JSX.Element {
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Administrator"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });

    var [companyDetails, setData] = useState(new CompanyDetails());
    let id:string="";
    const history = useHistory();
    let token: string = store.getState().authState.loginUser.token;

    function updateNumber(args:SyntheticEvent){
        id = (args.target as HTMLInputElement).value.toString();
        console.log(id);
    }

    function searchCompany(){
        /*axios.get(myUrl).then((response)=>{setData(response.data)})*/
        axios.get(globals.urls.administrator+"oneCompany/"+id, {headers: {"authorization": token}}).then((response)=>{
            if(response.data.length<1){
                notify.error("company is not found !!!");
                setData(new CompanyDetails());
                return;
            }
            setData(response.data)
            console.log(response.data);
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            notify.success("Company was found !!!");
        }).catch(error=>{console.log(error)});
    }

    return (
        <div className="getOneCompany">
            <input type="number" placeholder="Please enter a company ID" onChange={updateNumber}/>
            <input type="button" value="Search" onClick={searchCompany}/><hr/><br />
            Company id : {companyDetails.id} <br />
            Company name : {companyDetails.name} <br />
            Company email : {companyDetails.email} <br />
            Company password : {companyDetails.password} <br />
        </div>
    );
}

export default GetOneCompany;

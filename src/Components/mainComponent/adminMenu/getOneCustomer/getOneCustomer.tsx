import axios from "axios";
import { useState, SyntheticEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CompanyDetails from "../../../model/CompanyD";
import CustomerDetails from "../../../model/CustomerD";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import { loginUserString } from "../../../redux/authState";
import "./getOneCustomer.css";

function GetOneCustomer(): JSX.Element {
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Administrator"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });
    var [customerDetails, setData] = useState(new CustomerDetails());
    let id:string="";
    const history = useHistory();
    let token: string = store.getState().authState.loginUser.token;

    function updateNumber(args:SyntheticEvent){
        id = (args.target as HTMLInputElement).value.toString();
        console.log(id);
    }

    function searchCompany(){
        /*axios.get(myUrl).then((response)=>{setData(response.data)})*/
        axios.get(globals.urls.administrator+"oneCustomer/"+id, {headers: {"authorization": token}}).then((response)=>{
            if(response.data.length<1){
                notify.error("Customer is not found !!!");
                setData(new CustomerDetails());
                return;
            }
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            setData(response.data)
            console.log(response.data);
            notify.success("Customer was found !!!");
        }).catch(error=>{console.log(error)});
    }
    return (
        <div className="getOneCustomer">
            <input type="number" placeholder="Please enter a company ID" onChange={updateNumber}/>
            <input type="button" value="Search" onClick={searchCompany}/><hr/><br />
            Customer id : {customerDetails.id} <br />
            Customer first name : {customerDetails.first_name} <br />
            Customer last name : {customerDetails.last_name} <br />
            Customer email : {customerDetails.email} <br />
            
        </div>
    );
}

export default GetOneCustomer;

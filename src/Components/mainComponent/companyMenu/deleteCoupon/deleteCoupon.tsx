import axios from "axios";
import { SyntheticEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import { loginUserString } from "../../../redux/authState";
import notify from "../../../utils/Notify";
import "./deleteCoupon.css";

function DeleteCoupon(): JSX.Element {
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Company"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });
    let id:string="";
    const history = useHistory();
    let token: string = store.getState().authState.loginUser.token;

    function updateNumber(args:SyntheticEvent){
        id = (args.target as HTMLInputElement).value.toString();
        console.log(id);
    }

    function deleteCompany(){
        axios.delete(globals.urls.company+"deleteCoupon/"+id, {headers: {"authorization": token}}).then((response)=>{
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            notify.success("successfully deleted");   
            history.push("/companyMenu"); 
        }).catch(error=>{
            console.log(error);
            notify.error("error while deleting coupon");
        });

}
    return (
        <div className="deleteCoupon">
            To delete coupon enter a coupon ID <br /><br /> 
            <input type="number" placeholder="Please enter a coupon ID" onChange={updateNumber}/>
            <input type="button" value="Delete" onClick={deleteCompany}/><br />        
        </div>
    );
}

export default DeleteCoupon;

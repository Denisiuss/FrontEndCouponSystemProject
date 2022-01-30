import axios from "axios";
import { Http2ServerRequest } from "http2";
import { SyntheticEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import { loginUserString } from "../../../redux/authState";
import "./deleteCompany.css";

function DeleteCompany(): JSX.Element {
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Administrator"){
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
        axios.delete(globals.urls.administrator+"deleteCompany/"+id,  {headers: {"authorization": token}}).then((response)=>{
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            notify.success("successfully deleted");
            history.push("/adminMenu")
        }).catch(error=>{
            console.log(error);
            notify.error("error while deleting a company");
        });

}
    return (
        <div className="deleteCompany">
            To delete company enter a company ID <br /><br /> 
            <input type="number" placeholder="Please enter a company ID" onChange={updateNumber}/>
            <input type="button" value="Delete" onClick={deleteCompany}/><br />
        </div>
    );
}

export default DeleteCompany;

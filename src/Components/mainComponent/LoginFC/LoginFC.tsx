import { Button, ButtonGroup, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import "./LoginFC.css";
import UserDetails from "../../model/UserDetails";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import globals from "../../utils/Globals";
import { Alert, Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import notify from "../../utils/Notify";
import store from "../../redux/store";
import { loginUserString } from "../../redux/authState";
import { stringify } from "querystring";

function LoginFC(): JSX.Element {

    const {register, handleSubmit, setError,  formState: { errors }} = useForm<UserDetails>();
    
    const [jwtToken,setToken] = useState("User has no token, bad bad user !!!");
    
    const history = useHistory();


    function send(userDetails:UserDetails){
        
        console.log(userDetails.userType);    
        /*console.log(globals.urls.administrator+"Login");*/
        /*console.log(userDetails);*/
        if (userDetails.userType == "Administrator"){
        axios.post(globals.urls.administrator+"Login" ,userDetails) 
        .then((response)=>{
            console.log(response.data);
            setToken(response.data);
            store.dispatch(loginUserString(response.data));
            notify.success("successfully loged in");
            history.push("/adminMenu");
        }).catch(error=>{
            console.log(error)
            notify.error("you can't touch this !!!");
            setToken("Error in getting response from the server");
        });
    } if (userDetails.userType == "Company"){
        axios.post<string>(globals.urls.company+"Login" ,userDetails) 
        .then((response)=>{
            console.log(response.data);
            setToken(response.data);
            store.dispatch(loginUserString(response.data));
            notify.success("successfully loged in");
            history.push("/companyMenu");
        }).catch(error=>{
            notify.error("you can't touch this !!!");
            setToken("Error in getting response from the server");
        });
    } if (userDetails.userType == "Customer"){
        axios.post<string>(globals.urls.customer+"Login" ,userDetails) 
        .then((response)=>{
            console.log(response.data);
            setToken(response.data);
            store.dispatch(loginUserString(response.data));
            notify.success("successfully loged in");
            history.push("/customerMenu");
        }).catch(error=>{
            notify.error("you can't touch this !!!");
            setToken("Error in getting response from the server");
        });
    }
    }
    return (
        <div className="LoginFC">
            <div className="login">
                <form onSubmit={handleSubmit(send)}>
                    <Typography variant="h4" className="HeadLine">Log in to your Coupons account</Typography><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Email" variant="standard"
                        {...register("email",{
                            required : {value : true, message : "field is required"}
                            ,minLength: {value : 5, message :"minimum length must be 5"}  
                        })} />
                    </Box>
                    <span> {errors.email && <p>{errors.email.message}</p>}</span>
                    <br/><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password" variant="standard"
                        {...register("password",{
                            required : {value : true, message : "field is required"},
                            
                            maxLength: {value : 20, message : "maximum length is 20"}
                        })} />
                    </Box>
                    <span> {errors.password && <p>{errors.password.message}</p>}</span>
                    <br/><br/>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PermIdentityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                    
                    <Select style={{width:250}} {...register("userType", {required : {value : true, message : "field is required"}})}>
                        <MenuItem value={"Administrator"} >Administrator</MenuItem>
                        <MenuItem value={"Company"}>Company</MenuItem>
                        <MenuItem value={"Customer"}>Customer</MenuItem>
                    </Select>
                    </Box>
                    <span> {errors.userType && <p>{errors.userType.message}</p>}</span>
                    <br/><br/>


                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" color="primary">Send</Button>                    
                    </ButtonGroup><br />

                    <Typography variant="h6" className="HeadLine">Don't have account? Sign up right now</Typography><br/>
                    
                    <ButtonGroup variant="contained" fullWidth>
                        <Button onClick={()=>{history.push("/registration");}} color="secondary">Sign up</Button>                    
                    </ButtonGroup><br />
                          
                </form>
            </div>

        </div>
    );
}

export default LoginFC;

import { AccountCircle } from "@mui/icons-material";
import { Typography, Box, TextField, ButtonGroup, Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./addCustomer.css";
import BusinessIcon from '@mui/icons-material/Business';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import CustomerDetails from "../../../model/CustomerD";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import { useEffect } from "react";
import store from "../../../redux/store";
import { loginUserString } from "../../../redux/authState";

function AddCustomer(): JSX.Element {
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Administrator"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });
    
        const {register, handleSubmit, setError,  formState: { errors }} = useForm<CustomerDetails>();
        const history = useHistory();
        let token: string = store.getState().authState.loginUser.token;

        function send(customerDetails:CustomerDetails){
            console.log(customerDetails);
            console.log(globals.urls.administrator+"addCustomer");
            axios.post<string>(globals.urls.administrator+"addCustomer" ,customerDetails, { headers: { "authorization": token } })
            .then((response)=>{console.log(response.data);
                store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
                notify.success("successfully added");
                history.push("/adminMenu");
            }).catch(error=>{
                
                notify.error("error while adding a customer")
            });
        }
    return (
        <div className="addCustomer">
            <div className="add">
                <form onSubmit={handleSubmit(send)}>
                    <Typography variant="h4" className="HeadLine">Add new Customer</Typography><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="First name" variant="standard"
                         {...register("first_name", {
                            required: {value:true, message : "this field is required"},
                            maxLength: {value: 20 , message : "max length is 20"}
                         })}/>
                    </Box>
                    <br/>
                    <span> {errors.first_name && <p>{errors.first_name.message}</p>}</span>
                    <br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Last name" variant="standard"
                         {...register("last_name", {
                            required: {value:true, message : "this field is required"},
                            maxLength: {value: 20 , message : "max length is 20"}
                         })}/>
                    </Box>
                    <br/>
                    <span> {errors.last_name && <p>{errors.last_name.message}</p>}</span>
                    <br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Email" variant="standard" {...register("email",{
                        required: {value:true, message : "this field is required"},
                        maxLength : {value : 50, message : "max length is 50"}
                    })}/>
                    </Box>
                    <br/>
                    <span> {errors.email && <p>{errors.email.message}</p>}</span>
                    <br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField  id="standard-password-input" label="Password" type="password" autoComplete="current-password" variant="standard" 
                    {...register("password",{
                         required: {value:true, message : "this field is required"}   
                    })}/>
                    </Box>
                    <br/>
                    <span> {errors.password && <p>{errors.password.message}</p>}</span>
                    <br/>
                    <br/>
                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" color="primary">Send</Button>
                    </ButtonGroup>
                </form>
            </div>  
        </div>
    );
}

export default AddCustomer;

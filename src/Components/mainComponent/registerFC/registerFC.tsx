import { AccountCircle } from "@mui/icons-material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Box, Button, ButtonGroup, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import UserDetails from "../../model/UserDetails";
import LockIcon from '@mui/icons-material/Lock';
import "./registerFC.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { loginUserString } from "../../redux/authState";
import store from "../../redux/store";
import globals from "../../utils/Globals";
import notify from "../../utils/Notify";
import CustomerDetails from "../../model/CustomerD";

function RegisterFC(): JSX.Element {

    const {register, handleSubmit, setError,  formState: { errors }} = useForm<CustomerDetails>();
    const history = useHistory();

    function send(customerDetails:CustomerDetails){
        axios.post(globals.urls.guest+"registration" ,customerDetails) 
        .then((response)=>{
            console.log(response.data);
            notify.success("successfully registered");
            history.push("/login");
        }).catch(error=>{
            console.log(error)
            notify.error("registration failed");
        });
    }
    
    return (
        <div className="registerFC">
			<div className="login">
                <form onSubmit={handleSubmit(send)}>
                    <Typography variant="h4" className="HeadLine">Registrate your Coupons account</Typography><br/>
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
                        </Box><br />
                        
                        <ButtonGroup variant="contained" fullWidth>
                            <Button type="submit" color="primary">Create an account</Button>                    
                        </ButtonGroup>
                    </form>
            </div>
        </div>
    );
}

export default RegisterFC;

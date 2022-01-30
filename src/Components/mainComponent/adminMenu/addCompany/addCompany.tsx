import { Button, ButtonGroup, createStyles, makeStyles, MenuItem, Select, TextField, Theme } from "@material-ui/core";
import { useForm } from "react-hook-form";
import "./addCompany.css";
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import axios from "axios";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import CompanyDetails from "../../../model/CompanyD";
import { useEffect } from "react";
import store from "../../../redux/store";
import { loginUserString } from "../../../redux/authState";






function AddCompany(): JSX.Element {
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Administrator"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });
    
    const {register, handleSubmit, setError,  formState: { errors }} = useForm<CompanyDetails>();
    const history = useHistory();
    let token: string = store.getState().authState.loginUser.token;
    
    function send(companyDetails:CompanyDetails){
        console.log(companyDetails);
        console.log(globals.urls.administrator+"addCompany");
        axios.post<string>(globals.urls.administrator+"addCompany" ,companyDetails, {headers: {"authorization": token}})
        .then((response)=>{console.log(response.data);
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            notify.success("successfully added");
            history.push("/adminMenu");
        }).catch(error=>{
            
            notify.error("error while adding a company")
        });
    }

    return (
        <div className="AddCompany">
            <div className="add">
                <form onSubmit={handleSubmit(send)}>
                    <Typography variant="h4" className="HeadLine">Add new Company</Typography><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <BusinessIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Company name" variant="standard"
                         {...register("name", {
                            required: {value:true, message : "this field is required"},
                            maxLength: {value: 20 , message : "max length is 20"}
                         })}/>
                    </Box>
                    <br/>
                    <span> {errors.name && <p>{errors.name.message}</p>}</span>
                    <br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Company Email" variant="standard" {...register("email",{
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

export default AddCompany;



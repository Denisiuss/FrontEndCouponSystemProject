import { Typography, Box, FormControl, Input, FormHelperText, TextField, ButtonGroup, Button } from "@mui/material";
import axios from "axios";
import { useState, SyntheticEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CompanyDetails from "../../../model/CompanyD";
import CustomerDetails from "../../../model/CustomerD";
import store from "../../../redux/store";
import { loginUserString } from "../../../redux/authState";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./updateCustomer.css";

function UpdateCustomer(): JSX.Element {
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Administrator"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });
    var [customerDetails, setData] = useState(new CustomerDetails());
    let id:string="";
    let token: string = store.getState().authState.loginUser.token;
    
    const {register, handleSubmit, setError,  formState: { errors }} = useForm<CustomerDetails>();
    const history = useHistory();

    
    function updateNumber(args:SyntheticEvent){
        id = (args.target as HTMLInputElement).value.toString();
        console.log(id);
    }

    function searchCustomer(){
        
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

    function updateComp(customerDetails1:CustomerDetails){
        customerDetails1.id = customerDetails.id;
        
        console.log(customerDetails1);
        console.log(globals.urls.administrator+"updateCompany");
        axios.post<string>(globals.urls.administrator+"updateCustomer" ,customerDetails1, {headers: {"authorization": token}})
        .then((response)=>{console.log(response.data);
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            notify.success("successfully updated");
            history.push("/adminMenu");
        }).catch(error=>{
            
            notify.error("error while updating a customer")
        });

        new CustomerDetails();
        
    }
    return (
        <div className="updateCustomer">
            <div className="add">
                <form onSubmit={handleSubmit(updateComp)}>
                <Typography variant="h4" className="HeadLine">Enter a Customer ID to change its info</Typography><br/>
                <input type="number" placeholder="Please enter a customer ID" onChange={updateNumber}/>
                <input type="button" value="Search" onClick={searchCustomer}/><br />
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <FormControl disabled variant="standard">   
                    <Input id="component-disabled" value={customerDetails.id}
                        {...register("id")} />
                    <FormHelperText>ID</FormHelperText>
                </FormControl>    
            </Box>

            <span> {errors.id && <p>{errors.id.message}</p>}</span>
            <br/><br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <FormControl variant="standard">
                    <TextField id="input-with-sx" label="enter a new first name" variant="standard" 
                        {...register("first_name",{
                            required: {value:true, message : "this field is required"},
                            maxLength: {value: 20 , message : "max length is 20"}
                        })} />
                    <FormHelperText>Current first name : {customerDetails.first_name}</FormHelperText>
                </FormControl>
            </Box>
            <span> {errors.first_name && <p>{errors.first_name.message}</p>}</span>
            <br/><br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <FormControl variant="standard">
                    <TextField id="input-with-sx" label="enter a new last name" variant="standard" 
                        {...register("last_name",{
                            required: {value:true, message : "this field is required"},
                            maxLength: {value: 20 , message : "max length is 20"}
                        })} />
                    <FormHelperText>Current last name : {customerDetails.last_name}</FormHelperText>
                </FormControl>
            </Box>
            <span> {errors.last_name && <p>{errors.last_name.message}</p>}</span>
            <br/><br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <FormControl variant="standard">   
                    <TextField id="input-with-sx" label="enter a new email" variant="standard" 
                        {...register("email",{
                        required: {value:true, message : "this field is required"},
                        maxLength : {value : 50, message : "max length is 50"}
                        })}/>
                    <FormHelperText>Current Email : {customerDetails.email}</FormHelperText>
                </FormControl>
            </Box>
            <br/>
            <span> {errors.email && <p>{errors.email.message}</p>}</span>
            <br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <FormControl variant="standard">   
                    <TextField  id="standard-helperText" label="enter a new password"  variant="standard" 
                        {...register("password",{
                        required: {value:true, message : "this field is required"}   
                        })}/>
                    <FormHelperText>Current Password : {customerDetails.password}</FormHelperText>
                </FormControl>
            </Box>
            <br/>
            <span> {errors.password && <p>{errors.password.message}</p>}</span>
            <br/> <br />

            <ButtonGroup variant="contained" fullWidth>
                <Button type="submit" color="primary">Send</Button>                    
            </ButtonGroup>
            </form>
            </div>
        </div>
    );
}

export default UpdateCustomer;

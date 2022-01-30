import { ButtonGroup, Button, Typography, Box, TextField, FormControl, InputLabel, FormHelperText } from "@material-ui/core";
import { Input } from "@mui/material";
import axios from "axios";
import { useState, SyntheticEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CompanyDetails from "../../../model/CompanyD";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import { loginUserString } from "../../../redux/authState";
import notify from "../../../utils/Notify";
import "./updateCompany.css";

function UpdateCompany(): JSX.Element {
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Administrator"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });
    var [companyDetails, setData] = useState(new CompanyDetails());
    let id:string="";
    const {register, handleSubmit, setError,  formState: { errors }} = useForm<CompanyDetails>();
    const history = useHistory();
    let token: string = store.getState().authState.loginUser.token;

    
    function updateNumber(args:SyntheticEvent){
        id = (args.target as HTMLInputElement).value.toString();
        console.log(id);
    }

    function searchCompany(){
        
        axios.get(globals.urls.administrator+"oneCompany/"+id, {headers: {"authorization": token}}).then((response)=>{
            if(response.data.length<1){
                notify.error("company is not found !!!");
                setData(new CompanyDetails());
                return;
            }
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            setData(response.data)
            console.log(response.data);
            notify.success("Company was found !!!");
        }).catch(error=>{console.log(error)});
    }

    function updateComp(companyDetails1:CompanyDetails){
        if(companyDetails1.id == null || companyDetails1.name == ""){
            notify.error("company wasn't choosen")
            return;
        }
        companyDetails1.id = companyDetails.id;
        companyDetails1.name = companyDetails.name;
        companyDetails1.coupons = companyDetails.coupons;
        console.log(companyDetails1);
        console.log(globals.urls.administrator+"updateCompany");
        axios.post<string>(globals.urls.administrator+"updateCompany" ,companyDetails1, {headers: {"authorization": token}})
        .then((response)=>{console.log(response.data);
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            notify.success("successfully updated");
            history.push("/adminMenu");
        }).catch(error=>{
            
            notify.error("error while updating a company")
        });

        new CompanyDetails();
        
    }
    return (
        
        <div className="updateCompany">
            <div className="add">
            <form onSubmit={handleSubmit(updateComp)}>
            <Typography variant="h4" className="HeadLine">Enter a Company ID to change its info</Typography><br/>
            <input type="number" placeholder="Please enter a company ID" onChange={updateNumber}/>
            <input type="button" value="Search" onClick={searchCompany}/><br />
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <FormControl disabled variant="standard">   
            <Input id="component-disabled" value={companyDetails.id}
                {...register("id")} />
            <FormHelperText>ID</FormHelperText>
            </FormControl>    
            </Box>
            <span> {errors.id && <p>{errors.id.message}</p>}</span>
            <br/><br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <FormControl disabled variant="standard">
            <Input id="component-disabled" value={companyDetails.name} 
                {...register("name")} />
            <FormHelperText>Name</FormHelperText>
            </FormControl>
            </Box>
            <span> {errors.name && <p>{errors.name.message}</p>}</span>
            <br/><br/>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <FormControl variant="standard">   
            <TextField id="input-with-sx" label="enter a new email" variant="standard" 
            {...register("email",{
                required: {value:true, message : "this field is required"},
                maxLength : {value : 50, message : "max length is 50"}
            })}/>
            <FormHelperText>Current Email : {companyDetails.email}</FormHelperText>
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
            <FormHelperText>Current Password : {companyDetails.password}</FormHelperText>
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



export default UpdateCompany;

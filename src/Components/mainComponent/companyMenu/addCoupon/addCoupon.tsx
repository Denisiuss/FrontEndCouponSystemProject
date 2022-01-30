import { Typography, Box, TextField, ButtonGroup, Button, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CouponData from "../../../model/Coupon";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./addCoupon.css";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PinIcon from '@mui/icons-material/Pin';
import DescriptionIcon from '@mui/icons-material/Description';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ImageIcon from '@mui/icons-material/Image';
import { loginUserString } from "../../../redux/authState";
import store from "../../../redux/store";
import { useEffect } from "react";

function AddCoupon(): JSX.Element {
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Company"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });
    
    const {register, handleSubmit, setError,  formState: { errors }} = useForm<CouponData>();
    const history = useHistory();
    let token: string = store.getState().authState.loginUser.token;
    
    function send(couponDetails:CouponData){
        couponDetails.companyId=Number(store.getState().authState.loginUser.userId);
        console.log(couponDetails);
        console.log(globals.urls.company+"addCoupon");
        axios.post<string>(globals.urls.company+"addCoupon" ,couponDetails, {headers: {"authorization": token}})
        .then((response)=>{console.log(response.data);
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            notify.success("successfully added");
            history.push("/companyMenu");
        }).catch(error=>{
            notify.error("error while adding a company")
        });
    }
    return (
        <div className="addCoupon">
			<div className="add">
                <form onSubmit={handleSubmit(send)}>
                    <Typography variant="h4" className="HeadLine">Add new Coupon</Typography><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SubtitlesIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="title" variant="standard"
                         {...register("title", {
                            required: {value:true, message : "this field is required"},
                            maxLength: {value: 20 , message : "max length is 20"}
                         })}/>
                    </Box>
                    <br/>
                    <span> {errors.title && <p>{errors.title.message}</p>}</span>
                    <br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <CategoryIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <Select style={{width:200}} label="categories" variant="standard"
                                {...register("categories", {
                                    required: {value:true, message : "this field is required"}
                                 })}>
                            <MenuItem value={"Food"}>Food</MenuItem> <br />
                            <MenuItem value={"Electronic"}>Electronic</MenuItem>  <br />
                            <MenuItem value={"House"}>House</MenuItem> <br />
                            <MenuItem value={"Beauty"}>Beauty</MenuItem> <br />
                            <MenuItem value={"Travel"}>Travel</MenuItem> <br />
                            <MenuItem value={"Events"}>Events</MenuItem> <br />
                            <MenuItem value={"Fashion"}>Fashion</MenuItem> <br />
                        </Select>     
                    </Box>

                    <br/>
                    <span> {errors.categories && <p>{errors.categories.message}</p>}</span>
                    <br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <DescriptionIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="standard-multiline-static" label="description" variant="standard" multiline 
                    {...register("description",{
                        required: {value:true, message : "this field is required"},
                        maxLength : {value : 300, message : "max length is 300"}
                    })}/>
                    </Box>
                    <br/>
                    <span> {errors.description && <p>{errors.description.message}</p>}</span>
                    <br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PinIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField  id="input-with-sx" label="amount" variant="standard" 
                    {...register("amount",{
                         required: {value:true, message : "this field is required"}   
                    })}/>
                    </Box>
                    <br/>
                    <span> {errors.amount && <p>{errors.amount.message}</p>}</span>
                    <br/>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccessTimeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="date" label="start date" type="date" InputLabelProps={{ shrink: true,}}
                                {...register("start_date",{
                                    required: {value:true, message : "this field is required"} 
                                })}/>
                    </Box>
                    <br/>
                    <span> {errors.start_date && <p>{errors.start_date.message}</p>}</span>
                    <br/>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccessTimeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="date" label="end_date" type="date" InputLabelProps={{ shrink: true,}}
                                {...register("end_date",{
                                    required: {value:true, message : "this field is required"} 
                                })}/>
                    </Box>
                    <br/>
                    <span> {errors.end_date && <p>{errors.end_date.message}</p>}</span>
                    <br/>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AttachMoneyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField  id="input-with-sx" type="number" label="price" variant="standard" 
                    {...register("price",{
                         required: {value:true, message : "this field is required"}   
                    })}/>
                    </Box>
                    <br/>
                    <span> {errors.price && <p>{errors.price.message}</p>}</span>
                    <br/>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ImageIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField  id="input-with-sx" type="link" label="image" variant="standard" 
                    {...register("image",{
                         required: {value:true, message : "this field is required"}   
                    })}/>
                    </Box>
                    <br/>
                    <span> {errors.image && <p>{errors.image.message}</p>}</span>
                    <br/>

                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" color="primary">Send</Button>
                    </ButtonGroup>
                </form>
            </div>  
        </div>
    );
}

export default AddCoupon;

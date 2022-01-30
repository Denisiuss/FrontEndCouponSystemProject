import { Typography, FormControl, Input, FormHelperText, TextField, ButtonGroup, Button, MenuItem, Select } from "@material-ui/core";
import { Box } from "@mui/system";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CouponData from "../../../model/Coupon";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./updateCoupon.css";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PinIcon from '@mui/icons-material/Pin';
import DescriptionIcon from '@mui/icons-material/Description';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ImageIcon from '@mui/icons-material/Image';
import store from "../../../redux/store";
import { loginUserString } from "../../../redux/authState";
import { useHistory } from "react-router-dom";


function UpdateCoupon(): JSX.Element {
    const history = useHistory();
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Company"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });
    const {register, handleSubmit, formState: { errors }} = useForm<CouponData>();
    var [couponDetails, setData] = useState(new CouponData());
    let id:string="";
    let token: string = store.getState().authState.loginUser.token;

    function updateNumber(args:SyntheticEvent){
        id = (args.target as HTMLInputElement).value.toString();
        console.log(id);
    }

    function updateCoupon(couponData1:CouponData){
        couponData1.id = couponDetails.id;
        couponData1.companyId = couponDetails.companyId;
        if (couponData1.id == null || couponData1.companyId == null){
            notify.error("No coupon was selected")
            return;
        }
        console.log(couponData1);
        console.log(globals.urls.company+"updateCoupon");
        axios.post<string>(globals.urls.company+"updateCoupon" ,couponData1, {headers: {"Authorization": token}}).then((response)=>{
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            console.log(response.data);
            notify.success("successfully updated");
            history.push("/companyMenu");   
        }).catch(error=>{
            
            notify.error("error while updating a coupon")
        });

        new CouponData();
        
    }

    function searchCoupon(){
        
        axios.get(globals.urls.company+"getOneCouponById/"+id, {headers: {"authorization": token}}).then((response)=>{
            if(response.data.length<1){
                notify.error("Coupon is not found !!!");
                setData(new CouponData());
                return;
            }
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            setData(response.data)
            console.log(response.data);
            notify.success("Coupon was found !!!");
        }).catch(error=>{console.log(error)});
        
    }
    return (
        <div className="updateCoupon">
			<div className="add">
                <form onSubmit={handleSubmit(updateCoupon)}>
                <Typography variant="h4" className="HeadLine">Enter a Coupon ID to update</Typography><br/>
                <input type="number" placeholder="Please enter a coupon ID" onChange={updateNumber}/>
                <input type="button" value="Search" onClick={searchCoupon}/><br />
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <FormControl disabled variant="standard">   
                    <Input id="component-disabled" value={couponDetails.id}
                        {...register("id")} />
                    <FormHelperText>ID</FormHelperText>
                </FormControl>    
            </Box>

            <span> {errors.id && <p>{errors.id.message}</p>}</span>
            <br/><br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <FormControl disabled variant="standard">   
                    <Input id="component-disabled" value={couponDetails.companyId}
                        {...register("companyId")} />
                    <FormHelperText>Company ID</FormHelperText>
                </FormControl>    
            </Box>

            <span> {errors.companyId && <p>{errors.companyId.message}</p>}</span>
            <br/><br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <FormControl variant="standard">
                <DescriptionIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="standard-multiline-static" value={couponDetails.description} label="description" variant="standard" multiline 
                    {...register("description",{
                        required: {value:true, message : "this field is required"},
                        maxLength : {value : 300, message : "max length is 300"}
                    })}/>
                    <FormHelperText>Current first name : {couponDetails.description}</FormHelperText>
                </FormControl>
            </Box>
            <span> {errors.description && <p>{errors.description.message}</p>}</span>
            <br/><br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <CategoryIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <Select style={{width:200}} label="categories" variant="standard"
                        {...register("categories", {
                            required: {value:true, message : "this field is required"}
                            })}>
                    <MenuItem value={"Food"}>Food</MenuItem>
                    <MenuItem value={"Electronic"}>Electronic</MenuItem>
                    <MenuItem value={"House"}>House</MenuItem>
                    <MenuItem value={"Beauty"}>Beauty</MenuItem>
                    <MenuItem value={"Travel"}>Travel</MenuItem>
                    <MenuItem value={"Events"}>Events</MenuItem>
                    <MenuItem value={"Fashion"}>Fashion</MenuItem>
                </Select>     
            </Box>
            <span> {errors.categories && <p>{errors.categories.message}</p>}</span>
            <br/><br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <SubtitlesIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" value={couponDetails.title} label="title" variant="standard"
                    {...register("title", {
                    required: {value:true, message : "this field is required"},
                    maxLength: {value: 20 , message : "max length is 20"}
                    })}/>
            </Box>
            <br/>
            <span> {errors.title && <p>{errors.title.message}</p>}</span>
            <br/>
    
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <PinIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField  id="input-with-sx" value={couponDetails.amount} type="number" label="amount" variant="standard" 
            {...register("amount",{
                    required: {value:true, message : "this field is required"}   
            })}/>
            </Box>
            <br/>
            <span> {errors.amount && <p>{errors.amount.message}</p>}</span>
            <br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccessTimeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="date" label="start date" value={couponDetails.start_date} type="date" InputLabelProps={{ shrink: true,}}
                        {...register("start_date",{
                            required: {value:true, message : "this field is required"} 
                        })}/>
            </Box>
            <br/>
            <span> {errors.start_date && <p>{errors.start_date.message}</p>}</span>
            <br/>
            
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccessTimeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="date" value={couponDetails.end_date} label="end_date" type="date" InputLabelProps={{ shrink: true,}}
                        {...register("end_date",{
                            required: {value:true, message : "this field is required"} 
                        })}/>
            </Box>
            <br/>
            <span> {errors.end_date && <p>{errors.end_date.message}</p>}</span>
            <br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AttachMoneyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField  id="input-with-sx" value={couponDetails.price} type="number" label="price" variant="standard" 
                        {...register("price",{
                             required: {value:true, message : "this field is required"}   
                        })}/>
            </Box>
            <br/>
            <span> {errors.price && <p>{errors.price.message}</p>}</span>
            <br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ImageIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField  id="input-with-sx" value={couponDetails.image} type="link" label="image" variant="standard" 
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

export default UpdateCoupon;

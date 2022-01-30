import { Select, MenuItem } from "@material-ui/core";
import { Box } from "@mui/system";
import axios from "axios";
import { useState, useEffect, SyntheticEvent } from "react";
import { useHistory } from "react-router-dom";
import CouponData from "../../../model/Coupon";
import globals from "../../../utils/Globals";
import CategoryIcon from '@mui/icons-material/Category';
import "./couponsByCategory.css";
import { Button, FormControl, InputLabel, SelectChangeEvent, Typography } from "@mui/material";
import notify from "../../../utils/Notify";
import { loginUserString } from "../../../redux/authState";
import AxiosSingleCoupon from "../../../axios/axiosSingleCoupon/axiosSingleCoupon";
import { ChangeEvent } from "react";
import store from "../../../redux/store";

function MyCouponsByCategory(): JSX.Element {
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Customer"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });
    const [couponData, setData] = useState([new CouponData()]);
    const history = useHistory();
    let token: string = store.getState().authState.loginUser.token;
    const [value, setValue] = useState<String>();

    const handleChange=(event: React.ChangeEvent<{value: unknown}>) => {const values = event.target.value; setValue(values as string);};
    
    


    function findCouponsByCategory (){
        axios.get(globals.urls.customer+"myCouponsByCategory/"+value, {headers: {"authorization": token}}).then((response)=>{
            if(response.data.length<1){
                notify.error("Coupons are not found !!!");
                setData([new CouponData()]);
                return;
            }
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            setData(response.data)
            console.log(response.data);
            notify.success("Coupons were found !!!");
        }).catch(error=>{console.log(error)});
    }

    return (
        <div className="couponsByCategory">
            <div className="add">
            
            <Typography variant="h4" className="HeadLine">Choose category</Typography><br/>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <CategoryIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <Select onChange={handleChange} style={{width:200}} labelId="select-helper" id="select-helper"> 
                        <MenuItem value={"Food"}>Food</MenuItem>
                        <MenuItem value={"Electronic"}>Electronic</MenuItem>
                        <MenuItem value={"House"}>House</MenuItem>
                        <MenuItem value={"Beauty"}>Beauty</MenuItem>
                        <MenuItem value={"Travel"}>Travel</MenuItem>
                        <MenuItem value={"Events"}>Events</MenuItem>
                        <MenuItem value={"Fashion"}>Fashion</MenuItem>
                    </Select>
                    
                    <input type="button" value="Find" onClick={findCouponsByCategory}/><br />
            </Box>
            <br /> <br />
            
            {couponData.map(item=><AxiosSingleCoupon 
                image={item.image}
                title={item.title}
                price={item.price} id={0} 
                companyId={item.companyId} 
                categories={item.categories} 
                description={item.description} 
                start_date={item.start_date} 
                end_date={item.end_date} 
                amount={item.amount}
                />)}
        </div>
        </div>
    );
}

export default MyCouponsByCategory;

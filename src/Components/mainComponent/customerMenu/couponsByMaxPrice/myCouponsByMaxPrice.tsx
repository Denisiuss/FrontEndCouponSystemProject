import { Typography, Box } from "@mui/material";
import axios from "axios";
import { useState, SyntheticEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AxiosSingleCoupon from "../../../axios/axiosSingleCoupon/axiosSingleCoupon";
import CouponData from "../../../model/Coupon";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import { loginUserString } from "../../../redux/authState";
import notify from "../../../utils/Notify";
import "./couponsByMaxPrice.css";

function MyCouponsByMaxPrice(): JSX.Element {
    useEffect(()=>{
        
        if (store.getState().authState.loginUser.userType != "Customer"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
    });
    const [couponData, setData] = useState([new CouponData()]);
    let price:string="";
    let token: string = store.getState().authState.loginUser.token;
    const history = useHistory();

    function updateNumber(args:SyntheticEvent){
        price = (args.target as HTMLInputElement).value.toString();
    }
    
    


    function findCouponsByCategory (){
        axios.get(globals.urls.customer+"myCoupons/"+price, {headers: {"authorization": token}}).then((response)=>{
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
        <div className="couponsByMaxPrice">
            <div className="add">

                <Typography variant="h4" className="HeadLine">Enter max price</Typography><br/>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <input type="number" placeholder="Please enter a coupon ID" onChange={updateNumber}/>
                <input type="button" value="Find" onClick={findCouponsByCategory}/><br />
                </Box>    
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

export default MyCouponsByMaxPrice;

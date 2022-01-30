import { Typography } from "@mui/material";
import axios from "axios";
import globals from "../../utils/Globals";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AxiosSingleCoupon from "../../axios/axiosSingleCoupon/axiosSingleCoupon";
import CouponData from "../../model/Coupon";
import "./mainDisplay.css";

function MainDisplay(): JSX.Element {
    const myUrl="http://localhost:8080/guest/allCoupons";
    const [couponData, setData] = useState([new CouponData()]);
    const history = useHistory();
    useEffect(()=>{
        /*axios.get(myUrl).then((response)=>{setData(response.data)})*/
        axios.get(globals.urls.guest+"allCoupons").then((response)=>{
            console.log(response.data); 
            setData(response.data)
        }).catch(error=>{console.log(error)});
    },[10]);
    return (
        <div className="mainDisplay">
			<div className="mainscreen">
                <br /><Typography variant="h3" className="HeadLine">Today's best offer</Typography><br/><br />
                {couponData.map(item=><AxiosSingleCoupon 
                image={item.image}
                title={item.title}
                price={item.price} 
                id={item.id} 
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

export default MainDisplay;

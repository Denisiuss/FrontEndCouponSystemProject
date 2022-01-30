import { Typography } from "@mui/material";
import axios from "axios";
import globals from "../../utils/Globals";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CouponData from "../../model/Coupon";
import AxiosSingleCoupon from "../axiosSingleCoupon/axiosSingleCoupon";
import "./axiosCouponsList.css";


interface AxiosCouponsListState {
    couponData:CouponData[] 
 }

function AxiosCouponsList(): JSX.Element {
    const myUrl="http://localhost:8080/guest/allCoupons";
    const [couponData, setData] = useState([new CouponData()]);
    const history = useHistory();
    useEffect(()=>{
        /*axios.get(myUrl).then((response)=>{setData(response.data)})*/
        axios.get(globals.urls.guest+"allCoupons").then((response)=>{
            console.log(response.data); 
            setData(response.data)
        }).catch(error=>{console.log(error)});
    },[]);
    return (
        <div className="axiosCouponsList">
			 <Typography variant="h4" className="HeadLine">All Coupons</Typography><br/><hr/>
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
    );
}

export default AxiosCouponsList;

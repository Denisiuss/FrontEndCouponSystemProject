import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AxiosSingleCoupon from "../../../axios/axiosSingleCoupon/axiosSingleCoupon";
import CouponData from "../../../model/Coupon";
import store from "../../../redux/store";
import { loginUserString } from "../../../redux/authState";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./showMyCoupons.css";

function ShowMyCoupons(): JSX.Element {
    const [couponData, setData] = useState([new CouponData()]);
    const history = useHistory();
    let token: string = store.getState().authState.loginUser.token;
    useEffect(()=>{
        if (store.getState().authState.loginUser.userType != "Customer"){
            notify.error("you are not allowed to enter!")
            history.push("/login");
        }
        axios.get(globals.urls.customer+"getMyCoupons", {headers: {"authorization": token}}).then((response)=>{
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            console.log(response.data); 
            setData(response.data)
        }).catch(error=>{console.log(error)});
    },[]);
    return (
        <div className="showMyCoupons">
            {couponData.map(item=><AxiosSingleCoupon             
                image={item.image}
                title={item.title}
                price={item.price} id={0} 
                companyId={item.companyId} 
                categories={item.categories} 
                description={item.description} 
                start_date={item.start_date} 
                end_date={item.end_date} 
                amount={item.amount}/>
            )};   
        </div>
    );
}

export default ShowMyCoupons;

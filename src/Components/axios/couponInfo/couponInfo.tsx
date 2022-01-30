import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CouponData from "../../model/Coupon";
import { loginUserString } from "../../redux/authState";
import store from "../../redux/store";
import globals from "../../utils/Globals";
import notify from "../../utils/Notify";
import "./couponInfo.css";

interface couponProps{
    id:string;
}

function CouponInfo(props:couponProps): JSX.Element {
    const [couponData,setData] = useState(new CouponData());
    let token: string = store.getState().authState.loginUser.token;
    

    useEffect(()=>{
        axios.get(globals.urls.guest+"oneCouponById/"+props.id).then((response)=>{
        setData(response.data)
        console.log(response.data);
    }).catch(error=>{console.log(error)});
},[]);

    function purchaseCoupon(){
        if (store.getState().authState.loginUser.userType != "Customer"){
            notify.error("Log in to purchase coupons");
        }
        axios.post<string>(globals.urls.customer+"purchaseCoupon" ,couponData, {headers: {"authorization": token}})
        .then((response)=>{console.log(response.data);
            store.dispatch(loginUserString(response.headers.Authorization = `${token}`));
            notify.success("successfully purchased");    
        }).catch(error=>{
            notify.error("error while purchasing coupon")
            console.log(error)
        });
    }

    return (
        <div className="couponInfo">
			<img src={couponData.image} width="30%" alt="main" className="imgCoupon"/>
            <div className = "smallBox">
                <h2>{couponData.title}</h2> <br /> <br />
                <h2> Category: </h2>{couponData.categories} <br />
                <h2> Description: </h2>{couponData.description} <br />
                <h2>Amaunt: </h2>{couponData.amount} <br />
                <h2> Available from: </h2>{couponData.start_date} till {couponData.end_date} <br />
                <h2> Price: </h2>{couponData.price} NIS<br /> <br />
                <button className="couponBTN" onClick={purchaseCoupon}>Purchase</button>
            </div>

        </div>
    );
}

export default CouponInfo;

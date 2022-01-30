import { useHistory } from "react-router-dom";
import "./axiosSingleCoupon.css";

interface AxiosSingleCouponProps {
    id:number,
    companyId:number,
    categories:string,
    description:string,
    start_date:string,
    end_date:string,
    amount:number,
    image:string,
    title:string,
    price:number
}

function AxiosSingleCoupon(props: AxiosSingleCouponProps): JSX.Element {
    let history = useHistory();
    
    function showCoupon(){
        history.push("/singleCoupon/"+props.id);    
    }

    const size=50;
    return (
        <div className="axiosSingleCoupon couponBox">
            {/*
            <h1>Coupon</h1><hr/>
			{props.title}<hr/>
            {props.categories}<br/>
            {props.amount}<br/>
            {props.price + " ₪"}<br/>
            {props.image}<br/><br/>
            */}
            <img src={props.image} alt="" className = "cardImg"/>
            <h2 className="card_name">{props.title}</h2>
            <p className="card_price">{props.price + " ₪"}</p>
            <button className="card_btn" onClick={showCoupon}>More Info</button>
        </div>
    );
}

export default AxiosSingleCoupon;

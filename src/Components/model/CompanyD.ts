import CouponData from "./Coupon";

export default class CompanyDetails{
    /*public name:string="";
    public email:string="";
public password: string="";*/
    id!:number;
    name!:string;
    email!:string;
    password!:string;
    coupons!:CouponData;

}
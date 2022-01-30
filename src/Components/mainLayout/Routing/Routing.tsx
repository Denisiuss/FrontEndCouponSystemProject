import { Redirect, Route, Switch } from "react-router-dom";
import AxiosCouponsList from "../../axios/axiosCouponsList/axiosCouponsList";
import AddCoupon from "../../mainComponent/companyMenu/addCoupon/addCoupon";

import AddCompany from "../../mainComponent/adminMenu/addCompany/addCompany";
import AddCustomer from "../../mainComponent/adminMenu/addCustomer/addCustomer";
import DeleteCompany from "../../mainComponent/adminMenu/deleteCompany/deleteCompany";
import DeleteCustomer from "../../mainComponent/adminMenu/deleteCustomer/deleteCustomer";
import GetAllCompanies from "../../mainComponent/adminMenu/getAllCompanies/getAllCompanies";
import GetAllCustomers from "../../mainComponent/adminMenu/getAllCustomers/getAllCustomers";
import GetOneCompany from "../../mainComponent/adminMenu/getOneCompany/getOneCompany";
import GetOneCustomer from "../../mainComponent/adminMenu/getOneCustomer/getOneCustomer";
import UpdateCompany from "../../mainComponent/adminMenu/updateCompany/updateCompany";
import UpdateCustomer from "../../mainComponent/adminMenu/updateCustomer/updateCustomer";
import LoginFC from "../../mainComponent/LoginFC/LoginFC";
import AdminMenu from "../adminMenu/adminMenu";
import CompanyMenu from "../companyMenu/companyMenu";
import CustomerMenu from "../customerMenu/customerMenu";
import MainDisplay from "../mainDisplay/mainDisplay";
import Page404 from "../page404/page404";
import DeleteCoupon from "../../mainComponent/companyMenu/deleteCoupon/deleteCoupon";
import CouponsByCategory from "../../mainComponent/companyMenu/couponsByCategory/couponsByCategory";
import CompanyInfo from "../../mainComponent/companyMenu/companyInfo/companyInfo";
import CouponsByMaxPrice from "../../mainComponent/companyMenu/couponsByMaxPrice/couponsByMaxPrice";
import UpdateCoupon from "../../mainComponent/companyMenu/updateCoupon/updateCoupon";
import AllCoupons from "../../mainComponent/companyMenu/allCoupons/allCoupons";
import ShowMyCoupons from "../../mainComponent/customerMenu/showMyCoupons/showMyCoupons";
import MyCouponsByCategory from "../../mainComponent/customerMenu/couponsByCategory/myCouponsByCategory";
import MyCouponsByMaxPrice from "../../mainComponent/customerMenu/couponsByMaxPrice/myCouponsByMaxPrice";
import MyInformation from "../../mainComponent/customerMenu/myInfo/myInformation";
import CouponInfo from "../../axios/couponInfo/couponInfo";
import Logout from "../../mainComponent/logout/logout";
import RegisterFC from "../../mainComponent/registerFC/registerFC";
import Contacts from "../../mainComponent/contacts/contacts";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
            <Route path="/home" component={MainDisplay} exact/>
            <Route path="/login" component={LoginFC} exact/>
            <Route path="/coupons" component={AxiosCouponsList} exact/>
            <Route path="/adminMenu" component={AdminMenu} exact/>
            <Route path="/addCompany" component={AddCompany} exact/>
            <Route path="/addCustomer" component={AddCustomer} exact/>
            <Route path="/addCoupon" component={AddCoupon} exact/>
            <Route path="/companyMenu" component={CompanyMenu} exact/>
            <Route path="/customerMenu" component={CustomerMenu} exact/>
            <Route path="/getOneCompany" component={GetOneCompany} exact/>
            <Route path="/getAllCompanies" component={GetAllCompanies} exact/>
            <Route path="/getAllCustomers" component={GetAllCustomers} exact/>
            <Route path="/getOneCustomer" component={GetOneCustomer} exact/>
            <Route path="/deleteCompany" component={DeleteCompany} exact/>
            <Route path="/deleteCustomer" component={DeleteCustomer} exact/>
            <Route path="/updateCompany" component={UpdateCompany} exact/>
            <Route path="/updateCustomer" component={UpdateCustomer} exact/>
            <Route path="/deleteCoupon" component={DeleteCoupon} exact/>
            <Route path="/getCompaniesCouponByCategory" component={CouponsByCategory} exact/>
            <Route path="/companyInfo" component={CompanyInfo} exact/>
            <Route path="/getCompaniesCouponByMaxPrice" component={CouponsByMaxPrice} exact/>
            <Route path="/updateCoupon" component={UpdateCoupon} exact/>
            <Route path="/getAllCompaniesCoupons" component={AllCoupons} exact/>
            <Route path="/ShowMyCoupons" component={ShowMyCoupons} exact/>
            <Route path="/ShowMyCouponsByCategory" component={MyCouponsByCategory} exact/>
            <Route path="/ShowMyCouponsByMaxPrice" component={MyCouponsByMaxPrice} exact/>
            <Route path="/myInfo" component={MyInformation} exact/>
            <Route path="/singleCoupon/:couponId" render={(props)=><CouponInfo id={props.match.params.couponId}/>} exact/>
            <Route path="/logout" component={Logout} exact/>
            <Route path="/purchaseCoupon" component={AxiosCouponsList} exact/> 
            <Route path="/registration" component={RegisterFC} exact/>
            <Route path="/customers" component={CustomerMenu} exact/>  
            <Route path="/contact" component={Contacts} exact/>              
                {/* for redirecting our pages we will use Redirect*/}
                <Redirect from="/" to="/home" exact/>
                {/* handle page 404 , Must be the last one in the order */}
                <Route component={Page404}/>

            </Switch>
        </div>
    );
}

export default Routing;

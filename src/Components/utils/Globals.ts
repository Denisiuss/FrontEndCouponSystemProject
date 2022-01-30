class Globals{}

class DevelopmentGlobals extends Globals{
    public urls = {
        administrator : "https://coupon-system-back.herokuapp.com/admin/",
        //administrator : "http://localhost:8080/admin/",
        company : "https://coupon-system-back.herokuapp.com/company/",
        //company : "http://localhost:8080/company/",
        customer : "https://coupon-system-back.herokuapp.com/customer/",
        //customer : "http://localhost:8080/customer/",
        guest : "https://coupon-system-back.herokuapp.com/guest/"
        //guest : "http://localhost:8080/guest/"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        administrator : "/admin/",
        company : "/company/",
        customer : "/customer/",
        guest : "/guest/",
        general : "/"
    }
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;
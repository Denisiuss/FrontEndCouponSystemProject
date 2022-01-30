import "./layout.css";
import { BrowserRouter } from "react-router-dom";
import Header from "../header/header";
import Routing from "../Routing/Routing";
import Footer from "../footer/footer";
import AsideMenu from "../asideMenu/asideMenu";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <BrowserRouter>
            <header>
                <Header/>
            </header>
            <aside>
                <AsideMenu/>
            </aside>
            <main>
                <Routing/>
            </main>
            <footer>
                <Footer/>
            </footer>
            
            </BrowserRouter>
        </div>
    );
}

export default Layout;

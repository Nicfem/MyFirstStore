import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import './Layout.scss'


const Layout = () => {
    return (
        <>
            <Header/>
                <Outlet/>
            <footer></footer>   
        </>
    )
}

export default Layout
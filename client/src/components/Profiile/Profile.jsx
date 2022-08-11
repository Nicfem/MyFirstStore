import './Profile.scss'
import { useDispatch } from "react-redux";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Favorites } from "./Favorites/Favorites";
import { AdminProfile } from "./Admin/Admin";
import { UserInfo } from "./PersonalData/UserInfo";
import { Orders } from "./Orders/Orders";
import { Order } from "./Orders/Order";
import { PersonalData } from "./PersonalData/personalData";
import { logout } from "../../Redux/User/userSlice";
import { PurchaseHistory } from "./PurchaseHistory/PurchaseHistory";


const Pages = {
    profileuserInfo : 'Общие сведения',
    profilepassword: 'Изменить пароль',
    profileinfo: 'Личные данные',
    profileoption: 'История покупок',
    profileFavorites: 'Избранное',
    profileadmin: 'Админ панель',
    profileOrders: 'Заказы',
    profileOrder: 'Заказ',
}



const Profile = () => {
    const location = useLocation()
    const dispath = useDispatch()
    const curentPage = Pages[location.pathname.split('/').join('')]

    return (
        <>
            <div className="container">
                <div className="location">
                    <p className="location__curent-page">{curentPage || 'Заказ'}</p>
                    <ul className="header-navigation">
                        <NavLink className='NavLink header-navigation__item'
                            to={'userInfo'}><li>Общие сведения</li></NavLink>
                        <NavLink className='NavLink header-navigation__item'
                            to={'info'}><li>Личные данные</li></NavLink>
                        <NavLink className='NavLink header-navigation__item'
                            to={'option'}><li>История покупок</li></NavLink>
                        <NavLink className='NavLink header-navigation__item'
                            to={'Favorites'}><li>Избранное</li></NavLink>
                        <NavLink className='NavLink header-navigation__item' 
                            to={'password'}><li>Изменить пароль</li></NavLink>
                        <NavLink className='NavLink header-navigation__item'
                            to={'admin'}><li>Админ панель</li></NavLink>
                        <NavLink className='NavLink header-navigation__item' 
                            to={'Orders'}><li>Заказы</li></NavLink>
                        <li className="header-navigation__item" 
                            onClick={() => dispath(logout())}>
                            <p>Выйти</p>
                        </li>
                    </ul>
                </div>
                <div className="content-profile">
                    <ul className="navigation">
                        <NavLink className='NavLink navigation__item'
                            to={'userInfo'}><li>Общие сведения</li></NavLink>
                        <NavLink className='NavLink navigation__item'
                            to={'info'}><li>Личные данные</li></NavLink>
                        <NavLink className='NavLink navigation__item'  
                            to={'option'}><li>История покупок</li></NavLink>
                        <NavLink className='NavLink navigation__item' 
                            to={'Favorites'}><li>Избранное</li></NavLink>
                        <NavLink className='NavLink navigation__item' 
                            to={'password'}><li>Изменить пароль</li></NavLink>
                        <NavLink className='NavLink navigation__item' 
                            to={'admin'}><li>Админ панель</li></NavLink>
                        <NavLink className='NavLink navigation__item' 
                            to={'Orders'}><li>Заказы</li></NavLink>
                        <li className="navigation__item" 
                            onClick={() => dispath(logout())}>
                            <p>Выйти</p>
                        </li>
                    </ul>
                    <Routes>
                        <Route index path="/userInfo" element={<UserInfo/>}></Route>
                        <Route path="info" element={<PersonalData/>}></Route>
                        <Route path="option" element={<PurchaseHistory/>}></Route>
                        <Route path="Favorites" element={<Favorites/>}></Route>
                        <Route path="password" element={<h1>password</h1>}></Route>
                        <Route path="about" element={<h1>about</h1>}></Route>
                        <Route path="admin" element={<AdminProfile/>}></Route>
                        <Route path="Orders" element={<Orders/>}></Route>
                        <Route path="Order/:id" element={<Order/>}></Route>
                        <Route path="*" element={<h1>Error</h1>}></Route>
                    </Routes>
                </div>
            </div>
        </>
    )
}


export default Profile
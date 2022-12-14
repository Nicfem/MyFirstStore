import React from "react";
import './Header.scss'
import { NavLink } from 'react-router-dom'
import LogoSVG from "../../assets/svg/logo";
import LikeAction from "../../assets/svg/NoLike";
import { ShopCartAction } from './../../assets/svg/ShopCartAction'
import MenuIcon from "../../assets/svg/menu-icon"
import { useSelector } from "react-redux";
import ProfileSVG from "../../assets/svg/profileSVG";
import { Like } from "../../assets/svg/Like";
import { selectUser } from "../../selectors/selectors";
import { useState } from "react";
import { Modal } from "../../shared/Interface";
import { AuthCard } from "../Auth/AuthCard";
import { BasketModal } from "../Basket/BasketModal/BasketModal";
import { Search } from "./Search/Search";


const Header = () => {

    let auth = useSelector(state => state.user.isAuth)
    const User = useSelector(selectUser)
    const [activeBasket, setActiveBasket] = useState(false)
    const [activeAuth, setActiveAuth] = useState(false)
    
    return (
        <>
            <header className="header">
                <Modal active={activeBasket} setActive={setActiveBasket}>
                    <BasketModal setActive={setActiveBasket}/>
                </Modal>
                <Modal active={activeAuth} setActive={setActiveAuth}>
                    <AuthCard setActive={setActiveAuth}/>
                </Modal>
                <div className="container">
                    <div className="header__top top-header">
                        <div className="top-header__container">
                            <NavLink to='/' className="top-header__logo"><LogoSVG/></NavLink>
                            <div className="top-header__search">
                                <Search/>
                                <ul className="actions-header">
                                    {auth ? 
                                        <NavLink to='profile/Favorites'>
                                            <li className="actions-header__group group">
                                                    {User?.favoritesGoods.length ? 
                                                        <span className="group__item">
                                                            <Like/> 
                                                            <p className="group__counterLike">
                                                                {User?.favoritesGoods.length}
                                                            </p>
                                                        </span>
                                                    
                                                    : 
                                                        <LikeAction/> 
                                                    }
                                            </li>
                                        </NavLink>
                                        :
                                        <li onClick={() => setActiveAuth(true)} className="actions-header__group group">
                                            <LikeAction/> 
                                        </li>
                                    }
                                        <li className="actions-header__group group">
                                            {User?.basket.length ?
                                                <NavLink to='basket'>
                                                    <span className="group__item">
                                                        <ShopCartAction/>
                                                        <p className="group__counterLike">
                                                        {User?.basket.length}
                                                        </p>
                                                    </span>
                                                </NavLink>
                                            :
                                                <span className="group__item" onClick={() => setActiveBasket(true)}>
                                                    <ShopCartAction/>
                                                </span>
                                            }
                                        </li>
                                    
                                    {auth ? 
                                        <NavLink to='profile/userInfo'>
                                            <span className="actions-header__profiel">
                                                <ProfileSVG/>
                                            </span>
                                        </NavLink> 
                                        : 
                                        <button 
                                            className="group__button"
                                            onClick={() => setActiveAuth(true)}
                                        >??????????</button>
                                    } 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header__catalog catalog-header">
                    <div className="catalog-header__container">
                        <div className="container">
                            <div className="catalog-header__action catalog-action">
                                <div className="catalog-action__block">
                                    <MenuIcon/><p>?????????????? ??????????????</p>
                                </div>
                                <ul className="catalog-action__ul">
                                    <li className="catalog-action__li">?? ????????????????</li>
                                    <li className="catalog-action__li">??????????</li>
                                    <li className="catalog-action__li">?????????????????? 0|0|18</li>
                                    <li className="catalog-action__li">?????????????? ?? ????????????????</li>
                                    <li className="catalog-action__li">??????/??????????????????????</li>
                                    <li className="catalog-action__li">????????????????</li>
                                </ul>
                            </div>  
                        </div>
                    </div>
                </div>

            </header>
        </>
    )
}

export default Header
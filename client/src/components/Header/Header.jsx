import React from "react";
import './Header.scss'
import { NavLink } from 'react-router-dom'
import LogoSVG from "../icons/logo";
import SearchSVG from "../icons/search";
import GroupSVG from "../icons/group";
import LikeAction from "../icons/NoLike";
import CompAction from "../icons/compaireAction";
import CartAction from "../icons/cartAction";
import MenuIcon from "../icons/menu-icon"
import { useSelector } from "react-redux";
import ProfileSVG from "../icons/profileSVG";
import { Like } from "../icons/Like";
import { selectUser } from "../../selectors/selectors";
import { useState } from "react";
import { ModalComponent } from "./ModalComponent/ModalComponent";
import { AuthCard } from "../Auth/AuthCard";
import { BasketModal } from "../Basket/BasketModal/BasketModal";


const Header = () => {

    let auth = useSelector(state => state.user.isAuth)
    const User = useSelector(selectUser)
    const [activeBasket, setActiveBasket] = useState(false)
    const [activeAuth, setActiveAuth] = useState(false)

    return (
        <>
            <header className="header">
                <ModalComponent active={activeBasket} setActive={setActiveBasket}>
                    <BasketModal setActive={setActiveBasket}/>
                </ModalComponent>
                <ModalComponent active={activeAuth} setActive={setActiveAuth}>
                    <AuthCard setActive={setActiveAuth}/>
                </ModalComponent>
                <div className="container">
                    <div className="header__top top-header">
                        <div className="top-header__container">
                            <NavLink to='/' className="top-header__logo"><LogoSVG/></NavLink>
                            <div className="top-header__search">
                                <form action="#" className="search-header">
                                    <button type="submit" className="search-header__button"><SearchSVG/></button>
                                    <input className="search-header__input" autoComplete="off" type="text" placeholder="Поиск" />
                                </form>
                                <ul className="actions-header">
                                    <li className="actions-header__group group"><span className="group__item"><GroupSVG/></span></li>
                                    <li className="actions-header__group group"><span className="group__item"><CompAction/></span></li>
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
                                                        <CartAction/>
                                                        <p className="group__counterLike">
                                                        {User?.basket.length}
                                                        </p>
                                                    </span>
                                                </NavLink>
                                            :
                                                <span className="group__item" onClick={() => setActiveBasket(true)}>
                                                    <CartAction/>
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
                                        >Войти</button>
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
                                    <MenuIcon/><p>Каталог товаров</p>
                                </div>
                                <ul className="catalog-action__ul">
                                    <li className="catalog-action__li">О компании</li>
                                    <li className="catalog-action__li">Акции</li>
                                    <li className="catalog-action__li">Рассрочка 0|0|18</li>
                                    <li className="catalog-action__li">Свервис и гарантия</li>
                                    <li className="catalog-action__li">Опт/дропшиппинг</li>
                                    <li className="catalog-action__li">Контакты</li>
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
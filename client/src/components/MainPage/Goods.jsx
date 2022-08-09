import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useAddFavoriteGoodMutation, useAddToBasketMutation, useDelBasketMutation, useDelFavoriteGoodMutation, useGetUserQuery } from "../../Redux/User/userAPI"
import { selectUser } from "../../selectors/selectors"
import { BasketIcon } from "../icons/Basket"
import { InBasket } from "../icons/InBasket"
import { Loader } from "../Loader"

export const Goods = ({goods}) => {
    const User = useSelector(selectUser)
    const isAuth = useSelector(state => state.user.isAuth)
    const serv = 'http://localhost:5000/'
    const [Like] = useAddFavoriteGoodMutation()             
    const [NoLike] = useDelFavoriteGoodMutation() 
    const [addBasket] = useAddToBasketMutation()
    const [delBasket] = useDelBasketMutation()

    return (
        <>
            <div className="goods">
                {goods ? goods.map(x => 
                    <div key={x._id} className="goods_card cardMain">
                        <Link className="NavLink" to={`/product/${x._id}`}><img src={serv + x.img} className="cardMain__img" width='286px'/></Link>
                        <p className="cardMain__Type">{x.type}</p>
                        <Link className="NavLink" to={`/product/${x._id}`}>
                            <div className="cardMain__discription">
                                <p>{x.brand}</p>
                                <p>{x.device}</p>
                            </div>
                        </Link>
                        <p className="cardMain__pryce">{x.price + '$'}</p>
                        <button className="cardMain__butBy">Купить в 1 клик</button>
                        {isAuth ? 
                            <div>
                                {
                                    User && User.FavoritesGoods.filter(z => z == x._id).length != 0 ?
                                    <button className="cardMain__butUnLike" onClick={() => {
                                        NoLike({goodsId: x._id})
                                        
                                    }}></button>
                                    :
                                    <button className="cardMain__butLike" onClick={() => {
                                        Like({goodsId: x._id})
                                    }}></button>
                                }
                                {
                                    User && User?.Basket.filter(y => y == x._id).length != 0 ?
                                    <button onClick={() => delBasket({goodsId: x._id})}><InBasket/></button>
                                    :
                                    <button onClick={() => addBasket({goodsId: x._id})}><BasketIcon/></button>
                                }
                            </div>
                            :
                            null
                        }
                    </div>
                ): <Loader/>}
            </div>
        </>
    )
}
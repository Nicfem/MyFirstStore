import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addUserBasket, delUserBasket } from "../../../Redux/User/userSlice"
import { useAddFavoriteGoodMutation, useAddToBasketMutation, useDelBasketMutation, useDelFavoriteGoodMutation } from "../../../Redux/User/userAPI"
import { selectUser } from "../../../selectors/selectors"
import { Loader } from "../../Loader"


const serv = 'http://localhost:5000/'

export const Good = ({good, className}) => {

    console.log('render')

    const dispatch = useDispatch()

    const { basket, favoritesGoods } = useSelector(selectUser)
    
    const isAuth = useSelector(state => state.user.isAuth)  

    const [Like, {isLoading}] = useAddFavoriteGoodMutation()             
    const [NoLike, {isLoading : LoadingUnLike}] = useDelFavoriteGoodMutation() 
    const [addBasket, {isLoading : LoadingAddBasket}] = useAddToBasketMutation()
    const [delBasket, {isLoading : LoadingDelBasket}] = useDelBasketMutation()

    const [isFav, setIsFav] = useState(false)
    const [inBas, setInBas] = useState(false)
    
    

    useEffect(() => {
        
        if(favoritesGoods?.includes(good._id) != isFav && favoritesGoods?.includes(good._id) !=  undefined) {
            setIsFav(favoritesGoods?.includes(good._id))
        }
        if(basket?.includes(good._id) != inBas && basket?.includes(good._id) != undefined) {
            setInBas(basket?.includes(good._id))
        }
    },[basket, favoritesGoods, good])


    const Pryce = (number) => {
        return number.toLocaleString("ua") 
    }

    return (
        <>
            <li className={className}>
                <div>
                    <Link className={className + '__picture'} to={`/product/${good._id}`}>
                        <img src={serv + good.img}/>
                    </Link>
                    <Link className={className + '__title'} to={`/product/${good._id}`}>
                            {good.device}
                    </Link>
                    <p className={className + '__pryce'}>{`${Pryce(good.price)}`}<span> ₴</span></p>
                </div>
                    {isAuth ? 
                        <div className={className + '__actions'}>
                            {
                                isFav ?
                                <button 
                                    disabled={LoadingUnLike} 
                                    className={className + '__action-like active'} 
                                    onClick={() => NoLike({goodsId: good._id})}
                                ></button>
                                :
                                <button 
                                    disabled={isLoading} 
                                    className={className + '__action-like'} 
                                    onClick={() => Like({goodsId: good._id})}
                                ></button>
                            }
                            {
                                inBas ?
                                <button 
                                    disabled={LoadingDelBasket} 
                                    className={className + '__action-basket active'}
                                    onClick={() => delBasket({goodsId: good._id})}
                                >
                                </button>
                                :
                                <button 
                                    disabled={LoadingAddBasket} 
                                    className={className + '__action-basket'}
                                    onClick={() => addBasket({goodsId: good._id})}
                                >
                                </button>
                            }
                        </div>
                        :

                        basket.includes(good._id) ?
                        <button onClick={() => dispatch(delUserBasket(good._id))} className={className + '__action-buy active'}>Товар в карзине</button>
                        :
                        <button onClick={() => dispatch(addUserBasket(good._id))} className={className + '__action-buy'}>Добавить в карзину</button> 
                    }
            </li>
            
        </>
    )
}
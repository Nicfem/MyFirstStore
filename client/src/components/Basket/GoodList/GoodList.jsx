import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { decreaseQuantity, increaseQuantity } from "./../../../Redux/Basket/basketSlice"
import { useDelBasketMutation } from "../../../Redux/User/userAPI"
import TrashBox from './../../../svg/TrashBox.svg'

const serv = 'http://localhost:5000/'

export const GoodList = ({good}) => {
    const dispatch = useDispatch()
    const [delBasket] = useDelBasketMutation()
    
    const increment = (id) => {
        dispatch(increaseQuantity(id))
    }

    const decrement = (id) => {
        dispatch(decreaseQuantity(id))
    }

    return (
        <>
            <li className="basket-fomr-list">
                <div className="basket-form__good-cart">
                    <div className="basket-form__block-img-name block-img-name">
                        <Link className="NavLink" to={`/product/${good._id}`}>
                            <img className="block-img-name__img" src={serv + good.img}/>
                        </Link>
                        <p className="block-img-name__name">{good.device}</p>
                    </div>
                    <div className="basket-form__quantity quantity-block">
                        <button className="quantity-block__button decrement" onClick={() => decrement(good._id)}>-</button>
                            <p className="quantity-block__quantity">{good.quantity}</p>    
                        <button className="quantity-block__button increment" onClick={() => increment(good._id)}>+</button>
                    </div>
                    <h3 className="basket-form__price">{good.price + " $"}</h3>

                    <button className="basket-form__button-basket"
                        onClick={() => delBasket({goodsId : good._id})}
                    >
                        <img src={TrashBox}/>
                    </button>

                </div>  
                <p className="basket-fomr-list__border"></p>
            </li>
        </>
    )
}
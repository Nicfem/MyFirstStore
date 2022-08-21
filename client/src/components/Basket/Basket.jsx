import { useGetAllById1Query } from "../../Redux/Device/deviceAPI"
import './Basket.scss'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { selectOrderUser, selectOrderGoods, selectUser } from "../../selectors/selectors"
import { setOrderGoods, setUser, setOrderOptionValue } from "../../Redux/Basket/basketSlice"
import NewBasketSVG from '../../assets/svg/ShoppingCart.svg'
import { GoodList } from './GoodList/GoodList'
import { BasketForm } from "./BasketForm/BasketForm"
import { useRef } from "react"


// const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// re.test(String(value).toLowerCase()) ? setisEmail(false) : setisEmail(true)
 


export const Basket = () => {

    const dispatch = useDispatch()

    const orderGoods = useSelector(selectOrderGoods)
    const userOrder = useSelector(selectOrderUser)
    const User = useSelector(selectUser)

    const {deliveryMethod, city, apartment, paymentMethod, Phone, StreetHouse, firstName, lastName} = userOrder

    const {data : goods} = useGetAllById1Query(User?.basket, {skip : User?.basket.length ? false : true})

    useEffect(() => {
        if(goods && User?.basket.length !== orderGoods?.length) {   
            dispatch(setOrderGoods(goods.map(x => x ? {...x, quantity : 1} : null))) 
        }
        if(User?.basket.length === 0 || User?.basket === undefined) {
            dispatch(setOrderGoods(null))
        }
    },[User?.basket, goods])
    
    useEffect(() => {
        console.log(User)
        if(User != undefined) {
            
            dispatch(setUser({...User.personalData, userId : User._id})) 
        }
    },[User])

    const TotalPrice = orderGoods && orderGoods.reduce((total, x) => total + x.price * x.quantity ,0)
    
    const supmitRef = useRef()

    const onSubmit = () => {
        supmitRef.current.click()
    }
    
    const confirmOrder = () => {

        fetch('http://localhost:5000/api/orders/confirmOrder', {
        method : "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body : JSON.stringify({...userOrder, goods: orderGoods})
        }).then(() => {
            dispatch(setOrderGoods([]))
        })
    }

    return (
        <>
            <div className="container">
                {!orderGoods?.length ?
                    null
                    :
                    <h1 className="basket-pg__title">Оформление заказа</h1>
                }
                {orderGoods?.length ?
                <div className="basket-pg__content">
                    <div>
                        <div className="basket-pg-form basket-form">
                            <ul>
                            {orderGoods?.map(x =>
                                <GoodList good={x}/>
                            )}
                            </ul>
                        </div>
                        <BasketForm onSubmitRef={supmitRef}/>
                    </div>
                    
                    {/* <div>
                        <div className="basket-pg-form basket-form">
                            <ul>
                            {orderGoods?.map(x =>
                                <GoodList good={x}/>
                            )}
                            </ul>
                        </div>

                        <div className="basket-form payment-form">
                            <h2 className="basket-form__title">Способ получения</h2>
                            <div className="payment-form__location">   
                                <div>
                                    <label className="payment-form__label">
                                        <p className="payment-form__label__title">Ваш город</p>
                                        <input autoComplete="none" className="payment-form__input" type="text" placeholder="Город" name="city" value={city} onChange={(e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))}/>
                                    </label>
                                </div>
                                <div>
                                    <div className={deliveryMethod == 'Доставка' ? 'payment-form__input-block-redio active' : 'payment-form__input-block-redio'}>
                                        <input
                                            checked={deliveryMethod == 'Доставка'} 
                                            onChange={(e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))} 
                                            value={'Доставка'} 
                                            className="payment-fomr__input-radio custom-radio" 
                                            id='patmentType1' 
                                            type="radio" 
                                            name="deliveryMethod"/>
                                        <label htmlFor="patmentType1">Доставка</label>
                                    </div>
                                    <div className={deliveryMethod == 'Самовывоз' ? 'payment-form__input-block-redio active' : 'payment-form__input-block-redio'}>
                                        <input 
                                            checked={deliveryMethod == 'Самовывоз'} 
                                            onChange={(e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))} 
                                            value={'Самовывоз'} 
                                            className="payment-fomr__input-radio custom-radio"
                                            id='patmentType2' 
                                            type="radio" 
                                            name="deliveryMethod"/>
                                        <label htmlFor="patmentType2">Самовывоз</label>
                                    </div>
                                </div>
                            </div>
                            <div style={{"display" : "flex", "marginTop" : "30px", "justifyContent" : "space-between"}}>
                                <div>
                                    <p>Улица/дом</p>
                                    <input 
                                        autoComplete="none" 
                                        className="payment-form__input" 
                                        type="text" 
                                        placeholder="Улица/дом" 
                                        value={StreetHouse} 
                                        name="StreetHouse"
                                        onChange={(e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))}/>
                                </div>
                                <div>
                                    <p>Квартира</p>
                                    <input 
                                        autoComplete="none" 
                                        className="payment-form__input" 
                                        type="text" 
                                        placeholder="Квартира" 
                                        value={apartment} 
                                        name='apartment'
                                        onChange={(e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))}/> 
                                </div>
                            </div>
                        </div>
                            
                        <div className="basket-form">
                            <h2 className="basket-form__title">Способ оплаты</h2>
                            <select value={paymentMethod} name="paymentMethod" onChange={(e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))} className="basket-form__select">
                                <option style={{"height" : "48px"}}>Наличными</option>
                                <option>Картой</option>
                            </select>
                        </div>
                        <div className="basket-form">
                            <h2 className="basket-form__title">Получатель</h2>
                                <input 
                                    className="payment-form__input" 
                                    type="text" 
                                    placeholder="Телефон" 
                                    name="Phone"
                                    value={Phone} 
                                    onChange={(e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))}
                                />
                                <input 
                                    className="payment-form__input" 
                                    type="text" 
                                    placeholder="firstName" 
                                    value={firstName} 
                                    name="firstName"
                                    onChange={(e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))}
                                />
                                <input 
                                    className="payment-form__input" 
                                    type="text" 
                                    placeholder="lastName" 
                                    name="lastName"
                                    value={lastName} 
                                    onChange={(e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))}
                                />
                        </div> 
                    </div> */}



                    <div className="total-price">
                        <h1 className="total-price__title">Итого</h1> 
                        <div>
                            <p>{`${orderGoods.reduce((total, x) => total + x.quantity,0)} товара на сумму`}</p><p>{TotalPrice}</p>
                        </div>
                        <div>
                            <p>Стоимость доставки</p><p>Бесплатно</p>
                        </div>
                        <p className="total-price__border"></p>
                        <div>
                            <h2>К оплате</h2><h1>{TotalPrice + ' $'}</h1>
                        </div>
                        {/* <button className="total-price__confirmOrder" onClick={confirmOrder}>Оформить заказ</button> */}
                        <button className="total-price__confirmOrder" onClick={onSubmit}>Оформить заказ</button>
                    </div>
                </div>
                :
                <div style={{"width" : "100%", "display" : "flex", "flexDirection" : "column", "alignItems" : "center", "justifyContent" : "center", "height" : "76vh"}}>
                    <img width='500px' src={NewBasketSVG}></img>
                    <p style={{"fontSize" : "36px", "fontWeight" : "bold", "color" : "#2A5275"}}>Корзина пуста</p>
                </div>
                }
            </div>
        </>
    )
}
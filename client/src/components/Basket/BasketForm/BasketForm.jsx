import "./BasketForm.scss"
import { useDispatch, useSelector } from "react-redux"
import { setOrderGoods, setOrderOptionValue } from "../../../Redux/Basket/basketSlice"
import { selectOrderGoods, selectOrderUser } from "../../../selectors/selectors"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { delAllUserBasket } from "../../../Redux/User/userSlice"
import { useConfirmOrderMutation } from "../../../Redux/Order/OrderAPI"

export const BasketForm = ({onSubmitRef}) => {

    const [confOrder] = useConfirmOrderMutation()

    const User = useSelector(selectOrderUser)

    const Goods = useSelector(selectOrderGoods)
    
    const {deliveryMethod, city, apartment, paymentMethod, phone, streetHouse, firstName, lastName} = User

    const dispatch = useDispatch()

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = useForm({
        mode: "onChange",
    })
    
    const onSubmit = data => {
        if(data !== undefined && isValid) {
            confirmOrder(data)
        }
    }

    useEffect(() => {
        if(Object.keys(User).length) {
            reset(User)
        }
    },[User])

    const confirmOrder = (data) => {
        confOrder({...data, goods : Goods}).then(
            dispatch(setOrderGoods([])),
            dispatch(delAllUserBasket(Goods.map(x => x._id)))
        )
    }
    
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
            <button onClick={onSubmit}></button>
            <div className="basket-form payment-form">
                
                <h2 className="basket-form__title">Способ получения</h2>
                    <div className="payment-form__location">   
                        <div>
                            <label className="payment-form__label">
                                <p className="payment-form__label__title">Ваш город</p>
                                <input 
                                    autoComplete="none" 
                                    className="payment-form__input" 
                                    type="text" 
                                    placeholder="Город" 
                                    name="city" 
                                    value={city} 
                                    {...register("city", {
                                        required: "Поле обязательно для заполнения",
                                        value: city,
                                        onChange: (e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value})),
                                    })}
                                    />
                                    <div>{errors?.city && <p>{errors.city.message}</p>}</div>
                            </label>
                        </div>
                        <div>
                            <div className={deliveryMethod == 'Доставка' ? 'payment-form__input-block-redio active' : 'payment-form__input-block-redio'}>
                                <input 
                                    value={'Доставка'} 
                                    className="payment-fomr__input-radio custom-radio" 
                                    id='patmentType1' 
                                    type="radio" 
                                    name="deliveryMethod"
                                    {...register("deliveryMethod", {
                                        required: "Поле обязательно для заполнения",
                                        onChange: (e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))
                                    })} 
                                    />
                                <label htmlFor="patmentType1">Доставка</label>
                            </div>
                            <div className={deliveryMethod == 'Самовывоз' ? 'payment-form__input-block-redio active' : 'payment-form__input-block-redio'}>
                                <input  
                                    value={'Самовывоз'} 
                                    className="payment-fomr__input-radio custom-radio"
                                    id='patmentType2' 
                                    type="radio" 
                                    name="deliveryMethod"
                                    {...register("deliveryMethod", {
                                        required: "Поле обязательно для заполнения",
                                        onChange: (e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))
                                    })}
                                    />
                                <label htmlFor="patmentType2">Самовывоз</label>
                                
                            </div>
                            <div>{errors?.deliveryMethod && <p>{errors.deliveryMethod.message}</p>}</div>
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
                            value={streetHouse} 
                            name="streetHouse"
                            {...register("streetHouse", {
                                required: "Поле обязательно для заполнения",
                                value: streetHouse,
                                onChange: (e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))
                            })}
                            />
                            <div>{errors?.streetHouse && <p>{errors.streetHouse.message}</p>}</div>
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
                            {...register("apartment", {
                                required: "Поле обязательно для заполнения",
                                value: apartment,
                                onChange: (e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))
                            })}
                            /> 
                            <div>{errors?.apartment && <p>{errors.apartment.message}</p>}</div>
                    </div>
                </div>
            </div>
                
            <div className="basket-form">
                <h2 className="basket-form__title">Способ оплаты</h2>
                <select 
                    value={paymentMethod} 
                    name="paymentMethod" 
                    className="basket-form__select"
                    {...register("paymentMethod", {
                        onChange: (e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))
                    })}
                    >
                    <option style={{"height" : "48px"}}>Наличными</option>
                    <option>Картой</option>
                </select>
            </div>
            <div className="basket-form">
                <h2 className="basket-form__title">Получатель</h2>
                    <input 
                        className="payment-form__input" 
                        autoComplete="none"
                        type="text" 
                        placeholder="Телефон" 
                        name="phone"
                        {...register("phone", {
                            required: "Поле обязательно для заполнения",
                            onChange: (e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value})),
                            validate: { 
                                phone: x => !isNaN(Number(x.split(' ').join(''))) ? true : 'В номере телефона не должно быть букв',
                                length: x => x.split(' ').join('').length > 9 ? true : 'Минимальная длинна 10' 
                            },
                            value: phone
                        })}
                    />
                    <div>{errors?.phone && <p>{errors.phone.message}</p>}</div>
                    <input 
                        className="payment-form__input" 
                        type="text" 
                        autoComplete="none"
                        placeholder="firstName" 
                        value={firstName} 
                        name="firstName"
                        {...register("firstName", {
                            required: "Поле обязательно для заполнения",
                            minLength: {
                                value: 5,
                                message: `Минимальная длинна 5`
                            },
                            value: firstName,
                            onChange: (e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))
                        })}
                    />
                    <div>{errors?.firstName && <p>{errors.firstName.message}</p>}</div>
                    <input 
                        className="payment-form__input" 
                        type="text" 
                        autoComplete="none"
                        placeholder="lastName" 
                        name="lastName" 
                        {...register("lastName", {
                            required: "Поле обязательно для заполнения",
                            minLength: {
                                value: 5,
                                message: `Минимальная длинна 5`
                            },
                            value: lastName,
                            onChange: (e) => dispatch(setOrderOptionValue({name: e.target.name, value : e.target.value}))
                        })}
                    />
                    <div>{errors?.lastName && <p>{errors.lastName.message}</p>}</div>
            </div> 
            <button ref={onSubmitRef}></button>
            </form>
        </>
    )
}
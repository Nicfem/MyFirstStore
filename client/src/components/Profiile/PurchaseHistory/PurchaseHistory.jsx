import { useSelector } from "react-redux"
import { useGetAllWithGoodsQuery } from "../../../Redux/Order/OrderAPI"
import { selectUser } from "../../../selectors/selectors"
import { Link } from "react-router-dom"
import './PurchaseHistory.scss'
import { useState } from "react"

const serv = 'http://localhost:5000/'



export const PurchaseHistory = () => {

    const {_id} = useSelector(selectUser)

    const {data} = useGetAllWithGoodsQuery(_id)


    const [active, setActive] = useState([])


    const AllPryce = (arr) => {
        return arr.reduce((total, x) => total + x.price * x.quantity ,0)
    }

    const addLeadingZero = (d) => {
        return d < 10 ? '0' + d : d
    }

    const transformDate = (date, option) => {
        date = new Date(date)    
        let Y = date.getFullYear()
        let M = addLeadingZero(date.getMonth() + 1)
        let D = addLeadingZero(date.getDate())
        let h = addLeadingZero(date.getHours())
        let m = addLeadingZero(date.getMinutes())
        return option ? `${D}.${M}.${Y} Время ${h}:${m}` : `${D}.${M}.${Y}`
    }

    const Pryce = (number) => {
        return number.toLocaleString("ua") 
    }
    const activeHandl = (id) => {
        active.includes(id) ? setActive([...active.filter(x => x !== id)]) : setActive([...active, id])
    }

    return (
        <>
            <div className="PurchaseHistory__content">
                <ul className="order-list">
                    {data && data.map(x => 
                        <li className="order">
                            <div className="order-header" onClick={e => activeHandl(x._id)}>
                                <div className="order-header__decoration"></div>
                                <div className="order-header__flex">
                                    <div className="order-header__status">
                                        <p className="order-header__label">{'№ ' + x._id + ' от ' + transformDate(x.date, false)}</p>
                                        <p className="order-header__value">{`Обслужен: ${x.serviced ? 'Да' : 'Нет'}`}</p>
                                    </div>
                                    <div className={active.includes(x._id) ? 'order-header__price active' : 'order-header__price'}>
                                        <p className="order-header__label">Сумма заказа</p>
                                        <p className="order-header__value">{Pryce(AllPryce(x.goods))}<span> ₴</span></p>
                                    </div>
                                    <ul className={active.includes(x._id) ? 'order-header__goods active' : 'order-header__goods'}>
                                        {x.goods.map((x, index) => 
                                            index > 5 ? 
                                            null 
                                            : 
                                            <li className="order-header__goods-item">
                                                <img src={serv + x.img}/>
                                            </li>    
                                        )}
                                    </ul>
                                    <span className="order-header__arrou">
                                        <svg className={active.includes(x._id)  ? 'form-search__svg-arrou-active' : 'form-search__svg-arrou'} width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path  d="M5.79171 0.810932C5.6337 0.642511 5.3663 0.642511 5.20829 0.810932L0.502881 5.82632C0.263238 6.08175 0.444349 6.5 0.794595 6.5L10.2054 6.5C10.5557 6.5 10.7368 6.08175 10.4971 5.82632L5.79171 0.810932Z"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className={active.includes(x._id) ? 'order-details active' : 'order-details'}>
                                <div className="order-details__summary">
                                    <h3 className="order-details__label">Информация о заказе</h3>
                                    <p>{x.deliveryMethod}</p>
                                    <p>{`${x.city}, ${x.streetHouse}, ${x.apartment}`}</p>
                                    <p>{`${x.firstName} ${x.lastName}`}</p>
                                    <p>{x.phone}</p>
                                </div>
                                <ul className="order-details__goods">
                                    <h4 className="order-details__header">Товары Smart Техники</h4>
                                    {x.goods.map(y => 
                                        <li className="order-tile">
                                            <Link className="order-tile__title" to={`/product/${y._id}`}>
                                                <figure className="order-tile__figure">
                                                    <span className="order-tile__picture">
                                                        <img loading="lazy" src={serv + y.img}/>
                                                    </span>
                                                    <figcaption>
                                                        {y.device}
                                                    </figcaption>
                                                </figure>
                                            </Link>
                                            <div className="order-tile__options">
                                                <div className="order-tile__option">
                                                    <p className="order-tile__label">Цена</p>
                                                    <p className="order-tile__digit">{Pryce(y.price)}<span> ₴</span></p>
                                                </div>
                                                <div className="order-tile__option">
                                                    <p className="order-tile__label">Количество</p>
                                                    <p className="order-tile__digit">{y.quantity}</p>
                                                </div>
                                                <div className="order-tile__option">
                                                    <p className="order-tile__label">Сумма</p>
                                                    <p className="order-tile__digit">{Pryce(y.price * y.quantity)}<span> ₴</span></p>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                    <ul className="order-details__payment">
                                        <li className="order-details__payment-row">
                                            <p className="order-details__label">Оплата</p>
                                            <p>{x.paymentMethod}</p>
                                        </li>
                                        <li className="order-details__payment-row">
                                            <p className="order-details__label">Доставка</p>
                                            <p>По тарифам перевозчика</p>
                                        </li>
                                        <li className="order-details__payment-row">
                                            <p className="order-details__label">Итого</p>
                                            <p>{Pryce(AllPryce(x.goods))}<span> ₴</span></p>
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                        </li>  
                    )}
                </ul>
            </div>
        </>
    )
}
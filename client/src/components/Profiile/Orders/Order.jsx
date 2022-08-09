import { useParams } from "react-router-dom"
import { useGetOrdersOneQuery } from "../../../Redux/Order/OrderAPI"
import { Link } from "react-router-dom"
export const Order = () => {

    const id = useParams(Order)
    const {data} = useGetOrdersOneQuery(id.id)

    const addLeadingZero = (d) => {
        return d < 10 ? '0' + d : d
    }

    const transformDate = (date) => {
        date = new Date(date)    
        let Y = date.getFullYear()
        let M = addLeadingZero(date.getMonth() + 1)
        let D = addLeadingZero(date.getDate())
        let h = addLeadingZero(date.getHours())
        let m = addLeadingZero(date.getMinutes())
        return (`${D}.${M}.${Y} Время ${h}:${m}`)
    }
    
    const serv = 'http://localhost:5000/'

    return (
        <>
            <div>
                {data ? 
                    <div>
                        <h1>{data.User}</h1>
                        <h2>{transformDate(data.date)}</h2>
                        <h3>{`Имя: ${data.firstName}`}</h3>
                        <h3>{`Фамилия: ${data.lastName}`}</h3>
                        <h3>{`Город: ${data.city}`}</h3>
                        <h3>{`Адресс: ${data.streetHouse}`}</h3>
                        <h3>{`Дом/Квартира: ${data.apartment}`}</h3>
                        <h3>{`Способ получения: ${data.deliveryMethod}`}</h3>
                        <h3>{`Способ оплаты: ${data.paymentMethod}`}</h3>
                        <h3>{`Телефон: ${data.phone}`}</h3>
                        <h3>{`Обслужен: ${data.serviced ? 'Да' : 'Нет'}`}</h3>
                        {data.goods.map(x => (
                            <div style={{"marginTop" : "30px", "height" : "80px","display" : "flex", "justifyContent" : "space-between"}}>
                                <div>
                                <Link className="NavLink" to={`/product/${x._id}`}>
                                    <img src={serv + x.img} width="80px" height="80px"/>
                                    <p>{x.device}</p>
                                </Link>
                                </div>
                                <div>
                                    <h3>{x.price + " $"}</h3>
                                </div>
                                <div>                                    
                                    {x.quantity}
                                </div>
                            </div> 
                        ))}
                    </div>
                : null}
            </div>
        </>
    )
}
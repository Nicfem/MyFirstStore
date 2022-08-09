import { useGetOrdersQuery } from "../../../Redux/Order/OrderAPI"
import { Link } from "react-router-dom"

export const Orders = () => {
    const {data : Orders} = useGetOrdersQuery()
    
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

    return (
        <>
            <div>
            {
                Orders && Orders.map(x => 
                    <div style={{"marginTop" : "30px"}}>
                        <Link to={`/profile/Order/${x._id}`}>
                         <h2>{x.phone}</h2>
                        </Link>
                            <h3>{transformDate(x.date)}</h3>
                        <h1>{`Обслужен ${x.serviced ? 'true' : 'false'}`}</h1>
                    </div>
                    
                )
            }
            </div>
        </>
    )
}
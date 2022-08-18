// /brand/searchDevice/:device
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLazyGetSearchDeviceQuery } from "../../../Redux/Device/deviceAPI";
import SearchSVG from "../../../svg/search";
import './Search.scss'

export const Search = () => {

    const [device, setDevice] = useState('')
    const [data, setData] = useState([])
    const [active, setActive] = useState(false)
    const [searchDevice] = useLazyGetSearchDeviceQuery()
    


    const submit = (e) => {
        e.preventDefault()
        if(device.length === 0) return setData([])
        searchDevice(device).then(res => setData(res.data))
    }

    const serv = 'http://localhost:5000/'

    return (
        <form onSubmit={e => submit(e)} className="search-header">
            <button type="submit" className="search-header__button"><SearchSVG/></button>
            <input 
                className="search-header__input" 
                autoComplete="off" 
                onBlur={() => setTimeout(() => setActive(false),100) }
                onFocus={() => setActive(true)}
                type="text" 
                placeholder="Поиск" 
                value={device} 
                onChange={e => setDevice(e.target.value)}
            />

            {data && 
                <div className="search-header__goods">
                    {active &&
                        data && data.map(x => 
                            <Link to={`product/${x._id}`}>
                                <div className="search-header__tile">
                                    <img className="search-header__img" src={serv + x.img}/>
                                    <p>{x.device}</p>
                                </div>    
                            </Link>
                        )
                    }
                </div>
            }
        </form>
    )
}
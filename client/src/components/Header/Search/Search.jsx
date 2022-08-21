import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useLazyGetSearchDeviceQuery } from "../../../Redux/Device/deviceAPI";
import SearchSVG from "../../../assets/svg/search";
import './Search.scss'
import { SearchItem } from "./SearchItem";

export const Search = () => {

    const [device, setDevice] = useState('')
    const [active, setActive] = useState(true)
    const [hide, setHide] = useState(false)
    const [searchDevice, {data}] = useLazyGetSearchDeviceQuery()
    const debounced = useDebounce(device, 300)
    
    useEffect(() => {
        if(!device.length) {
            return
        }
        searchDevice(device.trim())
    },[debounced])

    const onAnimationEnd = (e) => {
        e.animationName === 'hide' && setHide(true)
    }

    const onAnimationStart = (e) => {
        e.animationName === 'unHide' && setHide(false) 
    }

    return (
        <form className="search">
            <button disabled={true} className="search__button"><SearchSVG/></button>
            <input 
                className="search__input"  
                onBlur={() => setActive(false)}
                onFocus={() => setActive(true)}
                type="text" 
                placeholder="Поиск" 
                value={device} 
                onChange={e => setDevice(e.target.value)}
            />

            {data && 
                <div 
                    onAnimationEndCapture={onAnimationEnd} 
                    onAnimationStart={onAnimationStart} 
                    className={active ? 'search__goods active' : 'search__goods'}
                >
                    {
                        device.length ?  
                            !hide && data && data.map(x => 
                                <SearchItem item={x}/>       
                            )  
                        : null
                    }
                </div>
            }
        </form>
    )
}
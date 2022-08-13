import React, { useEffect, useState } from "react";
import './MainPage.scss'
import { useGetDiviceByIdQuery } from "../../Redux/Device/deviceAPI";
import {  useGetTypesQuery } from "../../Redux/Type/typeAPI";
import { Link } from "react-router-dom";
import img1 from '../../img/content.png'
import { Good } from "./itemGood/Good";

const MainPage = () => {
    const [limit, setLimit] = useState(15)
    const [fetching, setFetching] = useState(false)
    const {data, isFetching} =  useGetDiviceByIdQuery({'body' : '', 'page' : '0', 'limit' : limit})
    const {data: type} = useGetTypesQuery()

    useEffect(() => {
        if (fetching && limit < 40) {
            if(!isFetching) {
                let newLimit = limit + 5
                setLimit(newLimit)
            }   
            setFetching(false)
        }
    },[fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    },[])

    const scrollHandler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 500) {
            setFetching(true)
        } 
    }
    
    return (
        <>
            <div className="container">
                <div className="content main-pg-content">
                    <ul className="catalog-action__list list">
                        
                        {type && type.map(x => 
                            <Link className={'list__item'} to={'/Catalog/' + x.type}>
                                <li 
                                // className={'list__item'} 
                                >
                                    <p>{x.type}</p>
                                </li>
                            </Link>
                        )}
                    </ul>
                    <div className="content__blockImg">
                        <img className="logoImg" loading="lazy" src={img1}/>
                    </div>
                </div>  
                <ul className="goods">
                    {data?.data.map(x => (
                        <Good good={x} className={'cardMain'}/>
                    ))}
                    {/* {data && <Good good={data.data[0]} className={'cardMain'}/>} */}
                </ul>
                
            </div>
        </>
    )
}


export default MainPage
import React, { useEffect, useState } from "react";
import './MainPage.scss'
import { useGetDiviceByIdQuery } from "../../Redux/Device/deviceAPI";
import {  useGetTypesQuery } from "../../Redux/Type/typeAPI";
import { Link } from "react-router-dom";
import img1 from '../../img/content.png'
import { Good } from "./itemGood/Good";
import { Corusel } from "../items/Corusel/Corusel";
import { useMemo } from "react";


const arrImg = [
    'https://img5.goodfon.ru/original/1920x1080/3/9c/space-planet-landscape-wallpapers-1920-x-1080.jpg',
    'https://wallbox.ru/resize/1920x1080/wallpapers/main2/201726/grafika-kvadraty-3d.jpg',
    'https://img2.akspic.ru/crops/1/9/0/3/6/163091/163091-esteticheskoe_vaporwave-estetika-graficeskij_dizajn-grafika-reklama-1920x1080.jpg',
]

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
                                >
                                    <p>{x.type}</p>
                                </li>
                            </Link>
                        )}
                    </ul>
                    
                        <Corusel pagesArr={arrImg}>
                            {/* {arrImg.map(x => 
                                <li>
                                    <Link className="slides" to={'/'}>
                                        <img src={x}/>    
                                    </Link>
                                </li>
                            )} */}
                        </Corusel>
                </div>  
                <ul className="goods">
                    {data?.data.map(x => (
                        <Good good={x} className={'cardMain'}/>
                    ))}
                    {/* {comp} */}
                </ul>
                
            </div>
        </>
    )
}


export default MainPage
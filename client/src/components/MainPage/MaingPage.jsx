import React, { useEffect, useState } from "react";
import './MainPage.scss'
import { useGetDiviceByIdQuery } from "../../Redux/Device/deviceAPI";
import {  useGetTypesQuery } from "../../Redux/Type/typeAPI";
import { Link } from "react-router-dom";
import img1 from '../../img/content.png'
import { Good } from "./itemGood/Good";
import { Corusel } from "../items/Corusel/Corusel";


const arrImg = [
    'http://localhost:5000/Slider/slide-1.jpg',
    'http://localhost:5000/026e6340-b60c-472a-b3b6-9827a50849d2.jpg',
    'http://localhost:5000/0c726a35-dba3-4cdb-9da7-86234c9330a2.jpg',
    'https://elama.ru/info_static/uploads/images/f7/4d/62d9054779d2e-Zakon-o-markirovke-internet-reklamy--chto-eto-takoe-i-kak-gotovitsya.png',
    // 'http://localhost:5000/0c726a35-dba3-4cdb-9da7-86234c9330a2.jpg',
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

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log('work')
    //     }, 1000)

    //     return () => {
    //         clearInterval(interval) 
    //     }
    // },[])
    
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
                </ul>
                
            </div>
        </>
    )
}


export default MainPage
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetAllById1Query } from '../../../Redux/Device/deviceAPI'
import { selectUser } from '../../../selectors/selectors'
import { Good } from '../../MainPage/itemGood/Good'
import './Favorites.scss'

export const Favorites = () => {

    const User = useSelector(selectUser)
    const {data : goods} = useGetAllById1Query(User?.favoritesGoods, {skip : User ? false : true})
    const [Goods, setGoods] = useState([])
    
    useEffect(() => {
        if(!User?.favoritesGoods.length) setGoods([])
        if(goods) setGoods(goods)
    },[User, goods])

    return (
        <>
            <div className='Favorites'>
                <div className='goods'>
                    {goods?.map(x => 
                        <Good good={x} className={'catalogGood'}/>    
                    )}
                </div>
            </div>
        </>
    )
}
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetAllById1Query } from '../../../Redux/Device/deviceAPI'
import { selectUser } from '../../../selectors/selectors'
import { Good } from '../../MainPage/Good'
import { Goods } from '../../MainPage/Goods'
import './Favorites.scss'

export const Favorites = () => {
    const User = useSelector(selectUser)
    // const {data : goods} = useGetAllById1Query(User?.FavoritesGoods.map(x => x._id).join(','), {skip : User ? false : true})
    
    const {data : goods} = useGetAllById1Query(User?.favoritesGoods, {skip : User ? false : true})
    const [Goods, setGoods] = useState([])
    useEffect(() => {
        if(!User?.favoritesGoods.length) setGoods([])
        if(goods) setGoods(goods)
    },[User, goods])

    return (
        <>
            <div className='Favorites'>
                {/* <Goods goods={goods ? goods : null}/> */}
                
                <div className='goods'>
                    {goods?.map(x => 
                        <Good good={x} className={'catalogGood'}/>    
                    )}
                </div>
            </div>
        </>
    )
}
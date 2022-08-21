import { memo } from 'react'
import { Link } from 'react-router-dom'
import './SearchItem.scss'

const serv = 'http://localhost:5000/'

export const SearchItem = memo(({item}) => {
    console.log('renderItem')
    return (
        <Link to={`product/${item._id}`}>
            <div className="search-item__tile">
                <img className="search-item__img" src={serv + item.img}/>
                <p>{item.device}</p>
            </div>    
        </Link>
    )
})
import { useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { useGetDiviceByIdQuery, useGetOptionQuery } from "../../Redux/Device/deviceAPI"
import { Arrou } from "../icons/Arrou"
import { Good } from "../MainPage/itemGood/Good"
import './CatalogPage.scss'

const CatalogPage = () => {
    let [option, setOption] = useState([])
    const type = useParams(CatalogPage)
    const {data} = useGetDiviceByIdQuery({'type' : type.type, 'page' : '0', 'limit' : '15', 'body' : option})

    let {data : dataServ} = useGetOptionQuery(type.type)
    let [servHash, setServHash] = useState({})
    
    if(dataServ && Object.keys(servHash).length == 0) {
        
        if(!dataServ.length == 0) {
            console.log('work')
        }
    }
    if(dataServ && Object.keys(servHash).length == 0) {
        for(let i = 0; i < dataServ.descriptions.length; i++) {
            Object.assign(servHash, {[dataServ.descriptions[i].option_title] : []})
        }  
    }

    const setCheckbox = (e) => {
        if(e.checked) {
            servHash[e.name].push(e.value)
        }
        if(!e.checked) {
            let index = servHash[e.name].indexOf(e.value)
            servHash[e.name].splice(index, 1)
        }
        
    }
    
    const Hash1 = () => {
        let keys = Object.keys(servHash)
        let copy = {}
        for(let i = 0; i <= keys.length - 1; i++) {
            copy[keys[i]] = servHash[keys[i]].join(',')
            if(JSON.stringify(option) === JSON.stringify(copy)) {
                console.log('ERROR')
            }
            if(copy[keys[i]].length == 0) {
                delete copy[keys[i]]
            }
        }
        Hash2(copy)
    }
    let hash2 = []
    const Hash2 = (copy) => {
        let newHash = Object.entries(copy)
        for(let i = 0; i < newHash.length; i++) {
            hash2.push(newHash[i].join('='))
        }
        console.log(hash2.join('&'))
        setOption(hash2.join('&'))
        hash2 = []
    }

    const fetchGoodsWithOption = (e) => {
        e.preventDefault()
        Hash1()
    }

    let [active, setActive] = useState([])

    const setClass = (id) => {
        if(active.includes(id)) {
            setActive(active.filter(i => i !== id))
        } else {
            setActive([...active, id])
        }
    }
    return (
        <>  
            <div className="container">
                <div className="CatalogPage__Navigate">
                </div>
                <p className="CatalogPage__title">Каталог</p>
                <div className="content">
                    <div>
                        <form className="form-search">
                            <button className="form-search__filter" onClick={(e) => fetchGoodsWithOption(e)}>Применить</button>
                            {dataServ && dataServ?.descriptions.map(x => 
                                <ul id={x.option_title} className={active.includes(x.option_title) ? 'form-search__menu' : 'form-search__menu-active'} >
                                    <div className="form-search__header">
                                        <p onClick={() => setClass(x.option_title)} className="form-search__title">{x.option_title}</p><span className='form-search__span-svg' onClick={() => setClass(x.option_title)}><Arrou active={active} id={x.option_title}/></span>
                                    </div>
                                    {x.option_value.map(i =>
                                        <li className="form-search__checkbox">
                                            <input id={i._id} className="custom-checkbox" name={x.option_title} onChange={(e) => setCheckbox(e.target)} type={'checkbox'} value={i.value}></input>
                                            <label for={i._id}>{i.value}</label>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </form>
                    </div>
                    <div className="goods">
                        {data?.data?.map(x => 
                            <Good good={x} className={'catalogGood'}/>    
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CatalogPage
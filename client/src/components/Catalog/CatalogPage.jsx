import { useState } from "react"
import { useParams } from "react-router-dom"
import { useGetDiviceByIdQuery, useGetOptionQuery } from "../../Redux/Device/deviceAPI"
import { Arrou } from "../../assets/svg/Arrou"
import { Good } from "../MainPage/itemGood/Good"
import './CatalogPage.scss'
import { useEffect } from "react"

const CatalogPage = () => {

    let [urlRow, setUrlRow] = useState([])

    const type = useParams(CatalogPage)

    const {data} = useGetDiviceByIdQuery({'type' : type.type, 'page' : '0', 'limit' : '15', 'body' : urlRow})

    let {data : typeOptions} = useGetOptionQuery(type.type)

    let [servHash, setServHash] = useState({})

    let [curentOptionsArr, setCurentOptionsArr] = useState({}) 

    if(typeOptions && Object.keys(servHash).length == 0) {
        for(let i = 0; i < typeOptions.descriptions.length; i++) {
            // Object.assign(servHash, {[typeOptions.descriptions[i].option_title] : []})
            servHash = {...servHash,  [typeOptions.descriptions[i].option_title] : [] }
            // curentOptionsArr = {...curentOptionsArr,  [typeOptions.descriptions[i].option_title] : [] }
        }  
    }

    useEffect(() => {
        if(typeOptions && Object.keys(curentOptionsArr).length == 0) {
            setCurentOptionsArr((curentValue) => {
                let newValue = curentValue
                for(let i = 0; i < typeOptions.descriptions.length; i++) {
                    newValue = {...newValue,  [typeOptions.descriptions[i].option_title] : [] }
                }
                return newValue
            })
        }
    },[typeOptions])

    const setCheckbox = (e) => {
        if(e.checked) {
            servHash[e.name].push(e.value)
            setCurentOptionsArr({...curentOptionsArr, ...curentOptionsArr[e.name].push(e.value)})
        }
        if(!e.checked) {
            let index = servHash[e.name].indexOf(e.value)
            servHash[e.name].splice(index, 1)
            
            setCurentOptionsArr({...curentOptionsArr, [e.name] : curentOptionsArr[e.name].filter(x => x !== e.value)})
        }
    }

    console.log(curentOptionsArr)
    
    const Hash1 = () => {
        let keys = Object.keys(servHash)
        let copy = {}
        for(let i = 0; i <= keys.length - 1; i++) {
            copy[keys[i]] = servHash[keys[i]].join(',')
            if(copy[keys[i]].length == 0) {
                delete copy[keys[i]]
            }
        }
        console.log(copy)

        Hash2(copy)
    }

    let hash2 = []

    const Hash2 = (copy) => {
        let newHash = Object.entries(copy)
        for(let i = 0; i < newHash.length; i++) {
            hash2.push(newHash[i].join('='))
        }
        console.log(hash2.join('&'))
        setUrlRow(hash2.join('&'))
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
                <p className="CatalogPage__title">??????????????</p>
                <div className="content">
                    <div>
                        <form className="form-search">
                            <button className="form-search__filter" onClick={(e) => fetchGoodsWithOption(e)}>??????????????????</button>
                            {typeOptions && typeOptions?.descriptions.map(x => 
                                <ul id={x.option_title} className={active.includes(x.option_title) ? 'form-search__menu' : 'form-search__menu-active'} >
                                    <div className="form-search__header">
                                        <p 
                                            onClick={() => setClass(x.option_title)} 
                                            className="form-search__title"
                                        >{x.option_title}</p>
                                        <span className='form-search__span-svg' 
                                            onClick={() => setClass(x.option_title)}
                                        >
                                            <Arrou active={active} id={x.option_title}/>
                                        </span>
                                    </div>
                                    {x.option_value.map(i =>
                                        <li className="form-search__checkbox">
                                            <input 
                                                id={i._id} 
                                                className="custom-checkbox" 
                                                name={x.option_title} 
                                                onChange={(e) => setCheckbox(e.target)} 
                                                type={'checkbox'} 
                                                value={i.value}
                                            ></input>
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
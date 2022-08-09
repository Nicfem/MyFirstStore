import { useGetTypesQuery } from "../../../../Redux/Type/typeAPI"
import { useState } from "react"
import { useGetBrandQuery } from "../../../../Redux/Brand/brandAPI"
import { useCreateDeviceMutation, useGetOptionAllQuery } from "../../../../Redux/Device/deviceAPI"

export const CreateDevice = () => {

    const {data: types = []} = useGetTypesQuery()
    const {data: brands = []} = useGetBrandQuery()
    const {data : OptionAll} = useGetOptionAllQuery()
    const [createDevice] = useCreateDeviceMutation()

    const [goodsFomr, setGoodsForm] = useState({})
    const [file, setFile] = useState(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState(null)
    const [type, setType] = useState(null)
    const [formDescriptions, setFormDescriptions] = useState([])
    const [descriptions, setDescriptions] = useState([])



    const goodsOptionsType = (e) => {
        setType(e)
        let filter = OptionAll.find(x => x.type == e)
        if(filter) {
            let copy = JSON.parse(JSON.stringify(filter))
            setGoodsForm(copy)
            setFormDescriptions(copy.descriptions.map(x => {return {title : x.option_title, description : '', id: x._id}}))
            return
        }
        setGoodsForm({})
        setFormDescriptions([])
    }


    const [testFile, setTestFile] = useState(null)

    const Upload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = ev => {
            setTestFile(ev.target.result)
        }
        console.log(reader.readAsDataURL(file))
        e.preventDefault()
        setFile(e.target.files[0])
    }


    const addDescriptionWithForm = (option_title, option_value, id) => {
        if(formDescriptions.filter(x => x.id == id).length !== 0) {
            setFormDescriptions(formDescriptions.map(x => x.id === id ? {...x, description : option_value} : x))
            return
        }
    }
    
    const changeDescription = (key, value, id) => {
        setDescriptions(descriptions.map(x => x.id === id ? {...x, [key] : value} : x))
    }

    const removeDescription = (id) => {
        setDescriptions(descriptions.filter(i => i.id !== id))
    }

    const addDescription = () => {
        setDescriptions([...descriptions , {title: '', description : '', id: Date.now()}])
    }

    const addDevice = () => {
        console.log(formDescriptions.concat(descriptions))
        const formData = new FormData()
        formData.append('type', type)
        formData.append('brand', brand)
        formData.append('price', price)
        formData.append('device', name)
        formData.append('file', file)
        formData.append('description', JSON.stringify(formDescriptions.concat(descriptions)))
        console.log(file)
        createDevice(formData)
    }


    
    console.log(
        // formDescriptions,
        // descriptions, 
        goodsFomr)

    return (
        <>
            <div className='adminProfile-card card'>
                <p className='title-adminProfile'>Добавление товара в список продаж</p>
                    <div className='card__block'>
                        <select onChange={e =>  setBrand(e.target.value)}>
                            <option>Выберите брэнд</option>
                            {brands && brands.map(item => <option key={item._id}>{item.brand}</option>)}
                        </select>
                    </div>
                    <div className='card__block'>
                        <select style={{'height' : '28px'}} onChange={e => goodsOptionsType(e.target.value)}>
                            <option style={{'height' : '48px'}}>Выберите тип</option>
                            {types && types.map(item => <option key={item._id} >{item.type}</option>)}
                        </select>
                    </div>
                    <div className='card__block'>
                        <input
                        placeholder='Введите название устройства'
                        type='text'
                        onChange={e => setName(e.target.value)}
                        value={name}
                        />
                    </div>
                    <div className='card__block'>
                        <input
                        placeholder='Введите цену устройства'
                        type="text"
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                        />
                    </div>
                    <p className='card__titleFile' >Картинка товара</p>
                    <div className='card__block'>
                        <input
                        type='file'
                        onChange={Upload}
                        accept=".jpg"
                        />
                    </div>
                    <div className='card__block'>
                        <img alt='' src={testFile} width="200px" height="200px"/>
                    </div>
                    <div>
                        <h1>Обязательные фильтры</h1>
                        {goodsFomr.descriptions && goodsFomr.descriptions.map(x => 
                            <div>
                                {x.option_title}
                                    <select onChange={(e) => addDescriptionWithForm(x.option_title, e.target.value, x._id)}>
                                        <option>Виберите опцию</option>
                                        {x.option_value.map(y =>
                                        <option id={x.id} key={y._id}>{y.value}</option>
                                        )}
                                    </select>    
                                
                            </div>
                        )}
                    </div>
                    <h1>Добавить описание</h1>
                    {descriptions.map(x => 
                        <div key={x.id} className='description-profileCard'>
                            <p>Название</p>
                            <input className='description-profileCard__title' value={x.title} onChange={(e) => changeDescription('title', e.target.value, x.id)}></input>
                            <p>Значение</p>
                            <input className='description-profileCard__value' value={x.description} onChange={(e) => changeDescription('description', e.target.value, x.id)}></input>
                            <button className='description-profileCard__buttonDel' onClick={() => removeDescription(x.id)}>Удалить</button>
                        </div>
                    )}
                    <button className='descriptions-profile__buttonAdd' onClick={addDescription}>Добавить</button>
                    <button className='description-profileCard__create' onClick={addDevice}>Создать девайс</button>
            </div>
        </>
    )
}
import { useGetTypesQuery } from "../../../../Redux/Type/typeAPI"
import { useState } from "react"
import { useGetBrandQuery } from "../../../../Redux/Brand/brandAPI"
import { useCreateDeviceMutation, useGetOptionAllQuery } from "../../../../Redux/Device/deviceAPI"
import { useDispatch, useSelector } from "react-redux"
import { setFormDescriptions, setGoodsForm, changeFormDescriptions, addNewDescription, removeNewDescription, changeNewDescription, changeNewDevice } from "../../../../Redux/Admin/CreateDevice/CreateDevSlice"

export const CreateDevice = () => {

    const dispatch = useDispatch()

    const { goodsFomr, formDescriptions, newDescriptions } = useSelector(state => state.createDevSlice)
    const { name, price, brand, type } = useSelector(state => state.createDevSlice.newDevice)

    const {data: types = []} = useGetTypesQuery()
    const {data: brands = []} = useGetBrandQuery()
    const {data : OptionAll} = useGetOptionAllQuery()
    const [createDevice] = useCreateDeviceMutation()

    const [file, setFile] = useState(null)

    const goodsOptionsType = (e) => {
        const {name, value} = e.target
        dispatch(changeNewDevice({key : name, value : value}))
        let filter = OptionAll.find(x => x.type == value)
        if(filter) {
            let copy = JSON.parse(JSON.stringify(filter))
            dispatch(setGoodsForm(copy)) 
            dispatch(setFormDescriptions(copy.descriptions.map(x => {return {title : x.option_title, description : '', id: x._id}})))
            return
        }
        dispatch(setGoodsForm({}))
        dispatch(setFormDescriptions([]))
    }


    const [submittedPhoto, setSubmittedPhoto] = useState(null)

    const Upload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = ev => {
            setSubmittedPhoto(ev.target.result)
        }
        console.log(reader.readAsDataURL(file))
        e.preventDefault()
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('type', type)
        formData.append('brand', brand)
        formData.append('price', price)
        formData.append('device', name)
        formData.append('file', file)
        formData.append('description', JSON.stringify(formDescriptions.concat(newDescriptions)))
        createDevice(formData)
    }

    return (
        <>
            <div className='adminProfile-card card'>
                <p className='title-adminProfile'>Добавление товара в список продаж</p>
                    <div className='card__block'>
                        <select 
                            name="brand"
                            onChange={e => dispatch(changeNewDevice({key : e.target.name, value : e.target.value}))}
                        >
                            <option>Выберите брэнд</option>
                            {brands && brands.map(item => <option key={item._id}>{item.brand}</option>)}
                        </select>
                    </div>
                    <div className='card__block'>
                        <select 
                            style={{'height' : '28px'}} 
                            name="type"
                            onChange={e => goodsOptionsType(e)}
                        >
                            <option style={{'height' : '48px'}}>Выберите тип</option>
                            {types && types.map(item => <option key={item._id} >{item.type}</option>)}
                        </select>
                    </div>
                    <div className='card__block'>
                        <input
                        placeholder='Введите название устройства'
                        type='text'
                        name="name"
                        onChange={e => dispatch(changeNewDevice({key : e.target.name, value : e.target.value}))}
                        value={name}
                        />
                    </div>
                    <div className='card__block'>
                        <input
                        placeholder='Введите цену устройства'
                        type="text"
                        name="price"
                        onChange={e => dispatch(changeNewDevice({key : e.target.name, value : e.target.value}))}
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
                        <img alt='' src={submittedPhoto} width="200px" height="200px"/>
                    </div>
                    <div>
                        <h1>Обязательные фильтры</h1>
                        {goodsFomr.descriptions && goodsFomr.descriptions.map(x => 
                            <div>
                                {x.option_title}
                                    <select
                                        onChange={(e) => dispatch(changeFormDescriptions({value : e.target.value, id : x._id}))}
                                    >
                                        <option>Виберите опцию</option>
                                        {x.option_value.map(y =>
                                        <option id={x.id} key={y._id}>{y.value}</option>
                                        )}
                                    </select>    
                                
                            </div>
                        )}
                    </div>
                    <h1>Добавить описание</h1>
                    {newDescriptions.map(x => 
                        <div key={x.id} className='description-profileCard'>
                            <p>Название</p>
                            <input 
                                className='description-profileCard__title' 
                                value={x.title}
                                name="title"
                                onChange={(e) => dispatch(changeNewDescription({key : e.target.name, value : e.target.value, id : x.id}))}
                            >
                            </input>
                            <p>Значение</p>
                            <input 
                                className='description-profileCard__value' 
                                value={x.description} 
                                name="description"
                                onChange={(e) => dispatch(changeNewDescription({key : e.target.name, value : e.target.value, id : x.id}))}
                            >
                            </input>
                            <button className='description-profileCard__buttonDel' onClick={() => dispatch(removeNewDescription(x.id))}>Удалить</button>
                        </div>
                    )}
                    <button className='descriptions-profile__buttonAdd' onClick={() => dispatch(addNewDescription())}>Добавить</button>
                    <button className='description-profileCard__create' onClick={addDevice}>Создать девайс</button>
            </div>
        </>
    )
}
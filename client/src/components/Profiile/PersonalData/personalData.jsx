import { useSelector } from "react-redux"
import { Loader } from "../../Loader"
import { useState } from "react"
import { useEffect } from "react"
import { selectUser } from "../../../selectors/selectors"


const serv = 'http://localhost:5000/'

export const PersonalData = () => {
    const User = useSelector(selectUser)

    const [userForm, setUserForm] = useState({
        paymentMethod : 'Не выбран',
        city : '',
        deliveryMethod : 'Картой',
        streetHouse : '',
        apartment : '',    
    })

    const [file, setFile] = useState(null)

    useEffect(() => {
        if(User) {
            setUserForm({...User.personalData})
        }
    },[User])




    const changeHandler = evant => {
        if(evant.target.name == 'file') {
            return setFile(evant.target.files[0]) 
        }
        setUserForm({...userForm, [evant.target.name] : evant.target.value})
    }

    const updateHandler = () => {
        const formData = new FormData()
        formData.append('User', JSON.stringify(userForm))
        formData.append('file', file)

        fetch(`http://localhost:5000/api/user/updateUser/${User._id}`, {
            method : "POST",
            body : formData
        })
    }


    return (
        <>
            {User ? 
                <div>
                    <h1>{User?.firstName}</h1>
                    <p>Имя</p>
                    <input 
                        value={userForm?.firstName}
                        name='firstName'

                        onChange={(e) => changeHandler(e)}
                    />

                    <p>Фамилия</p>
                    <input
                        value={userForm?.lastName}
                        name='lastName'

                        onChange={(e) => changeHandler(e)}
                    />

                    <p>Телефон</p>
                    <input
                        value={userForm?.phone}
                        name='phone'

                        onChange={(e) => changeHandler(e)}
                    />

                    <p>Предпочтительный способ оплаты</p>
                    <select 
                        name="paymentMethod" 
                        value={userForm?.paymentMethod}

                        onChange={(e) => changeHandler(e)}
                    >
                        <option>Не выбран</option>
                        <option>Наличными</option>
                        <option>Картой</option>
                    </select>

                    <p>Улица/дом</p>
                    <input
                        value={userForm?.streetHouse}
                        name='streetHouse'

                        onChange={(e) => changeHandler(e)}
                    />

                    <p>Квартира</p>
                    <input
                        value={userForm?.apartment}
                        name='apartment'

                        onChange={(e) => changeHandler(e)}
                    />

                    <p>Город</p>
                    <input 
                        value={userForm?.city}
                        name='city'

                        onChange={(e) => changeHandler(e)}
                    />

                    <p>Предпочтительный способ доставки</p>
                    <select 
                        name="deliveryMethod" 
                        value={userForm?.deliveryMethod}

                        onChange={(e) => changeHandler(e)}
                    >
                        <option>Не выбран</option>
                        <option>Доставка</option>
                        <option>Самовывоз</option>
                    </select>
                    
                    <img src={serv + userForm?.img} width="200px"/>

                    <p>Аватар</p>
                    <input 
                        name='file'
                        type='file'

                        onChange={(e) => changeHandler(e)}
                    />
                    <button onClick={updateHandler}>Update</button>
                </div>
            :
            <Loader/>
            } 
        </>
    )
}
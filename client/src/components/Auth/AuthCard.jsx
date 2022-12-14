import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../Redux/User/userSlice";
import { useLoginMutation, useRegistrationMutation } from "../../Redux/User/authAPI";
import './AuthCard.scss'



export const AuthCard = ({setActive}) => {

    const dispath = useDispatch()

    const navigate = useNavigate()

    const goProfile = () => navigate('profile/userInfo', {replace : true})

    const [loginHide, setLoginHide] = useState(false)

    const [Registr] = useRegistrationMutation()
    const [login] = useLoginMutation()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [registrForm, setRegistrForm] = useState({
        firstName : '',
        lastName : '',
        phone : '',
    })

    const [error, setError] = useState('')

    const changeHandler = evant => {
        const name = evant.target.name
        if(name == 'phone' || name == 'firstName' || name == 'lastName') {
            setRegistrForm({...registrForm, [evant.target.name] : evant.target.value})
        }
        setForm({...form, [evant.target.name] : evant.target.value})
    }
    
    const logingHandle = () => {
        login(form).then(res => {
            if(res.error) {
                console.log(res.error.data.message)
                setError(res.error.data.message)
            } else {
                dispath(setUser(res.data))
                setError('')
                goProfile()
                setActive(false)
            }              
        })
    }

    const registrHandl = () => {
        Object.assign(form, registrForm)
        Registr(form).then(res => {
            if(res.error) {
                console.log(res.error.data.message)
                setError(res.error.data.message)
            } else {
                console.log(res)
                dispath(setUser(res.data))
                setError('')
            } 
        })
    }

    return (
        <>
                <div className="Auth-Page-card">
                    <div className="auth-card">
                        <h1 className="auth-card__header">??????????????????????</h1>
                        <div className="auth-card__form form">
                            <p className="form__header-email">????.??????????</p>
                            <input
                                className="form__input" 
                                placeholder="?????????????? login" 
                                name="email" 
                                value={form.email} 
                                onChange={changeHandler}/>
                            <p className="form__header-password">???????????????????? ????????????</p>
                            <input
                                className="form__input"
                                type='password' 
                                placeholder="?????????????? ????????????" 
                                name="password" 
                                value={form.password}
                                onChange={changeHandler}/>
                            {
                                loginHide ? 
                                <div>
                                    <p className="form__header-password">??????????????</p>
                                    <input
                                        className="form__input"
                                        type="text"
                                        placeholder="?????????????? ??????????????"
                                        name="phone"
                                        value={registrForm.phone}
                                        onChange={changeHandler}
                                    />
                                    <p className="form__header-password">??????</p>
                                    <input
                                        className="form__input"
                                        type="text"
                                        placeholder="?????????????? ??????"
                                        name="firstName"
                                        value={registrForm.firstName}
                                        onChange={changeHandler}
                                    />
                                    <p className="form__header-password">??????????????</p>
                                    <input
                                        className="form__input"
                                        type="text"
                                        placeholder="?????????????? ??????"
                                        name="lastName"
                                        value={registrForm.lastName}
                                        onChange={changeHandler}
                                    />
                                </div>
                                :
                                null
                            }
                            <div>
                                {loginHide ? 
                                    <button className="form__buttRegistr" onClick={registrHandl}>????????????????????????????????????</button> 
                                    : 
                                    <button className="form__buttRegistr" onClick={logingHandle}>Login</button>
                                }
                                
                            </div>
                            <span className="form__href" onClick={() => setLoginHide(!loginHide)}>{loginHide ? '?? ?????? ??????????????????????????????': '????????????????????????????????????'}</span>
                            <div>
                                {error && 
                                <div className="form__error"><p>{error}</p></div>
                                }
                            </div>
                        </div>
                    </div>        
                </div>              
        </>
    )
}
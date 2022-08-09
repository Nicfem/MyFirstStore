import { useSelector } from "react-redux"
import { Loader } from "../../Loader"
import { selectUser } from "../../../selectors/selectors"

const serv = 'http://localhost:5000/'

export const UserInfo = () => {

    const User = useSelector(selectUser)
    
    return (
        <>
            {User ? 
                <div>
                    <h1>{User?.personalData?.firstName}</h1>
                    <h2>{User?.personalData.lastName}</h2>
                    <h2>{`Активацыя: ${User?.personalData.isActivated ? 'true' : 'false'}`}</h2>
                    <h2>{`Телефон: ${User?.personalData.phone}`}</h2>
                    <img src={serv + User?.personalData.img} width="200px"/>
                </div>
            :
            <Loader/>
            } 
        </>
    )
}
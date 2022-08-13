import { useSelector } from "react-redux"
import { AuthPage } from './../components/Auth/AuthPage'
import { AuthCard } from './../components/Auth/AuthCard'

const AuthHoc = ({children}) => {
    let auth = useSelector(state => state.user.isAuth)
    
    if(auth) {
        return children
    }
    
    return <AuthPage children={<AuthCard/>}/>
}

export default AuthHoc
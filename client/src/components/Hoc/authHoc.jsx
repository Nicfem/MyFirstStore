import { useSelector } from "react-redux"
import AuthPage from "../Auth/AuthPage"


const AuthHoc = ({children}) => {
    let auth = useSelector(state => state.user.isAuth)

    if(auth) {
        return children
    }
    
    return <AuthPage/>
}

export default AuthHoc
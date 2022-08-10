import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const AuthHoc = ({children}) => {
    let auth = useSelector(state => state.user.isAuth)
    

    if(auth) {
        return children
    }
    
    return Navigate({to: '/auth'})
}

export default AuthHoc
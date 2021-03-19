import React, { useState, createContext } from 'react'

export const AuthContext = createContext({
    isAuth: false,
    login: () => {}
    //user:{}
})

const AuthContextProvider = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    // const [userObj, setUserObj] = useState()

    const loginHandler = () => {
        setIsAuthenticated(true)
    }

    return(
        <AuthContext.Provider value={{ isAuth: isAuthenticated, login: loginHandler }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider
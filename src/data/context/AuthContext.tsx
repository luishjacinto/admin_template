import { createContext, useEffect, useState } from "react";
import firebase from '../../firebase/config'
import User from "../../model/User";
import route from 'next/router';
import Cookies from 'js-cookie'

interface AuthContextProps {
    user: User
    signUp: (email:string , password: string) => Promise<void>
    signIn: (email:string , password: string) => Promise<void>
    signInGoogle: () => Promise<void>
    logout: () => Promise<void>
    loading: boolean
}

const AuthContext = createContext<AuthContextProps>({})

async function userNormalized(firebaseUser: firebase.User): Promise<User>{
    const token = await firebaseUser.getIdToken()

    return {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        token,
        provider: firebaseUser.providerData[0].providerId,
        imageUrl: firebaseUser.photoURL
    }
}

function manageSessionCookie(loggedIn: boolean) {
    if (loggedIn){
        Cookies.set('sess_cookie', loggedIn, {
            expires: 7
        })
    } else {
        Cookies.remove('sess_cookie')
    }
}

export function AuthProvider(props){
    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if(Cookies.get('sess_cookie')){
            const cancelFirebaseObserver = firebase.auth().onIdTokenChanged(configSession)

            return () => cancelFirebaseObserver()
        } else {
            setLoading(false)
        }
    }, [])

    async function configSession(firebaseUser){
        if (firebaseUser?.email){
            const user = await userNormalized(firebaseUser)
            setUser(user)
            manageSessionCookie(true)
            setLoading(false)

            return user.email

        } else {
            setUser(null)
            manageSessionCookie(false)
            setLoading(false)

            return false

        }
    }

    async function signUp(email: string, password: string) {
        try{
            setLoading(true)
            const response = await firebase.auth()
                .createUserWithEmailAndPassword(email, password)

            configSession(response.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }


    async function signIn(email: string, password: string) {
        try{
            setLoading(true)
            const response = await firebase.auth()
                .signInWithEmailAndPassword(email, password)

            configSession(response.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function signInGoogle() {
        try{
            setLoading(true)
            const response = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )

            configSession(response.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try{
            setLoading(true)
            await firebase.auth().signOut()
            await configSession(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signUp,
            signIn,
            signInGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
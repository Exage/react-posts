import React, { useEffect, useState } from 'react'

import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, firestore } from '../firebase'
import { doc, getDoc } from "firebase/firestore"

import { Navigate } from 'react-router-dom'
import { Loading } from '../components/Loading/Loading.jsx'

import { Header } from './Home/Header/Header'

import styles from './Home.module.scss'

export const Home = () => {
    const [isAuth, setAuth] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null)

    const getUserData = async (uid) => {
        const docRef = doc(firestore, 'users', uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setUserData(docSnap.data())
        } else {
            setAuth(false)
        }

        setLoading(false)
    }

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('Sign Out Suceesful')
        }).catch(error => console.log(error))
    }

    useEffect(() => {
        const logged = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserData(user.uid)
                setAuth(true)
            } else {
                setAuth(false)
                setLoading(false)
            }
        })

        return (() => {
            logged()
        })
    }, [])

    if (isLoading) {
        return <Loading text='Welcome Back...' />
    }

    if (!isAuth) {
        return <Navigate to='/login' />
    }

    return (
        <div className={styles.home}>
            <div className="wrapper">
                <Header userData={userData} userSignOut={userSignOut} />
            </div>
        </div>
    )
}

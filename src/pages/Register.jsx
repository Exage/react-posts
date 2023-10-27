import React, { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'

import { auth, firestore } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import { Loading } from '../components/Loading/Loading'
import { Input } from '../components/UI/Input/Input'
import { Button } from '../components/UI/Button/Button'

import styles from './Auth.module.scss'

export const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')

    const [disableInputs, setDisableInputs] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [isAuth, setAuth] = useState(false)
    const [errorCatch, setErrorCatch] = useState(false)

    const setUsersToDb = async (uid) => {
        if (name.trim() && lastName.trim()) {
            const dateNow = new Date()
            const obj = {
                name: name.trim(),
                lastName: lastName.trim(),
                joinDate: {
                    seconds: dateNow.getSeconds(),
                    minutes: dateNow.getMinutes(),
                    hours: dateNow.getHours(),
                    day: dateNow.getDate(),
                    month: dateNow.getMonth() + 1,
                    year: dateNow.getFullYear(),
                    valueOf: dateNow.valueOf()
                },
                posts: []
            }
            await setDoc(doc(firestore, `users/${uid}`), obj)
            setAuth(true)
        } else {
            setDisableInputs(false)
            setDisableButton(false)
            setErrorCatch(true)
            setAuth(false)
        }
    }

    const handleSubmit = (Event) => {
        Event.preventDefault()
        setDisableInputs(true)
        setDisableButton(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCreditional) => {
                setUsersToDb(userCreditional.user.uid)
            })
            .catch(() => {
                setDisableInputs(false)
                setDisableButton(false)
                setErrorCatch(true)
            })
    }

    useEffect(() => {
        const logged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuth(true)
            } else {
                setAuth(false)
            }
            setLoading(false)
        })

        return (() => {
            logged()
        })
    }, [])

    if (isLoading) {
        return <Loading />
    }

    if (isAuth) {
        return <Navigate to='/' />
    }

    return (
        <div className={styles.auth}>
            <div className={styles.authWrapper}>
                <h1 className={styles.authTitle}>Join Us</h1>
                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <div className={styles.authFormInputs}>
                        <Input
                            disabled={disableInputs}
                            type='text'
                            placeholder='name'

                            className={styles.authFormInput}
                            style={{ width: 'calc(50% - 10px)' }}

                            value={name}
                            onChange={Event => setName(Event.target.value)}
                        />
                        <Input
                            disabled={disableInputs}
                            type='text'
                            placeholder='lastname'

                            className={styles.authFormInput}
                            style={{ width: 'calc(50% - 10px)' }}

                            value={lastName}
                            onChange={Event => setLastName(Event.target.value)}
                        />
                        <Input
                            disabled={disableInputs}
                            type='email'
                            placeholder='email'

                            className={styles.authFormInput}

                            value={email}
                            onChange={Event => setEmail(Event.target.value)}
                        />
                        <Input
                            disabled={disableInputs}
                            type='password'
                            placeholder='password'

                            className={styles.authFormInput}

                            value={password}
                            onChange={Event => setPassword(Event.target.value)}
                        />
                    </div>

                    {errorCatch && <span className='error'>There was a problem</span>}

                    <Button
                        disabled={disableButton}
                        type='submit'
                        className={styles.authFormBtn}
                        style={
                            { marginTop: `${errorCatch ? '20px' : '50px'}` }
                        }
                    >
                        Submit
                    </Button>

                    <span className={styles.authSub}>
                        or <Link to='/login'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

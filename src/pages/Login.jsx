import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

import { Loading } from '../components/Loading/Loading'
import { Button } from '../components/UI/Button/Button'
import { Input } from '../components/UI/Input/Input'

import styles from './Auth.module.scss'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [disableInputs, setDisableInputs] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [isAuth, setAuth] = useState(false)
    const [errorCatch, setErrorCatch] = useState(false)

    const handleSubmit = (Event) => {
        Event.preventDefault()
        setDisableInputs(true)
        setDisableButton(true)

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setAuth(true)
            })
            .catch(() => {
                setDisableInputs(false)
                setDisableButton(false)
                setErrorCatch(true)
                setEmail('')
                setPassword('')
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
                <h1 className={styles.authTitle}>Log in our Page</h1>
                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <div className={styles.authFormInputs}>
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

                    {errorCatch && <span className='error'>Incorrect Email or Password</span>}

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
                        or try <Link to='/register'>Register</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

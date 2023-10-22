import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import styles from './Input.module.scss'

export const Input = ({ placeholder, type = 'text', disabled = false, className, value, onChange, style }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [focus, setFocus] = useState(false)

    if (type === 'text' || type === 'email') {
        return (
            <div className={`${styles.inputWrapper}${className ? ` ${className}` : ''}${disabled ? ` ${styles.inputWrapperDisabled}` : ''}${focus ? ` ${styles.inputWrapperFocus}` : ''}`} style={style}>
                <input
                    disabled={disabled}
                    type={type}
                    placeholder={placeholder}

                    className={styles.inputWrapperField}

                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
            </div>
        )
    }
    if (type === 'password') {
        return (
            <div className={`${styles.inputWrapper} ${styles.inputWrapperPassword}${className ? ` ${className}` : ''}${disabled ? ` ${styles.inputWrapperDisabled}` : ''}${focus ? ` ${styles.inputWrapperFocus}` : ''}`} style={style}>
                <input
                    disabled={disabled}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}

                    className={styles.inputWrapperField}

                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
                <button
                    className={styles.inputWrapperPasswordBtn} type='button' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
            </div>
        )
    }

}

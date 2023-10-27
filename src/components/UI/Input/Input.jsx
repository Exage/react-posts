import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import TextareaAutosize from 'react-textarea-autosize'

import styles from './Input.module.scss'

export const Input = ({ placeholder, type = 'text', disabled = false, className, value, onChange, style, onFocus }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [focus, setFocus] = useState(false)

    const handleFocus = () => {
        setFocus(true)
    }

    const handleBlur = () => {
        setFocus(false)
    }

    if (type === 'password') {
        return (
            <div className={`${styles.inputWrapper} ${styles.inputWrapperPassword}${className ? ` ${className}` : ''}${disabled ? ` ${styles.inputWrapperDisabled}` : ''}${focus ? ` ${styles.inputWrapperFocus}` : ''} input`} style={style}>
                <input
                    disabled={disabled}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}

                    className={styles.inputWrapperField}

                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <button
                    className={styles.inputWrapperPasswordBtn} type='button' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
            </div>
        )
    } else if (type === 'textarea') {
        return (
            <div className={`${styles.inputWrapper}${className ? ` ${className}` : ''}${disabled ? ` ${styles.inputWrapperDisabled}` : ''}${focus ? ` ${styles.inputWrapperFocus}` : ''} input`} style={style}>
                <TextareaAutosize 
                    disabled={disabled}
                    placeholder={placeholder}

                    className={styles.inputWrapperField}
                    minRows={3}

                    value={value}
                    onChange={onChange}

                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        )
    } else {
        return (
            <div className={`${styles.inputWrapper}${className ? ` ${className}` : ''}${disabled ? ` ${styles.inputWrapperDisabled}` : ''}${focus ? ` ${styles.inputWrapperFocus}` : ''} input`} style={style}>
                <input
                    disabled={disabled}
                    type={type}
                    placeholder={placeholder}

                    className={styles.inputWrapperField}

                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        )
    }

}

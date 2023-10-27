import React from 'react'

import styles from './Button.module.scss'

export const Button = ({ children, disabled = false, type = 'button', className = false, style, onClick, title }) => {
    return (
        <button 
            type={type} 
            disabled={disabled} 
            className={`${styles.btn}${(className) ? ` ${className}` : ''}`}
            style={style}
            onClick={onClick}
            title={title}
        >
            {children}
        </button>
    )
}

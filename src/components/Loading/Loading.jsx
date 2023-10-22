import React from 'react'

export const Loading = ({ text = 'Loading...' }) => {
    return (
        <h3 style={{ opacity: 0.75, fontWeight: 600, textAlign: 'center' }}>{text}</h3>
    )
}

import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { FiEdit2 } from 'react-icons/fi'

import { Button } from '../../../components/Button/Button'

import styles from './Header.module.scss'

export const Header = ({ userData, userSignOut }) => {
    return (
        <div className={styles.header}>
            <div className={styles.headerUser}>
                Welcome, <h3>{userData.name} {userData.lastName}</h3>
            </div>
            <div className={styles.headerControls}>
                <Button title={'Edit'} className={styles.headerControlsBtn} >
                    <FiEdit2 />
                </Button>
                <Button title={'Sign Out'} className={`${styles.headerControlsBtn} ${styles.headerControlsBtnSignOut}`} onClick={userSignOut}>
                    <FaSignOutAlt />
                </Button>
            </div>
        </div>
    )
}

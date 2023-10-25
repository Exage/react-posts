import React, { useEffect, useState } from 'react'

import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '../../../firebase'

import styles from './EditInfo.module.scss'

import { Button } from '../../../components/Button/Button'
import { Input } from '../../../components/Input/Input'

export const EditInfo = ({ closeElem, uid, userData, setUserData, setControlDisabled }) => {
    const [nameToUpd, setNameToUpd] = useState(userData.name)
    const [lastNameToUpd, setLastNameToUpd] = useState(userData.lastName)

    const [isDataSend, setDataSend] = useState(false)
    const [btnDisable, setBtnDisable] = useState('')

    const updateUserData = async (Event) => {
        Event.preventDefault()
        
        setDataSend(true)
        setBtnDisable(true)
        setControlDisabled(true)

        if (nameToUpd && lastNameToUpd) {
            const obj = {
                name: nameToUpd.toString(),
                lastName: lastNameToUpd.toString(),
                joinDate: userData.joinDate,
                posts: [...userData.posts]
            }
            await setDoc(doc(firestore, `users/${uid}`), obj, { merge: true })
            setUserData(obj)
        }

        setDataSend(false)
        setControlDisabled(false)
    }

    useEffect(() => {
        const checkFields = () => {
            if ((nameToUpd.trim() === userData.name && lastNameToUpd.trim() === userData.lastName) || (nameToUpd.trim() === '' || lastNameToUpd.trim() === '')) {
                setBtnDisable(true)
            } else {
                setBtnDisable(false)
            }
        }
        
        checkFields()

        return(() => {
            checkFields()
        })
    }, [nameToUpd, lastNameToUpd])
    
    return (
        <div className={setDataSend ? styles.editInfo : `${styles.editInfo} ${styles.editInfoDisabled}`}>
            <div className={styles.editInfoHeader}>
                <h2 className={styles.editInfoHeaderTitle}>Edit Info</h2>
                <button disabled={isDataSend} onClick={closeElem} className={styles.editInfoHeaderBtn}>
                    close
                </button>
            </div>
            <div className={styles.editInfoBody}>
                <form onSubmit={updateUserData} className={styles.editInfoBodyForm}>
                    <Input 
                        placeholder='Name' 
                        className={styles.editInfoBodyInput} 

                        disabled={isDataSend}

                        value={nameToUpd}
                        onChange={Event => setNameToUpd(Event.target.value)}
                    />
                    <Input 
                        placeholder='Last Name' 
                        className={styles.editInfoBodyInput}

                        disabled={isDataSend}

                        value={lastNameToUpd}
                        onChange={Event => setLastNameToUpd(Event.target.value)}
                    />
                    <Button disabled={btnDisable} type='submit' className={styles.editInfoBodyButton}>
                        submit
                    </Button>
                </form>
            </div>
        </div>
    )
}

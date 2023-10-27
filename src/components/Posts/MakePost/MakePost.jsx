import React, { useState } from 'react'
import { doc, getDoc, writeBatch } from 'firebase/firestore'
import { firestore } from '../../../firebase'
import { v4 as uuidv4 } from 'uuid'

import styles from './MakePosts.module.scss'

import { Input } from '../../UI/Input/Input'
import { Button } from '../../UI/Button/Button'

export const MakePost = ({ userData, setUserData, uid, controlsDisabled, setControlDisabled }) => {
    const [body, setBody] = useState('')
    const [title, setTitle] = useState('')

    const [errorCatch, setErrorCatch] = useState(false)

    const handleSubmit = async (Event) => {
        Event.preventDefault()

        setControlDisabled(true)
        setErrorCatch(false)

        if (title.trim() && body.trim()) {
            const dateNow = new Date()
            const newPost = {
                title: title,
                body: body,
                uid: uid,
                authorName: userData.name,
                authorLastName: userData.lastName,
                uuid: uuidv4(),
                time: {
                    seconds: dateNow.getSeconds(),
                    minutes: dateNow.getMinutes(),
                    hours: dateNow.getHours(),
                    day: dateNow.getDate(),
                    month: dateNow.getMonth() + 1,
                    year: dateNow.getFullYear(),
                    valueOf: dateNow.valueOf()
                }
            }

            const newPosts = [newPost, ...userData.posts]

            try {
                const userRef = doc(firestore, 'users', uid)
                const userSnap = await getDoc(userRef)

                if (userSnap.exists()) {
                    const userDoc = userSnap.data()
                    userDoc.posts = newPosts

                    const batch = writeBatch(firestore)
                    batch.update(userRef, userDoc)

                    await batch.commit()
                    setUserData(userDoc)
                }
            } catch (error) {
                console.error('Error updating document: ', error)
            }
        } else {
            setErrorCatch(true)
        }

        setControlDisabled(false)
    }

    return (
        <div className={styles.makePost}>
            <h2 className={styles.makePostTitle}>Type Post</h2>
            <form onSubmit={handleSubmit} className={styles.makePostForm}>
                <Input
                    placeholder='Title Your Post'
                    disabled={controlsDisabled}

                    className={`${styles.makePostInput} ${styles.makePostInputTitle}`}

                    value={title}
                    onChange={Event => setTitle(Event.target.value)}
                />
                <Input
                    type='textarea'
                    placeholder='Type Your Post'

                    disabled={controlsDisabled}

                    className={`${styles.makePostInput} ${styles.makePostInputTextArea}`}

                    value={body}
                    onChange={Event => setBody(Event.target.value)}
                />

                {errorCatch && <span className='error'>There was a problem</span>}

                <Button
                    type='submit'
                    
                    style={{ marginTop: errorCatch ? '15px' : '45px' }}
                    className={styles.makePostBtn}
                    
                    disabled={controlsDisabled}
                >
                    submit
                </Button>
            </form>
        </div>
    )
}

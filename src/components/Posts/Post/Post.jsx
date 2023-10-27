import React from 'react'
import { doc, getDoc, writeBatch } from 'firebase/firestore'
import { firestore } from '../../../firebase'

import { AiFillDelete } from 'react-icons/ai'

import styles from './Post.module.scss'

export const Post = ({ item, uid, userData, setUserData, controlsDisabled, setControlDisabled }) => {

    const handleDelete = async (uuid) => {
        const newPosts = userData.posts.filter(item => item.uuid !== uuid)

        setControlDisabled(true)

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

        setControlDisabled(false)
    }

    return (
        <div className={`${styles.post} post`} key={item.uuid}>
            <div className={styles.postHeader}>
                <h2 className={styles.postTitle}>{item.title}</h2>
                <button disabled={controlsDisabled} onClick={() => handleDelete(item.uuid)} className={styles.postDelete}>
                    <AiFillDelete />
                </button>
            </div>
            <p className={styles.postBody}>
                {item.body}
            </p>
            <div className={styles.postBottom}>
                <div className={styles.postAuthor}>
                    <span className={styles.postAuthorName}>{userData.name}</span>
                    &nbsp;
                    <span className={styles.postAuthorLastName}>{userData.lastName}</span>
                </div>
                <div className={styles.postTime}>
                    {(item.time.day < 10) ? `0${item.time.day}` : item.time.day}
                    .
                    {(item.time.month < 10) ? `0${item.time.month}` : item.time.month}
                    .
                    {(item.time.year < 10) ? `0${item.time.year}` : item.time.year}
                    &nbsp;&bull;&nbsp;
                    {(item.time.hours < 10) ? `0${item.time.hours}` : item.time.hours}
                    :
                    {(item.time.minutes < 10) ? `0${item.time.minutes}` : item.time.minutes}
                </div>
            </div>
        </div>
    )
}

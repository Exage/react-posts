import React, { useEffect } from 'react'

import { doc, onSnapshot } from 'firebase/firestore'
import { firestore } from '../../../firebase'

import { TbMoodEmpty } from 'react-icons/tb'

import styles from './PostsWrapper.module.scss'
import { Post } from '../Post/Post'

export const PostsWrapper = ({ uid, userData, setUserData, controlsDisabled, setControlDisabled }) => {

    useEffect(() => {
        const unsub = onSnapshot(doc(firestore, 'users', uid), (doc) => {
            userData.posts = doc.data().posts
            console.log(doc.data().posts)
        })
        return (() => {
            unsub()
        })
    }, [])

    // if (controlsDisabled) {
    //     return <Loading />
    // }

    if (userData.posts.length === 0) {
        return (
            <h2 className={styles.postsEmpty}>
                <TbMoodEmpty className={styles.postsEmptyIcon} />
                No Posts
            </h2>
        )
    }

    return (
        <div className={controlsDisabled ? `${styles.postsWrapper} ${styles.postsWrapperFetching}` : styles.postsWrapper}>
            {userData.posts.map(item =>
                <Post 
                    item={item}
                    uid={uid}

                    setUserData={setUserData}
                    userData={userData} 
                    
                    controlsDisabled={controlsDisabled} 
                    setControlDisabled={setControlDisabled} 
                />
            )}
        </div>
    )
}

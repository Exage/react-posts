import React from 'react'

import styles from './Posts.module.scss'

import { MakePost } from './MakePost/MakePost'
import { PostsWrapper } from './PostsUser/PostsWrapper'

export const Posts = ({ uid, userData, setUserData, controlsDisabled, setControlDisabled }) => {
    return (
        <div className={styles.posts}>
            <MakePost 
                uid={uid}

                userData={userData}
                setUserData={setUserData}
                
                controlsDisabled={controlsDisabled}
                setControlDisabled={setControlDisabled}
            />
            <PostsWrapper 
                uid={uid}

                userData={userData}
                setUserData={setUserData}

                controlsDisabled={controlsDisabled}
                setControlDisabled={setControlDisabled}
            />
        </div>
    )
}

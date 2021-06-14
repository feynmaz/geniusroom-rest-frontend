import React from 'react'
import { ArticleList } from './ArticleList'
import { useHistory } from "react-router";

export const Profile = () => {
    const history = useHistory()
    
    return (
        <>
            <div>
                Profile
            </div>
            <div>
                <h3 className={'title'} onClick={() => history.push(`/`)}>Главная</h3>
            </div>
        </>                    
    )
}
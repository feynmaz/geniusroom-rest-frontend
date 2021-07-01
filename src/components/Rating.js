import { React, useState, useContext, useEffect } from 'react'
import axios from "axios"
import { useHistory } from "react-router"
import { AuthContext } from '../context/AuthContext'

export const Rating = ({articleId, rating, setRating, setIsLoading}) => {
    const history = useHistory()
    const { access, validateAccess } = useContext(AuthContext)
    const [ratingUpDisabled, setRatingUpDisabled] = useState(true)
    const [ratingDownDisabled, setRatingDownDisabled] = useState(true)

    useEffect(() => {
        async function fetchRating() {
            if (access){
                const responceRatingByUser = await fetch(`https://geniusroom-rest-backend.herokuapp.com/api/v1/articles/${articleId}/rating_by_this_user/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + access,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',           
                    }
                })
                const dataResponceRatingByUser = await responceRatingByUser.json()
                switch (dataResponceRatingByUser['rating_change']){
                    case 1:
                        setRatingDownDisabled(false)
                        setRatingUpDisabled(true)
                        break
                    case -1:
                        setRatingDownDisabled(true)
                        setRatingUpDisabled(false)
                        break
                    case 0:
                        setRatingDownDisabled(false)
                        setRatingUpDisabled(false)
                        break
                    default:
                        break
                } 
            }
            setIsLoading(false)
        }

        fetchRating()
       
    }, [access])

    const changeRating = async (change) => {
        const access = await validateAccess(history)
        const headers = {
            'Authorization': 'Bearer ' + access,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        const body = {
            rating_change: change
        }  
        const updatedRating = await axios.patch(`https://geniusroom-rest-backend.herokuapp.com/api/v1/articles/${articleId}/rating/`, body, {
                headers: headers
        })
        setRating(updatedRating.data['rating'])

        if (ratingDownDisabled) {
            setRatingDownDisabled(false)
            setRatingUpDisabled(true)
        }
        else if (ratingUpDisabled) {
            setRatingUpDisabled(false)
            setRatingDownDisabled(true)
        }
        else if (change === 1) {
            setRatingDownDisabled(false)
            setRatingUpDisabled(true)
        }
        else if (change === -1) {
            setRatingUpDisabled(false)
            setRatingDownDisabled(true)
        }
    }

    return (
        <div className={'rate'}>
        <div className={'rate-up'} disabled={!access || ratingUpDisabled} onClick={() => changeRating(1)}>
            <svg fill="#209F52" aria-hidden="true" className="m0 svg-icon iconArrowUpLg" width="36" height="36"
                 viewBox="0 0 36 36">
                <path d="M2 26h32L18 10 2 26z"></path>
            </svg>
        </div>
        <div className={'rating'}>{rating}</div>
        <div className={'rate-down'} disabled={!access || ratingDownDisabled} onClick={() => changeRating(-1)}>
            <svg fill="#CB1D1D" aria-hidden="true" className="m0 svg-icon iconArrowUpLg" width="36" height="36"
                 viewBox="0 0 36 36">
                <path d="M2 10h32L18 26 2 10z"></path>
            </svg>
        </div>
    </div>
    )
}
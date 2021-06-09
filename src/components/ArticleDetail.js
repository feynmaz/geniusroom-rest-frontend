import { React, useEffect, useState } from 'react'
import { useHistory } from "react-router"
import axios from "axios"
import { dateFormat } from 'dateformat'
import Moment from 'moment'

// const dateFormat =  new Intl.DateTimeFormat('ru', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit'
// })

export const ArticleDetail = ({id}) => {
    const [comments, setComments] = useState([])
    const [article, setArticle] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem('token')

    useEffect(async () => {
        const responseArticle = await fetch(`http://127.0.0.1:8000/api/v1/articles/${id}/`)
        const dataArticle = await responseArticle.json()
        setArticle(dataArticle) // после изменения состояния происходит рендеринг

        const responseComments = await fetch(`http://127.0.0.1:8000/api/v1/articles/${id}/comments`)
        const dataComments = await responseComments.json()
        setComments(dataComments) // после изменения состояния происходит рендеринг
        setIsLoading(item => !item)



    }, [])


    const changeRating = async (sign) => {
        const body = {
            rating: sign
        }
        const updated = await axios.post(`http://127.0.0.1:8000/api/v1/articles/${id}/`, body)
        setArticle(updated.data)
    }

    const addComment = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'token '+ token
        }
        const body = {
            content: 'GG'
        }
        const comment = await axios.post(`http://127.0.0.1:8000/api/v1/articles/${id}/comments/`, body,
            {
                headers: headers
            })
        let date = new Date(comment.data['created'])
        // TODO: привести дату к желаемому формату
        setComments([...comments, {...comment.data, [comment.data.created] : date}])
    }

    return (
     isLoading ?
            <h1>Загрузка</h1>
            :
            <div className={'article'}>
                <div className={'card'}>
                    <div className={'card-body'}><img src={article.image} alt={'No image'} /></div>
                </div>
                <h2>{article.title}</h2>
                <div className={'content'}>{article.content}</div>
                <div className={'characters'}>{article.characters}</div>
                <div className={'source'}>{article.source}</div>
                <div className={'created_at'}>{article.created_at}</div>

                <div className={'rate'}>
                    <div className={'rate-up'} disabled={!token} onClick={() => changeRating('+')}>
                        <svg fill="#209F52" aria-hidden="true" className="m0 svg-icon iconArrowUpLg" width="36" height="36"
                             viewBox="0 0 36 36">
                            <path d="M2 26h32L18 10 2 26z"></path>
                        </svg>
                    </div>
                    <div className={'rating'}>{article.rating}</div>
                    <div className={'rate-down'} disabled={!token} onClick={() => changeRating('-')}>
                        <svg fill="#CB1D1D" aria-hidden="true" className="m0 svg-icon iconArrowUpLg" width="36" height="36"
                             viewBox="0 0 36 36">
                            <path d="M2 10h32L18 26 2 10z"></path>
                        </svg>
                    </div>
                </div>

                <div className={'comments'}>
                {comments.map((comment, index) => (
                    <div className={'comment-card card col-lg-4 d-flex align-items-stretch'}>
                        <div className={'card-body'}>
                            <div className={'comment'} key={index}>
                                <div className={'comment-author'}>({comment.created}) {comment.author}:</div>
                                <div className={'comment-content'}>{comment.content}</div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>

                <div className={'new-comment'} hidden={!token}>
                    <textarea rows={10} cols={100}>
                    </textarea>
                </div>
                <div className={'add-comment'}>
                    <button disabled={!token} className={'btn btn-primary'} onClick={addComment}>Добавить комментарий</button>
                </div>


            </div>

    )
}

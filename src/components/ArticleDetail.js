import { React, useEffect, useState, useContext } from 'react'
import { useHistory } from "react-router"
import axios from "axios"
import { dateFormat } from 'dateformat'
import moment from 'moment'
import { AuthContext } from '../context/AuthContext'



export const ArticleDetail = ({id}) => {
    const history = useHistory()
    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState([])
    const [ais, setAis] = useState([])
    const [article, setArticle] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const { access, validateAccess, validateRefresh, logout } = useContext(AuthContext)
  
    function changeCommentText (event)  {
        setCommentText(event.target.value)
    }

    function refactorComments (comments) {
        let refactoredComments = []
        refactoredComments = comments.map(item => (
            {...item,
            created : moment(new Date(item['created'])).format('DD.MM.YYYY, hh:mm')}
        ))
      
        return refactoredComments
    }

    useEffect(async () => {
        const responseArticle = await fetch(`http://127.0.0.1:8000/api/v1/articles/${id}/`)
        const dataArticle = await responseArticle.json()
        setArticle(dataArticle) // после изменения состояния происходит рендеринг

        const responseComments = await fetch(`http://127.0.0.1:8000/api/v1/articles/${id}/comments/`)
        const dataComments = await responseComments.json()
        const refactoredComments = refactorComments(dataComments)
        
        setComments(refactoredComments) // после изменения состояния происходит рендеринг
        const responseAis = await fetch(`http://127.0.0.1:8000/api/v1/articles/${id}/ais/`)
        const dataAis = await responseAis.json()
        setAis(dataAis)

        setIsLoading(item => !item)

    }, [])


    const changeRating = async (newValue) => {
        const access = await validateAccess(history)
        const headers = {
            'Authorization': 'Bearer ' + access
        }
        const body = {
            rating: newValue
        }  
        const updated = await axios.patch(`http://127.0.0.1:8000/api/v1/articles/${id}/update/`, body, {
                headers: headers
            })
        setArticle(updated.data)    
    }

    const addComment = async () => {
        const access = validateAccess(history)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access
        }
        const body = {
            content: commentText,
            author: '',
            article: article.id,
        }
        const comment = await axios.post(`http://127.0.0.1:8000/api/v1/articles/${id}/comments/`,
            body,
            {
                headers: headers
            })
            
        const refactoredComment = refactorComments(Array(comment.data))    
     
        setComments([...comments, {
            ...refactoredComment[0]
        }])
    }

    const clickLogout = () => {
        logout(history)
    }


    
    return (
     isLoading ?
            <h1>Загрузка</h1>
            :
            <div className={'article'}>
                <div className="detail-login-buttons">
                    <button hidden={access} onClick={() => history.push('/login')}>
                        Login
                    </button>
                    <button hidden={!access} onClick={clickLogout}>
                        Logout
                    </button>
                </div>
                <div className={'card'}>
                    <div className={'card-body'}><img src={article.image_url} alt={'mainImage'} /></div>
                </div>
                <h2>{article.title}</h2>
                <div className={'content'}>{article.content}</div>
                <div className={'characters'}>{article.characters}</div>
                <div className={'source'}>{article.source}</div>
                <div className={'created_at'}>{article.created_at}</div>

                <div className={'rate'}>
                    <div className={'rate-up'} disabled={!access} onClick={() => changeRating(article.rating + 1)}>
                        <svg fill="#209F52" aria-hidden="true" className="m0 svg-icon iconArrowUpLg" width="36" height="36"
                             viewBox="0 0 36 36">
                            <path d="M2 26h32L18 10 2 26z"></path>
                        </svg>
                    </div>
                    <div className={'rating'}>{article.rating}</div>
                    <div className={'rate-down'} disabled={!access} onClick={() => changeRating(article.rating - 1)}>
                        <svg fill="#CB1D1D" aria-hidden="true" className="m0 svg-icon iconArrowUpLg" width="36" height="36"
                             viewBox="0 0 36 36">
                            <path d="M2 10h32L18 26 2 10z"></path>
                        </svg>
                    </div>
                </div>

                <div className="ais">
                    {ais.map((ai, index) => (

                        <div className={'comment-card card col-lg-4 d-flex align-items-stretch'}>
                            <div className={'card-body'}>
                                <div className="ai" key={index}>
                                    <div className='ai-image'><img src={ai.image} alt="additionalImage" /></div>
                                    <div className='ai-caption'><strong>{ai.caption}</strong></div>
                                </div>  
                            </div>
                        </div>
                            
                    ))}
                </div>

                <div className={'comments'}>
                    {comments.map((comment, index) => {
                        return <div key={index} className={'comment-card card col-lg-4 d-flex align-items-stretch'}>
                            <div className={'card-body'}>
                                <div className={'comment'} key={index}>
                                    <div className={'comment-author'}>({comment.created}) {comment.author}:</div>
                                    <div className={'comment-content'}>{comment.content}</div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

                <div className={'new-comment'} hidden={!access}>
                    <textarea onChange={function(event) {return changeCommentText(event)}} value={commentText} rows={10} cols={100}>
                    </textarea>
                </div>
                <div className={'add-comment'}>
                    <button disabled={!access} className={'btn btn-primary'} onClick={addComment}>Добавить комментарий</button>
                </div>
            </div>

    )
}

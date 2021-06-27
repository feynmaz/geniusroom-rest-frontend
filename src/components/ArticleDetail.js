import { React, useEffect, useState, useContext} from 'react'
import { useHistory } from "react-router"
import axios from "axios"
import moment from 'moment'
import { AuthContext } from '../context/AuthContext'
import { HeaderIcons } from './HeaderIcons'
import { Link } from "react-router-dom"
import { BACKEND_URL } from '../variables'


export const ArticleDetail = ({id}) => {
    const history = useHistory()

    const [ratingUpDisabled, setRatingUpDisabled] = useState(false)
    const [ratingDownDisabled, setRatingDownDisabled] = useState(false)

    const [article, setArticle] = useState()
    const [rating, setRating] = useState()
    const [ais, setAis] = useState([])
    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState([])
    

    const [isLoading, setIsLoading] = useState(true)
    const { access, validateAccess, logout } = useContext(AuthContext)

  
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

    useEffect(() => {
        if (!access) return

        async function fetchData() {
        const responseArticle = await fetch(`${BACKEND_URL}/api/v1/articles/${id}/`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        })
        const dataArticle = await responseArticle.json()
        
        setArticle(dataArticle) // после изменения состояния происходит рендеринг
        setRating(dataArticle['rating'])
        setAis(dataArticle['ais'])

        const refactored = refactorComments(dataArticle['comments']) 
        setComments(refactored)

        const headers = {
            'Authorization': 'Bearer ' + access,
            'Content-Type': 'application/json',
            'Accept': 'application/json',           
        }
        const responceRatingByUser = await fetch(`${BACKEND_URL}/api/v1/articles/${id}/rating_by_this_user/`, {
            headers: headers
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
      
        setIsLoading(false)
    }
    fetchData()
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
        const updatedRating = await axios.patch(`${BACKEND_URL}/api/v1/articles/${id}/rating/`, body, {
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
    }


    const addComment = async () => {
        const access = validateAccess(history)
        const headers = {
            'Authorization': 'Bearer ' + access,
            'Content-Type': 'application/json',
            'Accept': 'application/json',     
        }
        const body = {
            content: commentText
        }
        const comment = await axios.post(`${BACKEND_URL}/api/v1/articles/${id}/create_comment/`,
            body,
            {
                headers: headers
            })
            
        const refactoredComment = refactorComments(Array(comment.data))    
     
        setComments([...comments, {
            ...refactoredComment[0]
        }])
    }

    
    return (
     isLoading ?
            <h1>Загрузка</h1>
            :
            <div className={'article'}>
                <div className="header" style={{justifyContent: 'flex-end'}}>
                    <Link className="home-link" to={'/'} hidden={!access} title="Home">
                        <svg className="home-icon" height="511pt" viewBox="0 1 511 511.999" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m498.699219 222.695312c-.015625-.011718-.027344-.027343-.039063-.039062l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.808594-33.328126-13.808594-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.144532.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.441406 13.234375 31.273437 13.746093.484375.046876.96875.070313 1.457031.070313h8.320313v153.695313c0 30.417968 24.75 55.164062 55.167969 55.164062h81.710937c8.285157 0 15-6.71875 15-15v-120.5c0-13.878906 11.292969-25.167969 25.171875-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.28125 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.164062v-153.695313h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.8125 18.359375-18.367187 18.367187-48.253906.027344-66.632813zm-21.242188 45.421876c-3.238281 3.238281-7.542969 5.023437-12.117187 5.023437h-22.71875c-8.285156 0-15 6.714844-15 15v168.695313c0 13.875-11.289063 25.164062-25.167969 25.164062h-66.710937v-105.5c0-30.417969-24.746094-55.167969-55.167969-55.167969h-48.195313c-30.421875 0-55.171875 24.75-55.171875 55.167969v105.5h-66.710937c-13.875 0-25.167969-11.289062-25.167969-25.164062v-168.695313c0-8.285156-6.714844-15-15-15h-22.328125c-.234375-.015625-.464844-.027344-.703125-.03125-4.46875-.078125-8.660156-1.851563-11.800781-4.996094-6.679688-6.679687-6.679688-17.550781 0-24.234375.003906 0 .003906-.003906.007812-.007812l.011719-.011719 208.847656-208.839844c3.234375-3.238281 7.535157-5.019531 12.113281-5.019531 4.574219 0 8.875 1.78125 12.113282 5.019531l208.800781 208.796875c.03125.03125.066406.0625.097656.09375 6.644531 6.691406 6.632813 17.539063-.03125 24.207032zm0 0"/></svg>
                    </Link> 
                    <HeaderIcons />
                </div>
                
                <div className={'card'}>
                    <div className={'card-body'}><img src={article.image} alt={'mainImage'} /></div>
                </div>
                <h2>{article.title}</h2>
                <div className={'content'}>{article.content}</div>
                <div className={'characters'}>{article.characters}</div>
                <div className={'source'}>{article.source}</div>
                <div className={'created_at'}>{article.created_at}</div>

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

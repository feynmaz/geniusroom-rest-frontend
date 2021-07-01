import { React, useState, useContext } from 'react'
import moment from 'moment'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from "react-router"
import axios from "axios"

export const Comments = ({data, articleId}) => {
    const history = useHistory()
    const [comments, setComments] = useState(refactorComments(data))
    const [commentText, setCommentText] = useState('')

    const { access, validateAccess } = useContext(AuthContext)

    function changeCommentText (event)  {
        setCommentText(event.target.value)
    }

    function refactorComments (data) {
        let refactoredComments = []
        refactoredComments = data.map(item => (
            {...item,
            created : moment(new Date(item['created'])).format('DD.MM.YYYY, hh:mm')}
        ))
      
        return refactoredComments
    }

    const addComment = async () => {
        const access = await validateAccess(history)
  
        const headers = {
            'Authorization': 'Bearer ' + access,
            'Content-Type': 'application/json',
            'Accept': 'application/json',     
        }
        const body = {
            content: commentText
        }

        try {
            await axios.post(`https://geniusroom-rest-backend.herokuapp.com/api/v1/articles/${articleId}/create_comment/`,
            body,
            {
                headers: headers
            })
            setCommentText('')
            alert('Ваш комментарий будет рассмотрен администратором')
        } catch (e) {
            alert('Ошибка добавления комментария. Зайдите на страницу позже...')
        }
    }

    return (
        <>
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
                <textarea onChange={function (event) { return changeCommentText(event) }} value={commentText} rows={10} cols={100}>
                </textarea>
            </div>
            <div className={'add-comment'}>
                <button disabled={!access} className={'btn btn-primary'} onClick={addComment}>Добавить комментарий</button>
            </div>
        </>
    )
}
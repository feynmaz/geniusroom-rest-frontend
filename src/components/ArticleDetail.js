import { React, useEffect, useState } from 'react'
import { useHistory } from "react-router"

export const ArticleDetail = ({id}) => {
    const [comments, setComments] = useState([])
    const [article, setArticle] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        const responseArticle = await fetch(`http://127.0.0.1:8000/api/v1/articles/${id}/`)
        const dataArticle = await responseArticle.json()
        setArticle(dataArticle) // после изменения состояния происходит рендеринг

        const responseComments = await fetch(`http://127.0.0.1:8000/api/v1/articles/${id}/comments`)
        const dataComments = await responseComments.json()
        setComments(dataComments) // после изменения состояния происходит рендеринг
        setIsLoading(item => !item)
    }, [])

    return (
     isLoading ?
            <h1>Загрузка</h1>
            :
            <div className={'article'}>
                <h2>{article.title}</h2>
                <div className={'content'}>{article.content}</div>
                <div className={'characters'}>{article.characters}</div>
                <div className={'source'}>{article.source}</div>
                <div className={'created_at'}>{article.created_at}</div>
                <img src={article.image} alt={''} />
            <div className={'comments'}>
                {comments.map((comment, index) => (
                    <div className='comment' key={index}>
                        <div className={'author'}>{comment.author}</div>
                        <div className={'content'}>{comment.content}</div>
                    </div>
                ))}
            </div>
            </div>
    )
}

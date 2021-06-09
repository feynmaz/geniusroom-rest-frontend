import { React, useEffect, useState } from 'react'
import { useHistory } from "react-router";

export const ArticleList = () => {
    const history = useHistory()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        const response = await fetch('http://127.0.0.1:8000/api/v1/articles/')
        const data = await response.json()
        setArticles(data) // после изменения состояния происходит рендеринг
        setIsLoading(item => !item)
    }, [])

    return (
        <div>
            <div>ArticleList</div>
            <button onClick={() => history.push('/login')}>Login</button>
            { isLoading ? <h1>Загрузка</h1> :
                articles.map((article, index) => (
                    <div className="card article-card">
                        <div className="card-body">
                            <div className='article' key={index}>
                                <h3 onClick={() => history.push(`/${article.id}/`)}>{article.title}</h3>
                                <div className={'content'}>{article.content.slice(100)}</div>
                                <div className={'list-rating'}>{article.rating}</div>
                            </div>
                        </div>
                    </div>

                ))
            }
        </div>
    )
}
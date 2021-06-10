import { React, useEffect, useState } from 'react'
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { Pagination } from './Pagination'

export const ArticleList = () => {
    const history = useHistory()
    const location = useLocation()
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const line = location.search

    function getPageNumber() {
        let pageNumber = 1
        const template = /^\?.*(page=(?<pageNum>\d+)).*$/
        const page = line.match(template)
        if (page && page.groups.pageNum) {
            pageNumber = page.groups.pageNum
        }
        return pageNumber
    }

    useEffect(async () => {
        setIsLoading(true)
        const pageNumber = getPageNumber()
        const response = await fetch('http://127.0.0.1:8000/api/v1/articles/?page=' + pageNumber)
        const data = await response.json()
        setArticles(data.results) // после изменения состояния происходит рендеринг
        // TODO: вместо цифры переменную с количество статей на первой странице
        setTotalPages(Math.ceil(data.count / 5))
        setCurrentPage(pageNumber)
        setIsLoading(false)
    }, [line])

    return (
        <div>
            <div>ArticleList</div>
            <button onClick={() => history.push('/login')}>Login</button>

            { isLoading ? <h1>Загрузка</h1> :
                <>
                    {articles.map((article, index) => (
                        <div className="card article-card">
                            <div className="card-body">
                                <div className='article' key={index}>
                                    <h3 onClick={() => history.push(`/${article.id}/`)}>{article.title}</h3>
                                    <div className={'content'}>{article.content.slice(100)}</div>
                                    <div className={'list-rating'}>{article.rating}</div>
                                </div>
                            </div>
                        </div>

                    ))}

                    <Pagination totalPages={totalPages} currentPage={currentPage} />
                </>
            }
        </div>
    )
}
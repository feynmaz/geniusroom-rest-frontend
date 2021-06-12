import { React, useEffect, useState, useRef } from 'react'
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { Pagination } from './Pagination'
import { Article } from './Article'
import { Menu } from './Menu'

export const ArticleList = ({ params }) => {
    const history = useHistory()
    const location = useLocation()
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const listArticles = useRef()

    const pathname = location.pathname
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

    function changeStyleBlockArticles() {
        if (listArticles.current.classList.contains('squeeze')) {
            setTimeout(() => {
                listArticles.current.classList.remove('squeeze')
            }, 300)
        } else {
            listArticles.current.classList.add('squeeze')
        }
    }

    useEffect(async () => {
        setIsLoading(true)
        const pageNumber = getPageNumber()
        let response
        params
            ? response = await fetch(`http://127.0.0.1:8000/api/v1/articles/${params.superRubric}/${params.rubric}/?page=` + pageNumber)
            : response = await fetch('http://127.0.0.1:8000/api/v1/articles/?page=' + pageNumber)
        const data = await response.json()
        setArticles(data.results) // после изменения состояния происходит рендеринг
        // TODO: вместо цифры переменную с количество статей на первой странице
        setTotalPages(Math.ceil(data.count / 5))
        setCurrentPage(pageNumber)
        setIsLoading(false)
    }, [pathname, line])


    return (
        <div className="container-articles">
            <div className="header">
                <Menu changeStyleBlockArticles={changeStyleBlockArticles} />
                <button onClick={() => history.push('/login')}>Login</button>
            </div>
            <div className="list-articles-wrapper">
                <div ref={listArticles} className="list-articles">

                    {isLoading ? <h1>Загрузка</h1> :
                        <>
                            {articles.map((article, index) => (
                                <Article data={article} key={index} />
                            ))}
                            <Pagination totalPages={totalPages} currentPage={currentPage} />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
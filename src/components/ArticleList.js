import { React, useEffect, useState, useRef } from 'react'
import { useLocation } from "react-router-dom"
import { Pagination } from './Pagination'
import { Article } from './Article'
import { Menu } from './Menu'
import { HeaderIcons } from './HeaderIcons'


export const ArticleList = ({ params }) => {
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


    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            const pageNumber = getPageNumber()
            let response
            params
                ? response = await fetch(`https://geniusroom-rest-backend.herokuapp.com/api/v1/articles/${params.superRubric}/${params.rubric}/?page=` + pageNumber, {
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                       }
                })
                : response = await fetch(`https://geniusroom-rest-backend.herokuapp.com/api/v1/articles/?page=` + pageNumber, {
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                       }
                })
            const data = await response.json()
            setArticles(data.results) // ?????????? ?????????????????? ?????????????????? ???????????????????? ??????????????????
            // TODO: ???????????? ?????????? ???????????????????? ?? ???????????????????? ???????????? ???? ???????????? ????????????????
            setTotalPages(Math.ceil(data.count / 10))
            setCurrentPage(pageNumber)
            setIsLoading(false)
        }
        fetchData();
      }, [pathname, line]);

    return (
        <div className="container-articles">
            <div className="header">
                <Menu changeStyleBlockArticles={changeStyleBlockArticles} />
                <HeaderIcons />
            </div>
            <div className="list-articles-wrapper">
                <div ref={listArticles} className="list-articles">

                    {isLoading ? <h1>????????????????</h1> :
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
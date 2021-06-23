import { useHistory } from "react-router";
import { React, useEffect, useState, useRef, useContext } from 'react'
import { useLocation } from "react-router-dom"
import { Pagination } from './Pagination'
import { Article } from './Article'
import { AuthContext } from '../context/AuthContext'

export const Profile = () => {
    const history = useHistory()
    const location = useLocation()

    const { access, validateAccess } = useContext(AuthContext)

    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    
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

    useEffect(() => {
        if (!access) return

        async function fetchData() {
            
            setIsLoading(true)
            const pageNumber = getPageNumber()
            const access = await validateAccess(history)
            const headers = {
                'Authorization': 'Bearer ' + access
            }
            let response = await fetch('http://127.0.0.1:8000/api/v1/articles/liked/?page=' + pageNumber, {
                headers: headers
            })
            const data = await response.json()
            setArticles(data.results) 
            // TODO: вместо цифры переменную с количество статей на первой странице
            setTotalPages(Math.ceil(data.count / 10))
            setCurrentPage(pageNumber)
            setIsLoading(false)
        }
        fetchData();
    }, [line, access])

    return (
        isLoading ? <h1>Загрузка...</h1>     
        : articles ?
        <div>
            <div>
                Profile
            </div>
            <div className="header">
                <button onClick={() => history.push('/login')}>
                    {access ? 'Logout' : 'Login'}
                </button>
            </div>
            <div className="list-articles-wrapper">
                <div className="list-articles">
                <div>
                    {articles.map((article, index) => (
                        <Article data={article} key={index} />
                    ))}
                    <Pagination totalPages={totalPages} currentPage={currentPage} />
                </div>
                </div>
            </div>
            <div>
                <h3 className={'title'} onClick={() => history.push(`/`)}>Главная</h3>
            </div>
        </div>    
        : <div>статьи не загрузились</div>           
    )
}
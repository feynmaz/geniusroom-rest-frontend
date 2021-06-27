import { useHistory } from "react-router";
import { React, useEffect, useState, useContext } from 'react'
import { useLocation } from "react-router-dom"
import { Pagination } from './Pagination'
import { Article } from './Article'
import { AuthContext } from '../context/AuthContext'
import { HeaderIcons } from './HeaderIcons'


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
                'Authorization': 'Bearer ' + access,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            let response = await fetch(`${https://geniusroom-rest-backend.herokuapp.com}/api/v1/articles/liked/?page=` + pageNumber, {
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
            <div className="header">
            <div>
                Profile
            </div>
                <HeaderIcons />
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
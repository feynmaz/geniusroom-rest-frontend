import { React, useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router"


export const Menu = ({ changeStyleBlockArticles }) => {
    const [rubrics, setRubrics] = useState([])
    const history = useHistory()
    const menuList = useRef()
    const menuArrow = useRef()

    const changeStyleMenu = () => {
        menuList.current.classList.toggle('active')
        menuArrow.current.classList.toggle('active-arrow')
        changeStyleBlockArticles()
    }

    const openMenuList = () => changeStyleMenu()

    const selectRubric = async event => {
        changeStyleMenu()
        history.push('/' + event.target.dataset.link)
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${https://geniusroom-rest-backend.herokuapp.com}/api/v1/articles/rubrics/`, {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
            })
            const data = await response.json()
            setRubrics(data)
        }
        fetchData()
      }, [])

    let superRubric = ''

    return (
        <div className="menu">
            <div className="menu-title-wrapper" onClick={openMenuList}>
                <div ref={menuArrow} className="menu-title-arrow"></div>
                <div className="menu-title">Menu</div>
            </div>
            <div ref={menuList} className="menu-items">
                {
                    rubrics.map((rubric, index) => {
                        let element = (<></>)
                        if (rubric.super_name != superRubric) {
                            superRubric = rubric.super_name
                            element = (<div className="super-rubric" key={index}>{superRubric}</div>)
                        }

                        const link = (<a
                            data-link={rubric.rubric_url}
                            onClick={(event) => selectRubric(event)}
                            className="list-item"
                            key={rubric.name}>
                            {rubric.name}
                        </a>)


                        return (<>
                            {element}
                            {link}
                        </>
                        )
                    })
                }
            </div>
        </div>
    )
}
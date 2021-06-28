import { React, useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router"


export const Menu = ({ changeStyleBlockArticles }) => {
    const [rubrics, setRubrics] = useState([])
    const history = useHistory()
    const menuList = useRef()
    const menuOverlay = useRef()

    const changeStyleMenu = () => {
        menuList.current.classList.add('active')
        menuOverlay.current.classList.add('menu-overlay-active')
        changeStyleBlockArticles()
    }

    const openMenuList = () => changeStyleMenu()

    const selectRubric = async event => {
        history.push('/' + event.target.dataset.link)
    }
    
    const closeMenu = () => {
        changeStyleMenu()
        menuList.current.classList.remove('active')
        menuOverlay.current.classList.remove('menu-overlay-active')
    }

    useEffect(() => {

        async function fetchData() {
            const response = await fetch(`https://geniusroom-rest-backend.herokuapp.com/api/v1/articles/rubrics/`, {
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
        <>
        <div className="menu">
            <div className="menu-title-wrapper" onClick={openMenuList} title="Menu">
                <svg className="menu-icon" height="384pt" viewBox="0 -53 384 384" width="384pt" xmlns="http://www.w3.org/2000/svg"><path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/></svg>
            </div>
            <div ref={menuList} className="menu-items-wrapper" onClick={e => e.stopPropagation()}>
            <div className="menu-items">
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
        </div>
        <div ref={menuOverlay} onClick={closeMenu} className="menu-overlay"></div>
        </>
    )
}
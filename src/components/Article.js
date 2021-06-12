import { React } from 'react'
import { useHistory } from "react-router";

export const Article = ({data}) => {

    const history = useHistory()

    return (
        <div className="card article-card">
            <div className="card-body">
                <div className='article'>
                    <h3 onClick={() => history.push(`/${data.id}/`)}>{data.title}</h3>
                    <div className={'content'}>{data.content.slice(100)}</div>
                    <div className={'list-rating'}>{data.rating}</div>
                </div>
            </div>
        </div>
    )

}
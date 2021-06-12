import { React } from 'react'
import { useHistory } from "react-router";

export const Article = ({data}) => {

    const history = useHistory()

    return (
        <div className="card article-card">
            <div className="card-body">
                <div className='article'>
                    <h3 className={'title'} onClick={() => history.push(`/${data.id}/`)}>{data.title}</h3>
                    <div className={'content-thumbnail'}>
                        <div className={'thumbnail'}> <img src={data.image} alt="thumbnail" width='90'/> </div>
                        <div className={'content'}>{data.content.slice(0, 100)}...</div>
                    </div>
                    <div className={'list-rating'}>Рейтинг: {data.rating}</div>
                </div>
            </div>
        </div>
    )

}
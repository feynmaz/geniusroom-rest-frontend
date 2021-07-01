import { React } from 'react'

export const AdditionalImages = ({ data }) => {

    return (
        <div className="ais">
            {data.map((ai, index) => (

                <div className={'comment-card card col-lg-4 d-flex align-items-stretch'}>
                    <div className={'card-body'}>
                        <div className="ai" key={index}>
                            <div className='ai-image'><img src={ai.image} alt="additionalImage" /></div>
                            <div className='ai-caption'><strong>{ai.caption}</strong></div>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}
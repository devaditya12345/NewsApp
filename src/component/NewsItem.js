import React  from 'react'

const NewsItem = (props) =>{
    
        let { title, description, imgURL, newsURL, author, date, source} = props;
        return (
            <div>
                <div className="card my-4">
                    {/*ye inline styling ko javascript object bnakrke use kiya gya hai */}

                    <div style={{display:'flex',
                    justifyContent:'flex-end',
                    position:'absolute',
                    right:0
                    }}>
                    {/* <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1',fontSize:'small'}}> */}
                    <span className="badge bg-danger">
                        {source}
                    </span>
                    </div>
                    <img src={imgURL} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                        {/* new Date(date).toGMTString()-->pehle hmne date prop se ek stringified date li,phir usko date object me convert kr diya,then uska GMT time fetch kr liya */}
                        <a href={newsURL} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem

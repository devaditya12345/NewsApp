import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem(Class_Based)';
import Spinners from './Spinners(Class_Based)';
// using impt
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [totalResults, setTotalResults] = useState([])
    

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const fetchMoreData = async () => {
       
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKEY}&page=${page+1}&pageSize=${props.pageSize}`;

        setPage(page + 1)
        let data = await fetch(url);// fetch api ek url leta hai aur ek promise return karta hai,isiliye await(asynchronous function me promise milne me deri ho sakti hai so wait ke liye await lgaya jata h) lgaya jata hai
        let parsedData = await data.json();
        console.log(parsedData);

        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);

    };

    const updateNews = async () => {

        props.setProgress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKEY}&page=${page}&pageSize=${props.pageSize}`;
        // setState({ loading: true })
        let data = await fetch(url);// fetch api ek url leta hai aur ek promise return karta hai,isiliye await(asynchronous function me promise milne me deri ho sakti hai so wait ke liye await lgaya jata h) lgaya jata hai

        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(50);
        console.log(parsedData);

        setPage(page);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);

        props.setProgress(100);
    }

    //Work as componentDidMount()-->runs only single time
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)}-NewsOcean`; // ye ache se kaam nhi kr rha h MATLAB -NewsOcean likh kr nhi aa rha hai
        updateNews();  
    }, [])


    // handlePrevClick = async () => {
    //   // console.log("Previous");
    //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKEY}&page=${page - 1}&pageSize=${props.pageSize}`;
    //   // setState({ loading: true })
    //   // let data = await fetch(url);// fetch api ek url leta hai aur ek promise return karta hai,isiliye await(asynchronous function me promise milne me deri ho sakti hai so wait ke liye await lgaya jata h) lgaya jata hai
    //   // let parsedData = await data.json();
    //   // console.log(parsedData);
    //   // setState({
    //   //   page: page - 1,
    //   //   articles: parsedData.articles,
    //   //   loading: false
    //   // });

    //   setState({
    //     page: page - 1,
    //   });

    //   updateNews();
    // }

    // handleNextClick = async () => {
    //   // console.log("Next");

    //   // // if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
    //   // //   isko disabled me likh diye hai zyada sense bna rha tha
    //   // // }

    //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKEY}&page=${page + 1}&pageSize=${props.pageSize}`;
    //   // setState({ loading: true })
    //   // let data = await fetch(url);// fetch api ek url leta hai aur ek promise return karta hai,isiliye await(asynchronous function me promise milne me deri ho sakti hai so wait ke liye await lgaya jata h) lgaya jata hai
    //   // let parsedData = await data.json();
    //   // console.log(parsedData);
    //   // setState({
    //   //   page: page + 1,
    //   //   articles: parsedData.articles,
    //   //   loading: false
    //   // });

    //   setState({
    //     page: page + 1,
    //   });

    //   updateNews();
    // }





    return (

        <>

            <h2 className='my-3 text-center' style={{ margin: "35px 0px ", marginTop:"100px" }}>NewsOcean-Top {capitalizeFirstLetter(props.category)} Headlines </h2>


            {loading && <Spinners />}
            {console.log("Spinners")}
            {/* Matlab loading agar true hai tabhi spinner kaam kare 
         ye line spinner ke liye thi */}


            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinners />}
            >
                {console.log("InfiniteScroll")}
                <div className="container">
                    <div className='row' >
                        {/* Agar loading false hai tabhi ye kaam kare */}
                        {/* {!loading && articles.map((element) => {  ye line initial spinner ke liye thi */}

                        {articles.map((element) => {
                            return <div className='col-md-3' key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : " "} imgURL={element.urlToImage ? element.urlToImage : "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ig8nlMxnXIk0/v0/1200x800.jpg"} newsURL={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />

                                {/* teritiary conditions null conditions ko handle karne ke liye lgayi gyi hai */}
                            </div>

                        })}

                    </div>
                </div>

            </InfiniteScroll>

            {/* <div>
          <div className="container d-flex justify-content-between">
            <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
            <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
          </div>
        </div> */}

        </>
    )
}



News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'science'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News

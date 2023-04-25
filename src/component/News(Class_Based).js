import React, { Component } from 'react';
import NewsItem from './NewsItem(Class_Based)';
import Spinners from './Spinners(Class_Based)';
// using impt
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'science'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }


  //class based app hai isilye hme yha par state set krne ke liye constructor ka use krna pad rha hai jaise ki function based me useState ka use kiye the

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("Hello! I am a constructor from News Component !!")
    this.state = {
      // articles: this.articles, ye pehle commented articles ke liye tha
      articles: [],// iske empty hone ki wajah se refresh krne par thodi der ke liye blank space aayegi(with loading: false)
      loading: true,
      page: 1,
      totalResults: 0
    }

    // document.title=this.props.category ye bhi theek hai
    document.title = `${this.capitalizeFirstLetter(this.props.category)}`
  }

  fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.setState({
      page: this.state.page+1,
    });
    let data = await fetch(url);// fetch api ek url leta hai aur ek promise return karta hai,isiliye await(asynchronous function me promise milne me deri ho sakti hai so wait ke liye await lgaya jata h) lgaya jata hai
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults
    });

  };

  async updateNews() {

    this.props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true })
    let data = await fetch(url);// fetch api ek url leta hai aur ek promise return karta hai,isiliye await(asynchronous function me promise milne me deri ho sakti hai so wait ke liye await lgaya jata h) lgaya jata hai

    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    console.log(parsedData);
    
    this.setState({
      page: this.state.page, //krne na krne se abhi koi fayda hai nhi kyonki update krne ke baad bhi page:1 hi rahega
      articles: parsedData.articles,
      loading: false,
      totalResults:parsedData.totalResults
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    console.log("componentDidMount");
    this.updateNews();
  }

  // handlePrevClick = async () => {
  //   // console.log("Previous");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKEY}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true })
  //   // let data = await fetch(url);// fetch api ek url leta hai aur ek promise return karta hai,isiliye await(asynchronous function me promise milne me deri ho sakti hai so wait ke liye await lgaya jata h) lgaya jata hai
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false
  //   // });

  //   this.setState({
  //     page: this.state.page - 1,
  //   });

  //   this.updateNews();
  // }

  // handleNextClick = async () => {
  //   // console.log("Next");

  //   // // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
  //   // //   isko disabled me likh diye hai zyada sense bna rha tha
  //   // // }

  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKEY}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true })
  //   // let data = await fetch(url);// fetch api ek url leta hai aur ek promise return karta hai,isiliye await(asynchronous function me promise milne me deri ho sakti hai so wait ke liye await lgaya jata h) lgaya jata hai
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   page: this.state.page + 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false
  //   // });

  //   this.setState({
  //     page: this.state.page + 1,
  //   });

  //   this.updateNews();
  // }

  


  render() {
    console.log("MAIN componentDidMount SE PEHLE RUN KAROONGA")
    return (

      <>

        <h2 className='my-3 text-center' style={{ margin: "35px 0px " }}>NewsOcean-Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>

      
          {this.state.loading && <Spinners />}
          {console.log("Spinners")}
          {/* Matlab this.state.loading agar true hai tabhi spinner kaam kare 
         ye line spinner ke liye thi */}
         

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinners />}
        > 
        {console.log("InfiniteScroll")}
          <div className="container">
            <div className='row' >
              {/* Agar loading false hai tabhi ye kaam kare */}
              {/* {!this.state.loading && this.state.articles.map((element) => {  ye line initial spinner ke liye thi */}

              {this.state.articles.map((element) => {
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
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div> */}

      </>
    )
  }
}

export default News

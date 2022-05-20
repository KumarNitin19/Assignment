import React, { useEffect, useState } from 'react'
import './Feed.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Feed = () => {


    const [feedCardData, setfeedCardData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true);

    const feedData = async () => {
        setLoading(true)
        try {
            const data = await axios.get('http://localhost:7000/api/image');
            setfeedCardData(data.data.response);
            setFilteredData(data.data.response);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        feedData();
    }, [])

    setInterval(() => {
        setLoading(false);
    }, 2000);

    const getFilterValue = (e) => {
         e.preventDefault();
         setLoading(true);
         let data =[];
         let value = e.target.innerText;
         filteredData.filter((item)=>{
             if(value == item.type){
                 data.push(item)
             }
             if(value === 'All'){
                data.push(item)
             }
         });
         setLoading(false);
        setfeedCardData(data)
    }



    const feedItems = (item) => {
        // console.log(item);
        // console.log(filter);
            return (
                <>
                    <div className="feedCard col-lg-4 col-md-6 col-sm-12">
                        <div className="cardImage">
                            <img src={"./images/" + item.image} alt="image" />
                        </div>
                        <div className="cardBody">
                            <p className="bodyData">{item.username}</p>
                            <a href={item.link} target="_blank">
                                <button>
                                    <p className="m-0">{item.buttonText}</p>
                                    <span>{item.buttonSubText}</span>
                                </button>
                            </a>
                        </div>
                    </div>
                </>
            ) 
    }

 

    return (
    <>
    {  loading == true ? (
        <Loader></Loader>
    ) : ( 
        <>
        <Header></Header>
        <div className="feed py-md-4 py-2">
            <div className="container">
                <div className="headerBottom mt-4 d-none d-xl-flex">
                    <button className="d-flex align-items-center" onClick={getFilterValue}><img src="./assets/fire.png" alt="" />Trending</button>
                    <button className="d-flex align-items-center" onClick={getFilterValue}>Latest</button>
                    <button className="d-flex align-items-center">Most popular</button>
                    <a href="/upload"><button className="d-flex align-items-center"><img src="./assets/diamond.png" alt="" />Upload</button></a>
                    <button className="d-flex align-items-center"><img src="./assets/temple.png" alt="" />In Temple</button>
                    <button className="d-flex align-items-center" onClick={getFilterValue}>NFT</button>
                    <button className="d-flex align-items-center" onClick={getFilterValue}>All</button>
                </div>

                <div className="row mainBody">

                    { feedCardData.length != 0 ? (
                        feedCardData.map(feedItems)
                    )
                        : (
                            <p className="notFound">No Data Found</p>
                        )
                    }

                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}
     </>   
    )
}

export default Feed

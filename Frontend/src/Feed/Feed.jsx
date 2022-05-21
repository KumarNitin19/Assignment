import React, { useEffect, useState } from 'react'
import './Feed.css'
import axios from 'axios'
import Loader from '../Loader/Loader'

const Feed = () => {


    const [feedCardData, setfeedCardData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false);

    const feedData = async () => {
        setLoading(true)
        try {
            const data = await axios.get('/api/image/get');
            setfeedCardData(data.data.response);
            setFilteredData(data.data.response);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        feedData();
    }, [])



    const getFilterValue = (e) => {
        e.preventDefault();
        setLoading(true);
        let data = [];
        let value = e.target.innerText;
        if (filteredData != undefined ) {
            filteredData.filter((item) => {
                if (value == item.type) {
                    data.push(item)
                }
                if (value === 'All') {
                    data.push(item)
                }
            });
        }
        setLoading(false);
        setfeedCardData(data)
    }



    const feedItems = (item) => {
        return (
            <>
                <div className="feedCard col-lg-4 col-md-6 col-sm-12">
                    <div className="cardImage">
                        <img src={"./assets/" + item.image} alt="image" />
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
                </>
            )
            }
        </>
    )
}

export default Feed

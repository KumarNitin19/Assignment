import React, { useEffect, useState } from 'react'
import './Feed.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Dropdown } from 'react-bootstrap'

const Feed = (filterValue) => {


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
        if(filterValue.value != '' && filterValue.value != undefined){
            getFilterValue(filterValue.value);
        }
    }, [])


    const getFilterValue = (filter) => {
        console.log(filter);
        setLoading(true);
        let data = [];
        if (filteredData != undefined) {
            filteredData.filter((item) => {
                if (filter == item.type) {
                    data.push(item)
                }
                if (filter === 'All') {
                    data.push(item)
                }
            });
        }
        setLoading(false);
        setfeedCardData(data)
    }

    const deleteImage = async(value) => {
           setLoading(true)
            try {
                let url = '/api/image/deleteImage';
                let inputData = {
                    "_id" : value
                }
                await axios.post(url,inputData);
                feedData();
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
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
                        <div className="bottomContent">
                            <a href={item.link} target="_blank">
                                <button className="imageButton">
                                    <p className="m-0">{item.buttonText}</p>
                                    <span>{item.buttonSubText}</span>
                                </button>
                            </a>
                            <div className="dropdown">
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" className="btn btn-dark">
                                        <i class="fa fa-ellipsis-v"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/upload"><i class="fa fa-wrench" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Update</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>deleteImage(item._id)}><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
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
                                <button className="d-flex align-items-center" onClick={(e)=>getFilterValue(e.target.innerText)}><img src="./assets/fire.png" alt="" />Trending</button>
                                <button className="d-flex align-items-center" onClick={(e)=>getFilterValue(e.target.innerText)}>Latest</button>
                                <button className="d-flex align-items-center">Most popular</button>
                                <a href="/upload"><button className="d-flex align-items-center"><img src="./assets/diamond.png" alt="" />Upload</button></a>
                                <button className="d-flex align-items-center"><img src="./assets/temple.png" alt="" />In Temple</button>
                                <button className="d-flex align-items-center" onClick={(e)=>getFilterValue(e.target.innerText)}>NFT</button>
                                <button className="d-flex align-items-center" onClick={(e)=>getFilterValue(e.target.innerText)}>All</button>
                            </div>

                            <div className="row mainBody">

                                {feedCardData.length != 0 ? (
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

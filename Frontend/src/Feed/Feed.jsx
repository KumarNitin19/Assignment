import React, { useEffect, useState } from 'react'
import './Feed.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Dropdown } from 'react-bootstrap'
import Form from '../Form/Form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const Feed = ({ prop }) => {


    const [feedCardData, setfeedCardData] = useState([])
    const [filter, setFilter] = useState('All')
    const [loading, setLoading] = useState(false);



    const feedData = async () => {
        setLoading(true);
        try {
            const data = await axios.get('/api/image/get');
            setfeedCardData(data.data.response);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        feedData();
    }, [])

  


    const deleteImage = async (value) => {
        setLoading(true)
        try {
            let url = '/api/image/deleteImage';
            let inputData = {
                "_id": value
            }
            await axios.post(url, inputData);
            feedData();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const navigate = useNavigate();

    const goToUpload = (item) => {
        navigate('/upload', {
            state: {
                "id": item._id,
                "username": item.username,
                "buttonSubText": item.buttonSubText,
                "buttonText": item.buttonText,
                "image": item.image,
                "link": item.link,
                "type": item.type
            }
        })
    }

    useEffect(() => {
        if(prop != undefined && prop !== ''){
            setFilter(prop)
        }
    }, [prop])


    const feedItem = (data) => {
        let i = 0;
        let printData;
         printData = data.map((item) => {
            if (item.type === filter || filter === 'All') {
                i++;
                return (
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
                                <div className="dropdownButton">
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" className="btn btn-dark">
                                            <i class="fa fa-ellipsis-v"></i>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => goToUpload(item)}><i class="fa fa-wrench" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Update</Dropdown.Item>
                                            <Dropdown.Item onClick={() => deleteImage(item._id)}><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        });
        if (i !== 0) {
            return printData;
        } else {
            return (
                <p className="notFound mt-6">No Data Found</p>
            )
        }
    }


    return (
        <>
            {  loading == true ? (
                <Loader></Loader>
            ) : (
                <>
                    <div className="feed py-md-4 py-2">
                        <div className="container">
                            <div className="row mainBody">
                                <div className={window.location.pathname !== '/upload' ? "headerBottom mt-4 d-none d-xl-flex mb-4" : "d-none"}>
                                    <button className="d-flex align-items-center" onClick={(e) => setFilter(e.target.innerText)}><img src="./assets/fire.png" alt="" />Trending</button>
                                    <button className="d-flex align-items-center" onClick={(e) => setFilter(e.target.innerText)}>Latest</button>
                                    <button className="d-flex align-items-center">Most popular</button>
                                    <Link to="/upload"><button className="d-flex align-items-center"><img src="./assets/diamond.png" alt="" />Upload</button></Link>
                                    <button className="d-flex align-items-center"><img src="./assets/temple.png" alt="" />In Temple</button>
                                    <button className="d-flex align-items-center" onClick={(e) => setFilter(e.target.innerText)}>NFT</button>
                                    <button className="d-flex align-items-center" onClick={(e) => setFilter(e.target.innerText)}>All</button>
                                </div>
                                {feedItem(feedCardData)}
                            </div>
                        </div>
                    </div>
                </>
            )
            }

            <div className="d-none">
                <Form></Form>
            </div>
        </>
    )
}

export default Feed

import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import './Feed.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Dropdown } from 'react-bootstrap'
import Form from '../Form/Form'
import { useNavigate } from 'react-router'

const Feed = forwardRef(({ }, ref) => {


    const [feedCardData, setfeedCardData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [sendData, setsendData] = useState([])
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



    useImperativeHandle(ref, () => ({
        getFilterValue(filter) {
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
    }))

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
                "id":item._id,
                "username": item.username,
                "buttonSubText": item.buttonSubText,
                "buttonText": item.buttonText,
                "image": item.image,
                "link": item.link,
                "type": item.type
            }
        })
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

            <div className="d-none">
                <Form value={sendData}></Form>
            </div>
        </>
    )
})

export default Feed

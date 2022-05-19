import React, { useEffect, useState } from 'react'
import './Feed.css'
import axios from 'axios'

const Feed = () => {


    const [feedCardData, setfeedCardData] = useState([])

    const feedData = async() => {
          try {
              const data = await axios.get('http://localhost:7000/api/image');
            //   console.log(data.data.response);
            setfeedCardData(data.data.response);
          } catch (error) {
             console.log(error);   
          }
    }

    useEffect(() => {
       feedData();
    }, [])


    return (
        <div className="feed py-md-4 py-2">
            <div className="container">
                <div className="headerBottom mt-4 d-none d-xl-flex">
                    <a href=""><button className="d-flex align-items-center"><img src="./assets/fire.png" alt="" /> 24h Trending</button></a> 
                    <a href=""><button className="d-flex align-items-center">Latest shows</button></a>
                    <a href=""><button className="d-flex align-items-center">Most popular</button></a>
                    <a href="/upload"><button className="d-flex align-items-center"><img src="./assets/diamond.png" alt="" />Upload</button></a>
                    <a href=""><button className="d-flex align-items-center"><img src="./assets/temple.png" alt="" />In Temple</button></a>
                    <a href=""><button className="d-flex align-items-center">In Void</button></a>
                    <a href=""><button className="d-flex align-items-center">#BAYC</button></a>
                </div>

                <div className="row mainBody">

                    { feedCardData == [] ? (
                        feedCardData.map((item)=>{
                            <div className="feedCard col-lg-4 col-md-6 col-sm-12">
                            <div className="cardImage">
                                <img src={"./assets"+item.file} alt="image" />
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
                        })
                    )
                    : (
                        <p className="notFound">No Data Found</p>
                    )
                }
                    
                    {/* <div className="feedCard col-lg-4 col-md-6 col-sm-12">
                        <div className="cardImage">
                            <img src="./assets/Image-One.jpg" alt="One" />
                        </div>
                        <div className="cardBody">
                            <p className="bodyData">Meta Trap house</p>
                            <a href="https://www.google.com" target="_blank">
                                <button>
                                    <p className="m-0">@freezecoorie...</p>
                                    <span>0x890aac</span>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="feedCard col-lg-4 col-md-6 col-sm-12">
                        <div className="cardImage">
                            <img src="./assets/Image-Two.jpg" alt="Two" />
                        </div>
                        <div className="cardBody">
                            <p className="bodyData">The Vincent Van Dough Gallery</p>
                            <a href="https://www.google.com" target="_blank">
                                <button>
                                    <p className="m-0">@0x0f0eae</p>
                                    <span>0x0f0eae...</span>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="feedCard col-lg-4 col-md-6 col-sm-12">
                        <div className="cardImage">
                            <img src="./assets/Image-Three.jpg" alt="Three" />
                        </div>
                        <div className="cardBody">
                            <p className="bodyData">Teufzer</p>
                             <a href="https://www.google.com" target="_blank">
                                <button>
                                    <p className="m-0">@teufeurs</p>
                                    <span>0xd9ec76...</span>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="feedCard col-lg-4 col-md-6 col-sm-12">
                        <div className="cardImage">
                            <img src="./assets/Image-Four.jpg" alt="Four" />
                        </div>
                        <div className="cardBody">
                            <p className="bodyData">6529 AB + 1</p>
                             <a href="https://www.google.com" target="_blank">
                                <button>
                                    <p className="m-0">@6529</p>
                                    <span>0xfd2200...</span>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="feedCard col-lg-4 col-md-6 col-sm-12">
                        <div className="cardImage">
                            <img src="./assets/Image-Five.jpg" alt="Five" />
                        </div>
                        <div className="cardBody">
                            <p className="bodyData">#9049</p>
                             <a href="https://www.google.com" target="_blank">
                                <button>
                                    <p className="m-0">@rskagy</p>
                                    <span>0x83fcf5...</span>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="feedCard col-lg-4 col-md-6 col-sm-12">
                        <div className="cardImage">
                            <img src="./assets/Image-Six.jpg" alt="Six" />
                        </div>
                        <div className="cardBody">
                            <p className="bodyData">6529 Photo A</p>
                             <a href="https://www.google.com" target="_blank">
                                <button>
                                    <p className="m-0">@6529</p>
                                    <span>0xfd2200...</span>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="feedCard col-lg-4 col-md-6 col-sm-12">
                        <div className="cardImage">
                            <img src="./assets/file_1652988270494.png" alt="Six" />
                        </div>
                        <div className="cardBody">
                            <p className="bodyData">6529 Photo A</p>
                             <a href="https://www.google.com" target="_blank">
                                <button>
                                    <p className="m-0">@6529</p>
                                    <span>0xfd2200...</span>
                                </button>
                            </a>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Feed

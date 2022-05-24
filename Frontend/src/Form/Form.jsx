import React, { useEffect, useState } from 'react'
import './Form.css';
import axios from 'axios'
import Loader from '../Loader/Loader';
import { useLocation } from 'react-router';

const Form = (data) => {


    const [userName, setuserName] = useState('');
    const [file, setFile] = useState({});
    const [text, setText] = useState('');
    const [subtext, setSubtext] = useState('');
    const [link, setLink] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState(false);
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(false);


    const location = useLocation();


    const uploadImageData = async (e,value) => {
        e.preventDefault();
        setError(true);
        setLoading(true);
        setDisplay(true)
        if (userName != '' && file != '' && text != '' && subtext != '' && link != '' && type != '' && type != '---Select---' ) {
            setError(false);
            try {
                let url;
                let inputData = new FormData();
                if(value != ''){
                   inputData.append("_id", value);
                   url = '/api/image/updateImage'
                }else{
                     url = '/api/image/addImage';
                }
                inputData.append("username", userName);
                inputData.append("buttonText", text);
                inputData.append("buttonSubText", subtext);
                inputData.append("link", link);
                inputData.append("type", type);
                inputData.append("image", file);


                await axios.post(url, inputData);
                setuserName('');
                setFile('');
                setLink('');
                setSubtext('');
                setText('');
                setType('');
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        setLoading(false);
    }


    useEffect(() => {
        if(location.state != null){
            setuserName(location.state.username);
            setText(location.state.buttonText);
            setSubtext(location.state.buttonSubText);
            setLink(location.state.link);
            setType(location.state.type)
        }
    }, [])

  

    setInterval(() => {
        setDisplay(false)
    }, 3000);


    return (
        <>  {
            loading == true ? (
                <Loader></Loader>
            ) : <div className="container">
                        <div className="uploadForm ">
                            {
                                error == true ? (
                                    <div className={display == true ? "alert d-block" : "d-none"}>
                                        <p>Please fill all the fields :-!</p>
                                    </div>
                                ) : (
                                    <div className={display == true ? "success d-block" : "d-none"}>
                                        <p>Success ;-)</p>
                                    </div>
                                )
                            }
                            <form className="form w-75 w-md-50 mt-2 mb-4">
                                <div className="form-group mt-4">
                                    <label htmlFor="exampleInputEmail1">Image Description <span className="required">*</span></label>
                                    <input type="text" className="form-control" placeholder="Enter image description" onChange={(e) => setuserName(e.target.value)} value={userName} required={userName == ''} />
                                </div>
                                <div className="uploadedImage">
                                    <img src="" alt="" />
                                </div>
                                <div className="form-group mt-4">
                                    <label htmlFor="exampleInputEmail1">Upload Image <span className="required">*</span></label>
                                    <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} accept="image/*" required={file == {}} />
                                </div>

                                <div className="form-group mt-4">
                                    <label htmlFor="exampleInputEmail1">Button Text <span className="required">*</span></label>
                                    <input type="text" className="form-control" placeholder="Enter Button text" onChange={(e) => setText(e.target.value)} value={text} required={text == ''} />
                                </div>
                                <div className="form-group mt-4">
                                    <label htmlFor="exampleInputEmail1">Button Sub Text <span className="required">*</span></label>
                                    <input type="text" className="form-control" placeholder="Enter Button Sub Text" onChange={(e) => setSubtext(e.target.value)} value={subtext} required={subtext == ''} />
                                </div>
                                <div className="form-group mt-4">
                                    <label htmlFor="exampleInputEmail1">Button Link <span className="required">*</span></label>
                                    <input type="url" className="form-control" placeholder="Enter Button Link" onChange={(e) => setLink(e.target.value)} value={link} required={link == ''} />
                                </div>
                                <label htmlFor="exampleInputEmail1" className="mt-4">Select Image Type <span className="required">*</span></label>
                                <select className="form-control" onChange={(e) => setType(e.target.value)} value={type} required={type == ''}>
                                    <option>---Select---</option>
                                    <option>NFT</option>
                                    <option>Trending</option>
                                    <option>Latest</option>
                                </select>

                                <button type="submit" className="btn btn-dark mt-4" onClick={(e)=>{
                                    if(location.state != null){
                                         uploadImageData(e,location.state.id)
                                    }else{
                                        uploadImageData(e,'')
                                    }
                                     }}>Submit</button>
                            </form>
                        </div>
                    </div>
        }
        </>
    )
}

export default Form

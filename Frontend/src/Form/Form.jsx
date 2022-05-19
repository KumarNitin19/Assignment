import React, { useEffect, useState } from 'react'
import './Form.css';
import axios from 'axios'
import FileBase64 from 'react-file-base64'

const Form = () => {


    const [userName, setuserName] = useState('');
    const [file, setFile] = useState({});
    const [text, setText] = useState('');
    const [subtext, setSubtext] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState(false);
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(false);



    const uploadImageData = async (e) => {
        e.preventDefault();
        setError(true);
        setDisplay(true)
        if (userName != '' && file != '' && text != '' && subtext != '' && link != '') {
            setError(false);
            try {
                let url = 'http://localhost:7000/api/image/addImage';
                console.log(file);
                let inputData = {
                    "username": userName,
                    "buttonText": text,
                    "buttonSubText": subtext,
                    "link": link,
                    "file":file
            }
                const data = await axios.post(url, inputData);
                //  console.log(data.data.response);
            } catch (error) {
                console.log(error);
            }
        }
    }


    setTimeout(() => {
        setDisplay(false)
    }, 2000);



    return (
        <div className="container">
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
                <form className="form w-50 mt-4" enctype='multipart/form-data'>
                    <div className="form-group mt-4">
                        <label htmlFor="exampleInputEmail1">Username <span className="required">*</span></label>
                        <input type="text" className="form-control" placeholder="Enter username" onChange={(e) => setuserName(e.target.value)} required />
                    </div>
                    <div className="uploadedImage">
                        <img src="" alt="" />
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="exampleInputEmail1">Upload Image <span className="required">*</span></label>
                        <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0].name)} accept="image/*" required />
                    </div>

                    <div className="form-group mt-4">
                        <label htmlFor="exampleInputEmail1">Button Text <span className="required">*</span></label>
                        <input type="text" className="form-control" placeholder="Enter Button text" onChange={(e) => setText(e.target.value)} required />
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="exampleInputEmail1">Button Sub Text <span className="required">*</span></label>
                        <input type="text" className="form-control" placeholder="Enter Button Sub Text" onChange={(e) => setSubtext(e.target.value)} required />
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="exampleInputEmail1">Button Link <span className="required">*</span></label>
                        <input type="url" className="form-control" placeholder="Enter Button Link" onChange={(e) => setLink(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-dark mt-4" onClick={uploadImageData}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Form

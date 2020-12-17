import {useState,useEffect,Fragment} from 'react';

import './Systemcontentimage.css';
import Image1 from './ImageNotFound.svg';

const Systemcontentcard=({setShowModal})=>{
    const [dataImage,setDataImage]=useState({
        images:[],
        page:1,
        pages:1
    });

    const [dataFilter,setDataFilter]=useState({
        images:[],
        page:1,
        pages:1
    });

    const [filter,setFilter]=useState("");
    const [showContent,setShowContent]=useState(false);
    const [response,setResponse]=useState("");

    const getDataFromServer=async(filter)=>{
        let data=await fetch(`http://127.0.0.1:3030/imagen?action=get-data-imagen${filter}`,{
        method:'GET'
        });

        return await data.json();
    }
    const setDataForFilter=()=>{
        setResponse("");
        if(filter.trim()!==""){
                    setShowContent(false);
                    getDataFromServer(`&filter=${filter}`).then(res=>{
                        setShowContent(true);
                        if(res.state){
                            setDataFilter({
                                images:res.info,
                                page:res.page,
                                pages:res.pages
                            });
                        }else{
                            setDataFilter({
                                images:[],
                                page:0,
                                pages:0
                            });
                            console.log(res);
                            setResponse(res.info);
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
        }
    }

    const handleSearchImagen=(e)=>{
        let val=e.target.value;
        if (val===""){
            setFilter(val);
        }
        e.target.onsearch=()=>{
            setFilter(val);
        }
    }

    useEffect(
        setDataForFilter
    ,[filter]);

    useEffect(()=>{
        getDataFromServer("").then(res=>{
            setShowContent(true);
            if (res.state){
                setDataImage({
                    images:res.info,
                    page:res.page,
                    pages:res.pages
                });
            }else{
                console.log(res);
                setResponse(res.info);
            }
        }).catch(err=>{
            console.log(err);
        });
    },[]);

    const handleOpenModal=(e)=>{
        e.preventDefault();
        setShowModal(true);
    }

    const handleErrorImagen=(e)=>{
        e.target.src=Image1;
    }

    const cardItem=(title,date,imagen,k)=>{
        return (
            <div className="card-wrapper-item" key={k}>
                <img src={imagen}  alt="imagen" onError={handleErrorImagen}/>
                <input type="text" defaultValue={title} name="title" placeholder="title"/>
                <span className="card-actions">
                    <a href="save">save</a>
                    <a href="delete">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </a>
                </span>
                <p className="card-date">{date.split('T')[0]}</p>
            </div>
        );
    }

    return (
        <>
            <div className="wrapper-content-card">
                <h1>images</h1>
                <a href="add-new" className="card-add-new" onClick={handleOpenModal}>
                    <i className="fa fa-plus" aria-hidden="true"></i> new
                </a>
                <input type="search" onChange={handleSearchImagen} placeholder="search..."/>
                <i className="fa fa-search" aria-hidden="true"></i>
                <div className="card-main">
                    <p>{(filter==="")?`${dataImage.images.length} result`:`${dataFilter.images.length} result`}</p>
                    <div className="card-main-content">
                    {(response!=="")?<p className="response">{response}</p>:null}
                    {(showContent===false)?<p className="loading">loading...</p>
                        :(filter==="")?dataImage.images.map((ele,key)=>(
                        <Fragment key={ele._id}>
                            {cardItem(ele.title,ele.date,ele.pathimagen,key)}
                        </Fragment>))
                        :dataFilter.images.map((ele,key)=>(
                        <Fragment key={ele._id}>
                            {cardItem(ele.title,ele.date,ele.pathimagen,key)}
                        </Fragment>
                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Systemcontentcard;
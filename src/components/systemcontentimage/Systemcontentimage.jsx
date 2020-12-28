import {useState,useEffect,Fragment} from 'react';

import './Systemcontentimage.css';
import Image1 from './ImageNotFound.svg';
import dataconfig from '../../keys';

const Systemcontentcard=({setShowModal,updateNewData,setUpdateNewData,handleManageLoader})=>{
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
        let data=await fetch(`${dataconfig.dataserver.url}/imagen?action=get-data-imagen${filter}`,{
        method:'GET'
        });

        return await data.json();
    }

    const deleteImageFromServer=async(id)=>{
        let removeData=await fetch(`${dataconfig.dataserver.url}/imagen/${id}`,{
            method:'DELETE',
            body:JSON.stringify({
                action:'delete'
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        return await removeData.json();
    };

    const handleDeleteImage=(e)=>{
        e.preventDefault();
        let _id=e.currentTarget.getAttribute('k');
        deleteImageFromServer(`${_id}`).then(res=>{
            if(res.state){
                let all=dataImage.images.filter(ele=>(ele._id!==_id));
                setDataImage({
                    ...dataImage,
                    ...{images:all}
                });
            }else{
                console.log(res);
            }
        }).catch(err=>{
            console.log(err);
        })
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
    

    useEffect(()=>{
        if(updateNewData===true){
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
                setUpdateNewData(false);
            }).catch(err=>{
                console.log(err);
                setUpdateNewData(false)
            });        
        }
    },[updateNewData,setUpdateNewData])

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
                handleManageLoader(false);
            }else{
                console.log(res);
                setResponse(res.info);
            }
        }).catch(err=>{
            console.log(err);
        });
    },[handleManageLoader]);


    const handleMoreContent=()=>{
        let div=document.querySelector('#card-main-content');
        let total=div.scrollHeight-div.clientHeight;
        div.onscroll=()=>{
            if (div.scrollTop===total){
                let page=(dataImage.page===dataImage.pages)?1:dataImage.page+1;
                if(page>1){
                    getDataFromServer(`&page=${page}`).then(res=>{
                        if(res.state){
                            let all=dataImage.images.concat(res.info);
                            setDataImage({
                                images:all,
                                page:res.page,
                                pages:res.pages
                            })
                        }else{
                            console.log(res);
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }
            }
        }
    }

    useEffect(handleMoreContent,[dataImage]);

    const handleOpenModal=(e)=>{
        e.preventDefault();
        setShowModal(true);
    }

    const handleErrorImagen=(e)=>{
        e.target.src=Image1;
    }

    const sendDataUpdateFromServer=async(config)=>{
        let update=await fetch(`/imagen/${config._id}`,{
            method:'PATCH',
            body:JSON.stringify({
                action:'update',
                title:config.title
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        return await update.json();
    }

    const handleChangeValueImage=(e)=>{
        let btn=e.target.nextElementSibling.children[0];
        let title=dataImage.images.find(ele=>(ele._id===e.target.getAttribute('k')));
        let index=dataImage.images.findIndex(ele=>(ele._id===e.target.getAttribute('k')));
        if (title.title!==e.target.value){
            btn.classList.add('btn-enabled');
        }else{
            btn.classList.remove('btn-enabled');
        }
        if(e.target.value===""){
            btn.classList.remove('btn-enabled');
        }
        e.target.onblur=()=>{
            e.target.value=title.title;
            btn.classList.remove('btn-enabled');
        }
        if(btn.classList.contains('btn-enabled')&&e.target.value!==""){
            let resp=e.target.parentElement;
            let val=e.target.value;
            btn.onclick=(ev)=>{
                ev.preventDefault();
                sendDataUpdateFromServer({
                    title:val,
                    _id:e.target.getAttribute('k')
                }).then(res=>{
                    resp.children[resp.children.length-1].style.opacity='1';
                    if(res.state){
                        resp.children[resp.children.length-1].textContent="success";
                        let upda=dataImage.images;
                        title.title=val;
                        upda.splice(index,1,title);
                        e.target.value=res.info.title;
                        setDataImage({
                            ...dataImage,
                            ...{images:upda}
                        });
                    }else{
                        resp.children[resp.children.length-1].textContent="error";
                        console.log(res);
                    }
                    setTimeout(() => {
                    resp.children[resp.children.length-1].style.opacity='0';
                    }, 4000);
                }).catch(err=>{
                    console.log(err);
                })
        }
        }
    }

    const cardItem=(title,date,imagen,k)=>{
        return (
            <div className="card-wrapper-item">
                <img src={imagen}  alt="imagen" onError={handleErrorImagen}/>
                <input type="text" onChange={handleChangeValueImage} k={k} defaultValue={title} name="title" placeholder="title" />
                <span className="card-actions">
                    <a href="save">save</a>
                    <a href="delete" k={k} onClick={handleDeleteImage}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </a>
                </span>
                <p className="card-date">{date.split('T')[0]}</p>
                <p className="card-response"></p>
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
                    <div className="card-main-content" id="card-main-content">
                    {(response!=="")?<p className="response">{response}</p>:null}
                    {(showContent===false)?<p className="loading">loading...</p>
                        :(filter==="")?dataImage.images.map((ele)=>(
                        <Fragment key={ele._id}>
                            {cardItem(ele.title,ele.date,ele.pathimagen,ele._id)}
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
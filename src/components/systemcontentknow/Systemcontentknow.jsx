import {useState,useEffect,Fragment} from 'react';
import './Systemcontentknow.css';

const Systemcontentknow=({setShowModal,handleManageLoader,setDataUpdate,handleSession})=>{
    const [dataKnow,setDataKnow]=useState({
        know:[],
        page:1,
        pages:1
    });

    const [dataFilter,setDataFilter]=useState({
        know:[],
        page:1,
        pages:1
    });

    const [filter,setFilter]=useState("");
    const [showContent,setShowContent]=useState(false);
    const [response,setResponse]=useState("");

    const getDataFromServer=async(filter)=>{
        let data=await fetch(`/know?action=get-data-know${filter}`,{
        method:'GET'
        });

        return await data.json();
    }
    const handleGetDataUpdate=(e)=>{
        e.preventDefault();
        let dat=dataKnow.know.find(ele=>ele._id===e.currentTarget.getAttribute('k'));
        setDataUpdate({...dat,...{action:'update'}});
        setShowModal(true);
    }
    const setDataForFilter=()=>{
        setResponse("");
        if(filter.trim()!==""){
                    setShowContent(false);
                    getDataFromServer(`&filter=${filter}`).then(res=>{
                        setShowContent(true);
                        if(res.state){
                            setDataFilter({
                                know:res.info,
                                page:res.page,
                                pages:res.pages
                            });
                        }else{
                            setDataFilter({
                                know:[],
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

    const handleMoreContent=()=>{
        let div=document.querySelector('#know-main-content');
        let total=div.scrollHeight-div.clientHeight;
        div.onscroll=()=>{
            if (div.scrollTop===total){
                let page=(dataKnow.page===dataKnow.pages)?1:dataKnow.page+1;
                if(page>1){
                    getDataFromServer(`&page=${page}`).then(res=>{
                        if(res.state){
                            let all=dataKnow.know.concat(res.info);
                            setDataKnow({
                                know:all,
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

    useEffect(handleMoreContent,[dataKnow]);

    const sendDeleteFromServer=async(config)=>{
        let deleteData=await fetch(`/know/${config._id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                action:'delete'
            })
        });
        return await deleteData.json();
    }

    const handleDeleteData=(e)=>{
        e.preventDefault();
        handleManageLoader(true);
        let indx=dataKnow.know.findIndex(ele=>ele._id===e.currentTarget.getAttribute('k'));
        sendDeleteFromServer({_id:e.currentTarget.getAttribute('k')}).then(res=>{
            if(res.state){
                let newD=dataKnow.know;
                newD.splice(indx,1);
            }else{
                console.log(res);
            }
        }).catch(err=>{
            console.log(err);
        }).finally(()=>{
            handleManageLoader(false);
        })
    }

    const handleSearchKnow=(e)=>{
        let val=e.currentTarget.value;
        if (val===""){
            setFilter(val);
        }
        e.currentTarget.onsearch=()=>{
            setFilter(val);
        }
    }

    useEffect(
        setDataForFilter
    ,[filter]);

    const handleOpenModal=(e)=>{
        e.preventDefault();
        setDataUpdate({});
        setShowModal(true);
    }

    useEffect(()=>{
        handleSession();
        getDataFromServer("").then(res=>{
            setShowContent(true);
            if (res.state){
                setDataKnow({
                    know:res.info,
                    page:res.page,
                    pages:res.pages
                });
            }else{
                console.log(res);
                setResponse(res.info);
            }
            handleManageLoader(false);
        }).catch(err=>{
            console.log(err);
        });
    },[handleManageLoader,handleSession]);

    const knowItem=(title,date,k)=>{
        return (
            <div className="know-wrapper-item">
                <h4>{title}</h4>
                <h5>{date.split('T')[0]}</h5>
                <span className="item-actions">
                    <a href="edit" k={k} onClick={handleGetDataUpdate}>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </a>
                    <a href="delete" k={k} onClick={handleDeleteData}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </a>
                </span>
            </div>
        );
    }

    return (
        <>
            <div className="wrapper-content-know">
                <h1>Did you know?</h1>
                <a href="add-new" className="know-add-new" onClick={handleOpenModal}>
                    <i className="fa fa-plus" aria-hidden="true"></i> new
                </a>
                <input type="search" onChange={handleSearchKnow} placeholder="search..." />
                <i className="fa fa-search" aria-hidden="true"></i>
                <div className="know-main">
                    <p>{(filter==="")?`${dataKnow.know.length} result`:`${dataFilter.know.length} result`}</p>
                    <h3>title</h3>
                    <h3>date</h3>
                    <h3>actions</h3>
                    <div className="know-main-content" id="know-main-content">
                    {(response!=="")?<p className="response">{response}</p>:null}
                    {(showContent===false)?<p className="loading">loading...</p>
                        :(filter==="")?dataKnow.know.map((ele)=>(
                        <Fragment key={ele._id}>
                            {knowItem(ele.title,ele.date,ele._id)}
                        </Fragment>))
                        :dataFilter.know.map((ele)=>(
                        <Fragment key={ele._id}>
                            {knowItem(ele.title,ele.date,ele._id)}
                        </Fragment>
                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    );   
}

export default Systemcontentknow;
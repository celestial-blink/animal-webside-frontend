import {useState,useEffect,Fragment} from 'react';
import './Systemcontentknow.css';

const Systemcontentknow=({setShowModal})=>{
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
        let data=await fetch(`http://127.0.0.1:3030/know?action=get-data-know${filter}`,{
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
        setShowModal(true);
    }

    useEffect(()=>{
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
        }).catch(err=>{
            console.log(err);
        });
    },[]);

    const knowItem=(title,date,k)=>{
        return (
            <div className="know-wrapper-item" k={k}>
                <h4>{title}</h4>
                <h5>{date.split('T')[0]}</h5>
                <span className="item-actions">
                    <a href="edit">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </a>
                    <a href="delete">
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
                    <div className="know-main-content">
                    {(response!=="")?<p className="response">{response}</p>:null}
                    {(showContent===false)?<p className="loading">loading...</p>
                        :(filter==="")?dataKnow.know.map((ele,key)=>(
                        <Fragment key={ele._id}>
                            {knowItem(ele.title,ele.date,key)}
                        </Fragment>))
                        :dataFilter.know.map((ele,key)=>(
                        <Fragment key={ele._id}>
                            {knowItem(ele.title,ele.date,key)}
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
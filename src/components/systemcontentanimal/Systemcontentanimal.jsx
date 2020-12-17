import {useState,useEffect,Fragment} from 'react';

import './Systemcontentanimal.css';

const Systemcontentlist=({setShowModal})=>{

    const [dataAnimals,setDataAnimals]=useState({
        animals:[],
        page:1,
        pages:1
    });

    const [dataFilter,setDataFilter]=useState({
        animals:[],
        page:1,
        pages:1
    });

    const [filter,setFilter]=useState("");
    const [showContent,setShowContent]=useState(false);
    const [response,setResponse]=useState("");

    const handleOpenModal=(e)=>{
        e.preventDefault();
        setShowModal(true);
    }

    const getDataFromServer=async(filter)=>{
        let data=await fetch(`http://127.0.0.1:3030/animal?action=get-data-animals${filter}`,{
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
                                animals:res.info,
                                page:res.page,
                                pages:res.pages
                            });
                        }else{
                            setDataFilter({
                                animals:[],
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

    const handleSearchAnimal=(e)=>{
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

    useEffect(()=>{
        getDataFromServer("").then(res=>{
            setShowContent(true);
            if (res.state){
                setDataAnimals({
                    animals:res.info,
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

    const listItem=(title,date,k)=>{
        return (
            <div className="list-wrapper-item" k={k}>
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
            <div className="wrapper-content-list">
                <h1>Animal</h1>
                <a href="add-new" className="list-add-new" onClick={handleOpenModal}>
                    <i className="fa fa-plus" aria-hidden="true"></i> new
                </a>
                <input onChange={handleSearchAnimal} type="search" placeholder="search..."/>
                <i className="fa fa-search" aria-hidden="true"></i>
                <div className="list-main">
                    <p>{(filter==="")?`${dataAnimals.animals.length} result`:`${dataFilter.animals.length} result`}</p>
                    <h3>title</h3>
                    <h3>date</h3>
                    <h3>actions</h3>
                    <div className="list-main-content">
                        {(response!=="")?<p className="response">{response}</p>:null}
                        {(showContent===false)?<p className="loading">loading...</p>
                        :(filter==="")?dataAnimals.animals.map((ele,key)=>(
                        <Fragment key={ele._id}>
                            {listItem(ele.title,ele.date,key)}
                        </Fragment>))
                        :dataFilter.animals.map((ele,key)=>(
                        <Fragment key={ele._id}>
                            {listItem(ele.title,ele.date,key)}
                        </Fragment>
                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    );   
}

export default Systemcontentlist;
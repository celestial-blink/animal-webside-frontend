import {useState,useEffect} from 'react';

import './stylesheets/allAnimals.css';
import Cards from '../components/card/Card';
import MSearch from '../components/search/Search';
const Allanimals=()=>{
    const [dataFilter,setDataFilter]=useState({
        animals:[],
        page:1,
        pages:1
    });
    const [dataAnimal,setDataAnimal]=useState({
        animals:[],
        page:null,
        pages:null
    });
    const [response,setResponse]=useState("");
    const [filter,setFilter]=useState("");
    const [showContent,setShowContent]=useState(false);

    const setDataForFilter=()=>{
        setResponse("");
        if(filter.trim()!==""){
                    setShowContent(false);
                    getDatafromServer(`&filter=${filter}`).then(res=>{
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

    const handleMoreResult=(e)=>{
        e.preventDefault();
        let page=(dataAnimal.page!==dataAnimal.pages)?`page=${dataAnimal.page+1}`:"";
        if(page!==""){
            getDatafromServer(page).then(res=>{
                if(res.state){
                    setDataAnimal({
                        animals:{...dataAnimal.animals,...res.info},
                        page:res.page,
                        pages:res.pages
                    });
                }else{
                    console.log(res.info);
                }
            }).catch(err=>{
                console.log(err);
            });
        }
    }

    const getDatafromServer=async(params)=>{
        let data=await fetch(`/animal?action=get-data-animals${params}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
        return await data.json();
    }

    useEffect(setDataForFilter,[filter]);
    useEffect(()=>{
        getDatafromServer("").then(res=>{
            setShowContent(true);
            if(res.state){
                setDataAnimal({
                    animals:res.info,
                    page:res.page,
                    pages:res.pages
                });
            }else{
                console.log(res.info);
            }
        }).catch(err=>{
            console.log(err.message);
        })
    },[]);
    
    return (
    <>
        <MSearch setFilter={setFilter}/>
        <div className="wrapper-all-animals">
            <h2>all animals</h2>
            {(showContent===false)?<p className="loading">loading...</p>
            :(filter==="")?dataAnimal.animals.map((ele)=>{
                return <span key={ele._id}>
                    <Cards 
                        title={ele.title} 
                        description={ele.description} 
                        date={ele.date} 
                        imagen={ele.imagen.pathimagen} 
                        alldate={ele}
                    />
                </span>
            }):dataFilter.animals.map(ele=>(<span key={ele._id}>
            <Cards
                title={ele.title} 
                description={ele.description} 
                date={ele.date} 
                imagen={ele.imagen.pathimagen} 
                alldate={ele}
            />
            </span>
            ))
            }
            {(dataAnimal.page!==dataAnimal.pages)
            ?<a href="more" onClick={handleMoreResult} className="btn-more">more result</a>
            :null}
            {(showContent)?<p className="response">{response}</p>:null}
        </div>
    </>
    );
}

export default Allanimals;
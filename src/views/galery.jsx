import {useState,useEffect} from 'react';

import './stylesheets/galery.css';
import PhotoImagen from '../components/photoimagen/PhotoImagen';
import Search from '../components/search/Search';

const Galery = () => {
    let typeImg=["img-large","img-medium","img-small"];
    const [dataFilter,setDataFilter]=useState({
        images:[],
        page:1,
        pages:1
    });
    const [dataImages,setDataImages]=useState({
        images:[],
        page:1,
        pages:1
    });
    const [response,setResponse]=useState("");
    const [filter,setFilter]=useState("");
    const [showContent,setShowContent]=useState(false);

    const getDataFromServer=async(filter)=>{
        let data=await fetch(`http://127.0.0.1:3030/imagen?action=get-data-imagen${filter}`,{
        method:'GET'
        });

        return await data.json();
    }
    const randomClass=(arr)=>{
        let random=Math.floor(Math.random() * (3 - 0)) + 0;
        return arr[random];
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

    const handleMoreContent=(e)=>{
        e.preventDefault();
        setResponse("");
        if (dataImages.pages!==dataImages.page){
            let fil=`&page=${(dataImages.page!==dataImages.pages)?dataImages.page+1:1}`;
            getDataFromServer(fil).then(res=>{
                if(res.state){
                    setDataImages({
                       images:{...dataImages.images,...res.info},
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
        }
    }

    
    useEffect(()=>{
        getDataFromServer("").then(res=>{
            setShowContent(true);
            if(res){
                setDataImages({
                    images:res.info,
                    page:res.page,
                    pages:res.pages
                });
            }else{
                console.log(res);
            }
        }).catch(err=>{
            console.log(err);
        });
    },[]);
    useEffect(setDataForFilter,[filter]);

        
    return (
        <>
            <Search setFilter={setFilter}/>
            <div className="wrapper-images">
                {(showContent===false)?<p className="loading">loading...</p>
                :(filter==="")?dataImages.images.map(ele=>(<div key={ele._id} className={randomClass(typeImg)}><PhotoImagen imagen={ele.pathimagen}/></div>))
                :dataFilter.images.map(ele=>(<div key={ele._id} className={randomClass(typeImg)}><PhotoImagen imagen={ele.pathimagen}/></div>))}
            {(showContent!==false)
            ?(dataImages.page!==dataImages.pages)
            ?<a onClick={handleMoreContent} href="more" className="btn-more btn-images">show more</a>
            :null:null}

            {(showContent)?<p className="response">{response}</p>:null}
            </div>
        </>
    );
};

export default Galery;
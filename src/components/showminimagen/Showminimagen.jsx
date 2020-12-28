import {useState,useEffect} from 'react';

import Imageform from '../imageform/Imageform';
import NotFound from './ImageNotFound.svg';

import './Showminimagen.css';
import dataconfig from '../../keys';

const Showminimagen=({setShowImagens,setImagenid})=>{
    const [showAddImagen,setShowAddImagen]=useState(false);

    const handleAddImagen=(e)=>{
        e.preventDefault();
        setShowAddImagen(!showAddImagen);
    };

    const handleClickImagen=(e)=>{
        setImagenid(e.target.getAttribute('k'));
        handleCloseShowImagens(e);
    };

    const handleCloseShowImagens=(e)=>{
        e.preventDefault();
        setShowImagens(false);
    };

    const hanldeLoadErrorImagen=(e)=>{
        e.target.src=NotFound;
    }

    const [loadData,setLoadData]=useState(true);
    const [response,setResponse]=useState("");
    const [dataImagen,setDataImagen]=useState({
        imagen:[],
        page:1,
        pages:1
    });

    const [filter,setFilter]=useState("");
    const [dataFilter,setDataFilter]=useState({
        imagen:[],
        page:1,
        pages:1
    })

    const getDataFromServer=async(config)=>{
        let dataImages=await fetch(`${dataconfig.dataserver.url}/imagen?action=get-data-imagen${config.filter}`);
        return await dataImages.json();
    };

    const handleFilterImagen=(e)=>{
        let val = e.target.value;
        e.target.onsearch=()=>{
            setFilter(val);
        };
        if (val===""){
            setFilter(val);
        }
    }

    const getImagenFilterFromServer=()=>{
        setLoadData(true);
        getDataFromServer({filter:`&filter=${filter}`}).then(res=>{
            if(res.state){
                setDataFilter({
                    imagen:res.info,
                    page:res.page,
                    pages:res.pages
                });
            }else{
                console.log(res);
                setResponse(res.info);
            }
            setLoadData(false);
        }).catch(err=>{
            console.log(err,"error filter");
        });
    };

    useEffect(getImagenFilterFromServer,[filter]);

    useEffect(()=>{
        getDataFromServer({filter:""}).then(res=>{
            if(res.state){
                setDataImagen({
                    imagen:res.info,
                    page:res.page,
                    pages:res.pages
                });
            }else{
                setResponse(res.info);
            }
            setLoadData(false);
        }).catch(err=>{
            console.log(err,"error aqui");
        })
    },[]);

    return (
    <>
        <div className="wrapper-min-imagen">
            <a href="close" onClick={handleCloseShowImagens}><i className="fa fa-times" aria-hidden="true"></i> </a>
            {(showAddImagen)?<Imageform/>:null}
            <div className="content-min animate__animated animate__zoomIn">
                <input type="search" onChange={handleFilterImagen} placeholder="buscar..."/>
                <a href="add-imagen" onClick={handleAddImagen}><i className="fa fa-picture-o" aria-hidden="true"></i> new</a>
                {loadData?<p className="loading">loading...</p>
                :(response!=="")?<p className="response">{response}</p>
                :(filter==="")?dataImagen.imagen.map(ele=>(
                    <img onError={hanldeLoadErrorImagen} src={ele.pathimagen} k={ele._id} onClick={handleClickImagen} key={ele._id} alt="imagen"/>
                ))
                :dataFilter.imagen.map(ele=>(
                    <img onError={hanldeLoadErrorImagen} src={ele.pathimagen} k={ele._id} onClick={handleClickImagen} key={ele._id} alt="imagen"/>
                ))
                }
            </div>
        </div>   
    </>
    );
}

export default Showminimagen;
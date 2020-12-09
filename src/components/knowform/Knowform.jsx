import {useState,useEffect} from 'react';

import Showminimagen from '../showminimagen/Showminimagen';
import './Knowform.css';
const Knowform=()=>{
    const [knowData,setKnowData]=useState({
        _id:"",
        userid:"",
        imagenid:"",
        date:"",
        title:"",
        content:""
    });

    const handleSetDataKnow=(e)=>{
        let val=e.target.value;
        switch(e.target.getAttribute('name')){
            case "title":
                setKnowData({
                    ...knowData,
                    ...{title:val}
                });
                break;
            case 'content':
                setKnowData({
                    ...knowData,
                    ...{content:val}
                })
                break;
            default:
                break;
        }
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        console.log("todos los datos",knowData);
    };

    const handleShowImagens=(e)=>{
        e.preventDefault();
        setShowImagens(true);
    }

    const addDataImagenid=()=>{
        if(imagenid!==""){
            setKnowData({
                ...knowData,
                ...{imagenid:imagenid}
            })
            setImagenid("");
        }
    }

    const [showimagens,setShowImagens]=useState(false);
    const [imagenid,setImagenid]=useState("");
    useEffect(()=>{
        if(showimagens===false){
            addDataImagenid();
        }
    });
    return (
        <>
            <div className="wrapper-know-form animate__animated animate__fadeInLeft">
                <p className="response">response servidor</p>
                <form action="" method="post" onSubmit={handleFormSubmit}>
                    <legend>¿sabías qué?</legend>
                    <input type="text" name="title" onChange={handleSetDataKnow} value={knowData.title} placeholder="ingrese título"/>
                    <textarea name="content" cols="30" onChange={handleSetDataKnow} rows="10" value={knowData.content} placeholder="ingrese description"></textarea>
                    <a href="add-imagen" onClick={handleShowImagens}><i className="fa fa-picture-o" aria-hidden="true"></i> addimagen {(knowData.imagenid!=="")?<i className="fa fa-check" aria-hidden="true"></i>:null}</a>
                    <input type="submit" value="PUBLICAR"/>
                </form>
            </div>
            {(showimagens)?<Showminimagen setShowImagens={setShowImagens} setImagenid={setImagenid}/>:null}
        </>
    );
}

export default Knowform;
import {useState,useEffect} from 'react';

import Showminimagen from '../showminimagen/Showminimagen';
import './Knowform.css';
const Knowform=({dataUpdate,handleManageLoader})=>{
    const [knowData,setKnowData]=useState({
        _id:"",
        userid:"5fd17fdc7ed90014747b1622",
        imagenid:"",
        title:"",
        content:"",
        action:"insert"
    });

    const sendDataToServer=async(config)=>{
        let sendData=await fetch(`/know/${''+knowData._id}`,{
            method:config.method,
            body:JSON.stringify(knowData),
            headers:{
                'Content-Type':'application/json'
            }
        });
        return await sendData.json();
    }

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
        handleManageLoader(true);
        let resp=e.target.previousElementSibling;
        let config=(dataUpdate!==undefined && JSON.stringify(dataUpdate)!=='{}')
        ?{method:'PUT'}
        :{method:'POST'};
        sendDataToServer(config).then(res=>{
            if(res.state){
                resp.textContent="success";
                resp.classList.remove('error');
            }else{
                resp.textContent=res.info;
                resp.classList.add('error');
            };
            setTimeout(() => {
               resp.textContent=""; 
            }, 4000);
        }).catch(err=>{
            console.log(err);
            resp.textContent="error";
            resp.classList.add('error');
        }).finally(()=>{
            handleManageLoader(false);
        })
    };

    const handleFormReset=(e)=>{
        e.preventDefault();
        setKnowData({
            _id:"",
            userid:"5fd17fdc7ed90014747b1622",
            imagenid:"",
            title:"",
            content:"",
            action:"insert"
        });
        e.target.children[0].focus();
        dataUpdate=undefined;
    }

    const handleShowImagens=(e)=>{
        e.preventDefault();
        setShowImagens(true);
    }

    const addDataImageUpdate=()=>{
        if(dataUpdate!==undefined && JSON.stringify(dataUpdate)!=='{}'){
            setKnowData({
                _id:dataUpdate._id,
                userid:"",
                imagenid:dataUpdate.imagen[0]._id,
                title:dataUpdate.title,
                action:dataUpdate.action,
                content:dataUpdate.content
            });
            setImagenid("");
        }
    }
    

    const [showimagens,setShowImagens]=useState(false);
    const [imagenid,setImagenid]=useState("");
    useEffect(()=>{
        if(imagenid!==""){
            setKnowData({
                ...knowData,
                ...{imagenid:imagenid}
            });
            setImagenid("");
        }
    },[imagenid,knowData]);
    useEffect(addDataImageUpdate,[dataUpdate]);
    return (
        <>
            <div className="wrapper-know-form animate__animated animate__fadeInLeft">
                <p className="response"></p>
                <form action="" method="post" onSubmit={handleFormSubmit} onReset={handleFormReset}>
                    <legend>¿sabías qué?</legend>
                    <input type="text" name="title" onChange={handleSetDataKnow} defaultValue={knowData.title} placeholder="ingrese título"/>
                    <textarea name="content" cols="30" onChange={handleSetDataKnow} rows="10" defaultValue={knowData.content} placeholder="ingrese description"></textarea>
                    <a href="add-imagen" onClick={handleShowImagens}><i className="fa fa-picture-o" aria-hidden="true"></i> addimagen {(knowData.imagenid!=="")?<i className="fa fa-check" aria-hidden="true"></i>:null}</a>
                    <input type="submit" value="PUBLICAR"/>
                    <input type="reset" value="nuevo"/>
                </form>
            </div>
            {(showimagens)?<Showminimagen setShowImagens={setShowImagens} setImagenid={setImagenid}/>:null}
        </>
    );
}

export default Knowform;
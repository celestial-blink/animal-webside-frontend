import {useState,useEffect} from 'react';
import Showminimagen from '../showminimagen/Showminimagen';

import './Animalform.css';
const Animalform=()=>{
    const [dataAnimal,setDataAnimal]=useState({
        _id:"",
        title:"",
        description:"",
        imagenid:"",
        feeding:"",
        feedingimagenid:"",
        inhabit:[],
        inhabitimagenid:[],
        tags:[],
        date:"",
        userid:"",
    });

    const handleDeleteItem=(e)=>{
        e.preventDefault();
        let k=parseInt(e.target.parentElement.getAttribute("k"));
        let nwinhabit=dataAnimal.inhabit.filter((ele,key)=>(
            key!==k
        ));
        let nwinhabitimagenid=dataAnimal.inhabitimagenid.filter((ele,key)=>(
            key!==k
        ));
        setDataAnimal({
            ...dataAnimal,
            ...{inhabit:nwinhabit,inhabitimagenid:nwinhabitimagenid}
        })
    }

    const handleEditItem=(e)=>{
        e.preventDefault();
        let k=parseInt(e.target.parentElement.getAttribute('k'));
        console.log(k);
        let title=document.querySelector("#title-inhabit");
        let description=document.querySelector("#description-inhabit");
        title.value=dataAnimal.inhabit[k][0];
        description.value=dataAnimal.inhabit[k][1];
        setImagenid(dataAnimal.inhabitimagenid[k]);
        title.focus();
        let datainh=dataAnimal.inhabit;
        let datainhi=dataAnimal.inhabitimagenid;
        datainh.splice(k,1);
        datainhi.splice(k,1);
        setDataAnimal({
            ...dataAnimal,
            ...{
                inhabit:datainh,
                inhabitimagenid:datainhi
            }
        })
        console.log(datainh,datainhi);
    }

    const handleAddInhabitItem=(e)=>{
        e.preventDefault();
        let title=document.querySelector("#title-inhabit");
        let description=document.querySelector("#description-inhabit");
        if (title.value.trim()!=="" && description.value!=="" && imagenid!==""){
            let arr=[title.value,description.value];
            let inhabit=dataAnimal.inhabit;
            inhabit.push(arr);
            let inhabitimagenid=dataAnimal.inhabitimagenid;
            inhabitimagenid.push(imagenid)
            setDataAnimal({
                ...dataAnimal,
                ...{inhabit:inhabit},
                ...{inhabitimagenid:inhabitimagenid
            }});
            setImagenid("");
            title.value="";
            description.value="";
        }else{
            console.log("llene todos los campos");
        }
    }

    const addImagenData=()=>{
        if(imagenid!==""){
            if (targetImagen==="imagenid"){
                setDataAnimal({
                    ...dataAnimal,
                    ...{imagenid:imagenid}
                });
                setImagenid("");
                setTargetImagen("");
            }else if(targetImagen==="feedingimagenid"){
                setDataAnimal({
                    ...dataAnimal,
                    ...{feedingimagenid:imagenid}
                });
                setImagenid("");
                setTargetImagen("");
            }
        }
    }
     
    const addDataText=(e)=>{
        let val=e.target.value;
        switch(e.target.getAttribute('name')){
            case"title":
                setDataAnimal({
                    ...dataAnimal,
                    ...{title:val}
                });
                break;
            case "description":
                setDataAnimal({
                    ...dataAnimal,
                    ...{description:val}
                });
                break;
            case "feeding":
                setDataAnimal({
                    ...dataAnimal,
                    ...{feeding:val}
                });
                break;
            case "tags":
                setDataAnimal({
                    ...dataAnimal,
                    ...{tags:val}
                });
                break;
            default:
                break;
        }
    }
    
    const handleShowImages=(e)=>{
        e.preventDefault();
        setShowImagens(!showImagens);
        setTargetImagen(e.target.getAttribute('data-text'));
    }
    
    const handleSubmitForm=(e)=>{
        e.preventDefault();
        console.log(JSON.stringify(dataAnimal));
    }
    const inhabitItems=(title,description,imagen,key)=>{
        return(
            <span className="add-items" key={key}>
                    <img src={imagen} alt="imagen"/>
                    <h4>{title}</h4>
                    <p>{description}</p>
                    <a href="edit" k={key} onClick={handleEditItem}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> </a>
                    <a href="delete" k={key} onClick={handleDeleteItem}><i className="fa fa-trash" aria-hidden="true"></i> </a>
                </span>
        );
    }
    const [showImagens,setShowImagens]=useState(false);
    const [imagenid,setImagenid]=useState("");
    const [targetImagen,setTargetImagen]=useState("");

    useEffect(()=>{
        if(showImagens===false){
            addImagenData();
        }
    });


    return (
        <>
        <div className="wrapper-animal-form animate__animated animate__fadeInLeft">
            <p className="response">response servidor</p>
            <form method="post" onSubmit={handleSubmitForm}>
                <legend>Animal</legend>
                <input type="text" name="title" onChange={addDataText} placeholder="ingrese titulo"/>
                <textarea name="description" onChange={addDataText} cols="30" rows="10" placeholder="escriba descripcion"></textarea>
    <a href="add-imagen" data-text="imagenid" onClick={handleShowImages}><i className="fa fa-picture-o" aria-hidden="true"></i> add image {(dataAnimal.imagenid!=="")?<i id="icon-check" className="fa fa-check" aria-hidden="true"></i>:null}</a>
                <span className="form-separator"></span>
                <label>feeding</label>
                <input type="text" name="feeding" onChange={addDataText} placeholder="comida"/>
    <a href="add-imagen" data-text="feedingimagenid" onClick={handleShowImages}><i className="fa fa-picture-o" aria-hidden="true"></i> add image {(dataAnimal.feedingimagenid!=="")?<i id="icon-check" className="fa fa-check" aria-hidden="true"></i>:null}</a>
                <span className="form-separator"></span>
                <span className="container-inhabit">
                    <label>habitad</label>
                    <input type="text" id="title-inhabit" placeholder="Titulo del habitad"/>
                    <textarea cols="30" id="description-inhabit" rows="10" placeholder="Breve descripción..."></textarea>
    <a href="add-imagen" onClick={handleShowImages}><i className="fa fa-picture-o" aria-hidden="true"></i> add-imagen {(imagenid!=="")?<i id="icon-check" className="fa fa-check" aria-hidden="true"></i>:null}</a>
                    <a href="add" data-text="" onClick={handleAddInhabitItem}>Agregar</a>
                    <span className="additions">
                        {(dataAnimal.inhabit.length!==0)?dataAnimal.inhabit.map((ele,key)=>{
                            return (dataAnimal.inhabit.length>0)?inhabitItems(ele[0],ele[1],dataAnimal.inhabitimagenid[key],key):null;
                            }):<h2>ninguno</h2>
                        }
                    </span>
                </span>
                <span className="form-separator"></span>
                <label htmlFor="">etiquetas</label>
                <input type="text" name="tags" onChange={addDataText} placeholder="etiquetas example:manifero,vertebrado,cute,felino"/>
                <br/>
                <br/>
                <input type="submit" value="publicar"/>
            </form>
        </div>
        {
            (showImagens)?<Showminimagen setShowImagens={setShowImagens} setImagenid={setImagenid}/>:null
        }
        </>
    );
};

export default Animalform;
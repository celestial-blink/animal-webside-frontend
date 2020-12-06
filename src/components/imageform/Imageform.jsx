import {useState,useEffect} from 'react';
import './Imageform.css';
const Imageform =()=>{

    const [dataImagen,setDataImagen]=useState({
        _id:"",
        title:"",
        imagenid:"",
        userid:""
    });

    const handleSetDataImagen=(e)=>{
        setDataImagen({
            ...dataImagen,
            ...{title:e.target.value}
        });
    }

    const handleVerifiedImagen=(e)=>{
        let imagen=e.target.files.length;
        if (imagen>0){
            setDataImagen({
                ...dataImagen,
                ...{
                    imagenid:e.target.files[0]
                }
            });
        }else{
            setDataImagen({
                ...dataImagen,
                ...{imagenid: ""}
            })
        }
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        console.log(dataImagen);
    }

    useEffect(()=>{
        console.log(dataImagen);
    })

    return(
        <>
            <div className="wrapper-image-form animate__animated animate__headShake">
                <p className="response">message server</p>
                <form method="post" onSubmit={handleFormSubmit}>
                    <legend>Imagen</legend>
                    <input type="text" onChange={handleSetDataImagen} placeholder="titulo de la imagen"/>
    <label htmlFor="imagen"><i className="fa fa-picture-o" aria-hidden="true"></i> max 1mb {(dataImagen.imagenid!=="")?<i className="fa fa-check" aria-hidden="true"></i>:null}</label>
                    <input type="file" id="imagen" accept=".jpg,.jpeg,.png" onChange={handleVerifiedImagen}/>
                    <input type="submit" value="guardar"/>
                </form>
            </div>
        </>
    );
}
export default Imageform;
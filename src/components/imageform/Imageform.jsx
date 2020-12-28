import {useState,useEffect} from 'react';
import './Imageform.css';

import dataconfig from '../../keys';

const Imageform =({setUpdateNewData})=>{

    const [dataImagen,setDataImagen]=useState({
        _id:"",
        title:"",
        imagen:"",
        userid:"5fd17fdc7ed90014747b1622",
        action:"insert"
    });

    const handleSetDataImagen=(e)=>{
        setDataImagen({
            ...dataImagen,
            ...{title:e.target.value}
        });
    }

    const handleLoadNewData=(value)=>{
        setUpdateNewData(value);
    }

    const handleVerifiedImagen=(e)=>{
        let imagen=e.target.files.length;
        if (imagen>0){
            let maxsize=e.target.files[0].size<=1038576;
            if(maxsize){
                setDataImagen({
                    ...dataImagen,
                    ...{
                        imagen:e.target.files[0]
                    }
                });
                e.target.previousElementSibling.classList.remove('error');
                handleShowImagePreview(e.target.nextElementSibling);
                handleLoadNewData(true);
            }else{
                setDataImagen({
                    ...dataImagen,
                    ...{
                        imagen:""
                    }
                })
                e.target.previousElementSibling.classList.add('error');
            }
        }else{
            setDataImagen({
                ...dataImagen,
                ...{imagen: ""}
            })
        }
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        let ress=e.currentTarget.previousElementSibling;
        if(dataImagen.title!=="" && dataImagen.userid!=="" &&
        dataImagen.imagen!=="" && dataImagen.action!==""){
            let formdata=new FormData();
            formdata.append('action',dataImagen.action);
            formdata.append('userid',dataImagen.userid);
            formdata.append('title',dataImagen.title);
            formdata.append('imagen',dataImagen.imagen);
            sendDataToServer(formdata).then(res=>{
                if(res.state){
                    ress.textContent='success';
                    ress.classList.remove('error');
                    setDataImagen({
                        _id:"",
                        title:"",
                        imagen:"",
                        userid:"5fd17fdc7ed90014747b1622",
                        action:"insert"
                    });
                    console.log(res)
                }else{
                    ress.textContent=res.info;
                    ress.classList.add('error');
                    console.log(res)
                }
            }).catch(err=>{
                console.log(err);
                ress.textContent='error';
                ress.classList.add('error')
            });
        }
    }

    const handleShowImagePreview=()=>{
        if(dataImagen.imagen!==""){
            let img=new FileReader();
            img.readAsDataURL(dataImagen.imagen);
            img.onload=()=>{
                document.querySelector('#image-preview').src=img.result;
            }
            img.onerror=()=>{
                img.abort();
                document.querySelector('#image-preview').src="";
            }
        }else{
            document.querySelector('#image-preview').src="";
        }
    }

    const sendDataToServer=async(data)=>{
        let send=await fetch(`${dataconfig.dataserver.url}/imagen`,{
            method:'POST',
            body:data
        });
        return await send.json();
    }

    useEffect(handleShowImagePreview,[dataImagen.imagen]);

    return(
        <>
            <div className="wrapper-image-form animate__animated animate__headShake">
                <p className="response"></p>
                <form method="post" onSubmit={handleFormSubmit}>
                    <legend>Imagen</legend>
                    <input type="text" onChange={handleSetDataImagen} placeholder="titulo de la imagen"/>
                    <label htmlFor="imagen">
                        <i className="fa fa-picture-o" aria-hidden="true"></i> max 1mb {(dataImagen.imagen!=="")?<i className="fa fa-check" aria-hidden="true"></i>:null}
                    </label>
                    <input type="file" id="imagen" accept=".jpg,.jpeg,.png" onChange={handleVerifiedImagen}/>
                    <img src={""} alt="" id="image-preview"/>
                    <input type="submit" value="guardar"/>
                </form>
            </div>
        </>
    );
}
export default Imageform;
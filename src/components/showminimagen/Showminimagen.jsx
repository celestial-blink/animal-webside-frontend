import {useState} from 'react';

import Imageform from '../imageform/Imageform';
import NotFound from './ImageNotFound.svg';

import './Showminimagen.css';
const Showminimagen=({setShowImagens,setImagenid})=>{
const [showAddImagen,setShowAddImagen]=useState(false);

const handleAddImagen=(e)=>{
    e.preventDefault();
    setShowAddImagen(!showAddImagen);
}

const handleClickImagen=(e)=>{
    setImagenid(e.target.src);
    handleCloseShowImagens(e);
}

const handleCloseShowImagens=(e)=>{
    e.preventDefault();
    setShowImagens(false);
}

    return (
    <>
        <div className="wrapper-min-imagen">
            <a href="close" onClick={handleCloseShowImagens}><i className="fa fa-times" aria-hidden="true"></i> </a>
            {(showAddImagen)?<Imageform/>:null}
            <div className="content-min animate__animated animate__zoomIn">
                <input type="search" placeholder="buscar..."/>
                <a href="add-imagen" onClick={handleAddImagen}><i className="fa fa-picture-o" aria-hidden="true"></i> new</a>
                <img src={NotFound} alt="imagen" onClick={handleClickImagen}/>
                <img src={NotFound} alt="imagen" onClick={handleClickImagen}/>
            </div>
        </div>   
    </>
    );
}

export default Showminimagen;
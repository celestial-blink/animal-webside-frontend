import './PhotoImagen.css';
import Imagen from './ImageNotFound.svg';

const PhotoImagen=({imagen})=>{
    const handleErrorImagen=(e)=>{
        e.target.src=Imagen;
    }
    return (
        <>
            <img src={imagen} onError={handleErrorImagen} className="img-photo animate__animated animate__bounceIn" alt="imagen"/>
        </>
    );
}


export default PhotoImagen;
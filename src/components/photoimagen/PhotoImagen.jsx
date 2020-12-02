import './PhotoImagen.css';
import Imagen1 from './imagen1.jpg';

const PhotoImagen=()=>{
    return (
        <>
            <img className="img-photo animate__animated animate__bounceIn" src={Imagen1} alt="imagen"/>
        </>
    );
}


export default PhotoImagen;
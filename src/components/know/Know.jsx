import './Know.css';
import Imagen from './Imagen.jpg';

const Know = ({title,content,imagen})=>{
    const handleLoadErrorImage=(e)=>{
        e.target.src=Imagen;
    }
    return (
     <div className="wrapper-know animate__animated animate__slideInUp">
            <span  className="know-text">
                <h2 >{title}</h2>
                <p >{content}</p>
            </span>
            <img onError={handleLoadErrorImage} className="know-imagen" src={imagen} alt="Imagen-know"/>
        </div>
    );
};
export default Know;
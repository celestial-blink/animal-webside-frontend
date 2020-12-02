import './Know.css';
import Imagen from './Imagen.jpg';

const Know = ()=>{
    return (
        <div className="wrapper-know animate__animated animate__slideInUp">
            <span className="know-text">
                <h2>Lorem ipsum dolor sit.</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta unde laborum odio eos est quos, laboriosam modi dolorum tempora quo.</p>
            </span>
            <img className="know-imagen" src={Imagen} alt="Imagen-know"/>
        </div>
    );
};
export default Know;
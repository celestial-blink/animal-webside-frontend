import './Card.css';
import Imagen from './Imagen.png';

const Card = () => {
    return (
        <>
            <div className="wrapper-card animate__animated animate__backInLeft">
                <span className="card-text">
                    <h2>
                        Lorem ipsum dolor sit.
                    </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iure atque neque sequi ad eaque dolore, hic accusantium culpa quasi?</p>
                    <a href="go">Ver más</a>
                </span>
                <img className="card-imagen" src={Imagen} alt="imagen" />
            </div>
        </>
    );
};

export default Card;
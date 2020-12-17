import './Card.css';
import Imagen from './ImageNotFound.svg';

const Card = ({title,description,date,imagen,alldate}) => {
    const handleLoadErrorImage=(e)=>{
        e.target.src=Imagen;
    }
    return (
            <div className="wrapper-card animate__animated animate__backInLeft">
                <span className="card-text">
                    <h2>
                        {title}
                    </h2>
                    <p>{description}</p>
                    <a href={`${"/animal/information"}?title=${title}&imagen=${imagen}&description=${description}&feeding=${alldate.feeding}&feedingimagen=${alldate.feedingImagen.pathimagen}${alldate.inhabit.map((ele)=>{return `&inhabit=${ele[0]}>${ele[1]}`})}${alldate.inhabitImagen.map((ele)=>{return `&inhabitImagen=${ele.pathimagen}`})}&user=${alldate.user[0].user}`}
                    >Ver más</a>
                    <p className="date">
                        {date.split('T')[0]}
                    </p>
                </span>
                <img onError={handleLoadErrorImage} className="card-imagen" src={imagen} alt="imagen" />
            </div>
    );
};

export default Card;
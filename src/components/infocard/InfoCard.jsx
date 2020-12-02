import './InfoCard.css';
import Imagen1 from './image1.jpg';
import Imagen2 from './image2.jpg';
import Imagen3 from './image3.jpg';
import Imagen4 from './image4.jpg';

const InfoCard = ()=>{
    return (
        <>
            <div className="wrapper-infocard">
            <h2>Lorem ipsum dolor sit.</h2>
                <img className="img-primary" src={Imagen1} alt="imagen"/>
                <p className="text-primary">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, reprehenderit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit laudantium provident impedit! Facere eligendi cupiditate blanditiis eum iure consequatur corporis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut nam ea voluptas nihil unde perferendis ab eaque minus consectetur odit!</p>
                <h2>Lorem ipsum dolor sit.</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod placeat assumenda eos provident quaerat!</p>
                <img className="img-secondary img-round" src={Imagen2} alt="imagen"/>
                <h2>Lorem ipsum dolor sit amet.</h2>
                <img className="img-thrid" src={Imagen3} alt="imagen"/>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, illo.</p>
                <img className="img-thrid" src={Imagen4} alt="imagen" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                <p className="text-auth">Lorem ipsum dolor sit amet.</p>
            </div>
        </>
    );
};

export default InfoCard;
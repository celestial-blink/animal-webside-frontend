import {Fragment} from 'react';
import './InfoCard.css';

import Imagen from './ImageNotFound.svg'

const InfoCard = ()=>{
    let params=new URLSearchParams(window.location.search);


    const controllerDataInhabit=(arr)=>{
        let transform=arr.map(ele=>{return ele.split('>')});
        return transform;
    }
    const controllerDataInhabitImgen=(arr)=>{
        let transform =arr.map(ele=>(ele.replace(',','')));
        return transform;
    };
    let dataCard={
        title:params.get('title'),
        imagen:params.get('imagen'),
        description:params.get('description'),
        feeding:params.get('feeding'),
        feedingimagen:params.get('feedingimagen'),
        inhabitimagen:controllerDataInhabitImgen(params.getAll('inhabitImagen')),
        inhabit:controllerDataInhabit(params.getAll('inhabit')),
        user:params.get('user')
    }
    const handleErrorImage=(e)=>{
        e.target.src=Imagen;
    }
    
    return (
        <>
            <div className="wrapper-infocard">
                <h2>{dataCard.title}</h2>
                <img className="img-primary" onError={handleErrorImage} src={dataCard.imagen} alt="imagen"/>
                <p className="text-primary">{dataCard.description}</p>
                <h2>feeding</h2>
                <p>{dataCard.feeding}</p>
                <img className="img-secondary img-round" onError={handleErrorImage} src={dataCard.feedingimagen} alt="imagen"/>
                <h2>inhabit</h2>
                {
                     dataCard.inhabit.map((ele,key)=>{
                         return  <Fragment key={key}><img className="img-thrid" onError={handleErrorImage} src={dataCard.inhabitimagen[key]} alt="imagen"/>
                                 <p><strong>{ele[0]}</strong>: {ele[1]}</p></Fragment>
                     })
                }
                <p className="text-auth">{dataCard.user}</p>
            </div>
        </>
    );
};

export default InfoCard;
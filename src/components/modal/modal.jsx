import ImagenForm from '../imageform/Imageform';
import KnowForm from '../knowform/Knowform';
import Animalform from '../animalform/Animalform';

import './modal.css';
const modal=({setShowModal,namecomponent})=>{
    const handleCloseModal=(e)=>{
        e.preventDefault();
        setShowModal(false);
    }

    const selectCompoment=(component)=>{
        switch (component){
            case "animal":
                return <Animalform/>
            case "know":
                return <KnowForm/>
            case "images":
                return <ImagenForm/>
            default :
                return null;
        }
    }

    return (
        <div className="wrapper-modal">
                <a href="close" onClick={handleCloseModal}><i className="fa fa-times-circle"></i></a>
                <div className="content-modal">
                    {selectCompoment(namecomponent)}
                </div>
        </div>
    );
}

export default modal;
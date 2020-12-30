import ImagenForm from '../imageform/Imageform';
import KnowForm from '../knowform/Knowform';
import Animalform from '../animalform/Animalform';

import './modal.css';
const modal=({setShowModal,namecomponent,handleManageLoader,getDataUpdate,dataUser})=>{
    const handleCloseModal=(e)=>{
        e.preventDefault();
        setShowModal(false);
    }

    const selectCompoment=(component)=>{
        switch (component){
            case "animal":
                    return <Animalform dataUser={dataUser}  getDataUpdate={getDataUpdate} handleManageLoader={handleManageLoader}/>;
                case "images":
                    return <ImagenForm dataUser={dataUser} handleManageLoader={handleManageLoader}/>;
                case "know":
                    return <KnowForm dataUser={dataUser} dataUpdate={getDataUpdate} handleManageLoader={handleManageLoader}/>;
            default:
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
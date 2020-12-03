import './Systemcontentimage.css';

const Systemcontentcard=({setShowModal})=>{

    const handleOpenModal=(e)=>{
        e.preventDefault();
        setShowModal(true);
    }

    const cardItem=({key})=>{
        return (
            <div className="card-wrapper-item" key={key}>
                <img  alt="imagen"/>
                <input type="text" name="title" placeholder="title"/>
                <span className="card-actions">
                    <a href="save">save</a>
                    <a href="delete">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </a>
                </span>
                <p className="card-date">12/12/12</p>
            </div>
        );
    }

    return (
        <>
            <div className="wrapper-content-card">
                <h1>images</h1>
                <a href="add-new" className="card-add-new" onClick={handleOpenModal}>
                    <i className="fa fa-plus" aria-hidden="true"></i> new
                </a>
                <input type="search" name="" placeholder="search..."/>
                <i className="fa fa-search" aria-hidden="true"></i>
                <div className="card-main">
                    <p>100 result</p>
                    <div className="card-main-content">
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                        {cardItem(1)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Systemcontentcard;
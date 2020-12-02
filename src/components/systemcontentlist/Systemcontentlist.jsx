import './Systemcontentlist.css';

const Systemcontentlist=()=>{

    const listItem=()=>{
        return (
            <div className="list-wrapper-item">
                <h4>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h4>
                <h5>12/12/12</h5>
                <span className="item-actions">
                    <a href="edit">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </a>
                    <a href="delete">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </a>
                </span>
            </div>
        );
    }

    return (
        <>
            <div className="wrapper-content-list">
                <h1>Animal</h1>
                <a href="add-new" className="list-add-new">
                    <i className="fa fa-plus" aria-hidden="true"></i> new
                </a>
                <input type="search" name="" placeholder="search..."/>
                <i className="fa fa-search" aria-hidden="true"></i>
                <div className="list-main">
                    <p>100 result</p>
                    <h3>title</h3>
                    <h3>date</h3>
                    <h3>actions</h3>
                    <div className="list-main-content">
                        {listItem()}
                        {listItem()}
                        {listItem()}
                        {listItem()}
                        {listItem()}
                        {listItem()}
                        {listItem()}

                    </div>
                </div>
            </div>
        </>
    );   
}

export default Systemcontentlist;
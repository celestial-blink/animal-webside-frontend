import './action.css';
const minAction=({dataUser})=>{
    return (
        <div className="wrapper-action">
            <span>
                <a href="manage-content">
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                    <h6>{dataUser.user}</h6>
                    <p>Manage webside</p>
                </a>
            </span>
            <span>
                <a href={`/animal/new?_id=${dataUser._id}`}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    <p>new animal</p>
                </a>
            </span>
        </div>
    );
}

export default minAction;
import './MLoader.css';
const MLoader=()=>{
    return (
        <div className="wrapper-loader">
            <div className="content-loader">
                <span style={{'--i':'1'}}></span>
                <h4>Loading...</h4>
                <span style={{'--i':'1.4'}}></span>
            </div> 
        </div>
    );
}
export default MLoader;
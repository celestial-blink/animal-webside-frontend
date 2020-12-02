import './Imageform.css';
const Imageform =()=>{

const handleImagenOk=(e)=>{
    let icon=document.querySelector("#icon-check");
    if (e.target.files.length>0){
        icon.style.display='inline';
    }else{
        icon.style.display='none';
    }
}
    return(
        <>
            <div className="wrapper-image-form animate__animated animate__headShake">
                <p className="">message server</p>
                <form method="post">
                    <input type="text" placeholder="titulo de la imagen"/>
                    <label htmlFor="imagen" id="label-imagen"><i className="fa fa-picture-o" aria-hidden="true"></i> max 1mb <i id="icon-check" className="fa fa-check" aria-hidden="true"></i></label>
                    <input type="file" placeholder="" id="imagen" accept=".jpg,.jpeg,.png" onChange={handleImagenOk}/>
                    <input type="submit" value="guardar"/>
                </form>
            </div>
        </>
    );
}
export default Imageform;
import './FormLogin.css';
const FormLogin =()=>{
    return(
        <>
            <form className="wrapper-form-login" action="">
                <h2>Login</h2>
                <input type="text" name="user" placeholder="Usuario"/>
                <input type="password" name="password" placeholder="Contraseña"/>
                <input type="submit" value="ingresar"/>
            </form>
        </>
    );
};
export default FormLogin;
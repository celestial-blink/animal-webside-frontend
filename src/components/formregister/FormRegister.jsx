import './FormRegister.css';

const FormRegister = () =>{
    return (
        <>
            <form className="wrapper-form-registration">
                <h2>Registrarme</h2>
                <input type="text" name="usuario" placeholder="ingrese usuario"/>
                <input type="password" name="password" placeholder="ingrese contraseña"/>
                <input type="password" name="repeat" placeholder="repetir contraseña" />
                <input type="text" name="fullname" placeholder="nombre completo" />
                <input type="email" name="email" placeholder="correo electrónico" />
                <input type="submit" value="Registrarme"/>
            </form>
        </>
    );
};

export default FormRegister;
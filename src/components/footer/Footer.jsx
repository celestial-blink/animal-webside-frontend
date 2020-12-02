import './Footer.css';

const Footer = () => {
    return(
        <div className="wrapper-footer">
            <h2 className="title-menu">Menu</h2>
            <h2 className="title-social">Redes sociales</h2>
            <span className="footer-menu">
                <ul>
                    <li><a href="inicio">inicio</a></li>
                    <li><a href="todos">todos</a></li>
                    <li><a href="galeria">galeria</a></li>
                    <li><a href="contacto">contacto</a></li>
                </ul>
            </span>
            <span className="footer-social">
                <ul>
                    <li><a href="facebook"><i className="fa fa-facebook-square"></i></a></li>
                    <li><a href="twitter"><i className="fa fa-twitter-square"></i></a></li>
                    <li><a href="instagram"><i className="fa fa-instagram"></i></a></li>
                </ul>
            </span>
            <p className="copy">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, et!
            </p>
        </div>
    );
};

export default Footer;
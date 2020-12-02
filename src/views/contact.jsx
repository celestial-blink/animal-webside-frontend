import './stylesheets/contact.css';
import Logo from './images/logo.svg';

const Contact = ()=>{
    return (
        <>
            <div className="wrapper-contact animate__animated animate__backInLeft">
                <img src={Logo} alt="imagen"/>
                <p className="contact-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente maxime, aut consectetur inventore odio quod possimus aliquid deserunt fugiat dolorum. Commodi id nobis, recusandae animi illum cum pariatur? Modi, illum?</p>
                <ul className="contact-social">
                    <li><a href="facebook"><i className="fab fa-facebook-square"></i> </a></li>
                    <li><a href="twitter"><i className="fab fa-twitter-square"></i> </a></li>
                    <li><a href="instaram"><i className="fab fa-instagram-square"></i> </a></li>
                </ul>
            </div>
        </>
    );
};

export default Contact;
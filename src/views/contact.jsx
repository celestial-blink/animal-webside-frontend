import './stylesheets/contact.css';
import Logo from './images/logo.svg';

const Contact = ()=>{
    return (
        <>
            <div className="wrapper-contact animate__animated animate__backInLeft">
                <img src={Logo} alt="imagen"/>
                <p className="contact-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente maxime, aut consectetur inventore odio quod possimus aliquid deserunt fugiat dolorum. Commodi id nobis, recusandae animi illum cum pariatur? Modi, illum?</p>
                <ul className="contact-social">
                    <li><a href="facebook"><i className="fa fa-facebook-square"></i> </a></li>
                    <li><a href="twitter"><i className="fa fa-twitter-square"></i> </a></li>
                    <li><a href="instagram"><i className="fa fa-instagram"></i> </a></li>
                </ul>
            </div>
        </>
    );
};

export default Contact;
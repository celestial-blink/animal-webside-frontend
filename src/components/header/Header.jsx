import './Header.css';
import Image from './Image.png';

const Header = () => {
    return (
        <>
            <div className="wrapper-header">
                <span className="header-text">
                    <h1>Lorem ipsum dolor sit amet consectetur.</h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos delectus dolore perferendis officia laudantium repellendus cumque!
                    </p>
                </span>
                <img className="header-imagen animate__animated animate__slideInDown" src={Image} alt="Animal" />
            </div>
        </>
    );
};

export default Header;
import logo from '../../assets/logo.svg';
import bagIcon from '../../assets/icons/bag.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="container header--container">      
        <div className="header--container--logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="header--container--car">
          <img src={bagIcon} alt="Shopping bag" />
          <p>teste</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

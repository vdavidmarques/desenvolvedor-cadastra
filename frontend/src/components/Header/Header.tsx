import logo from "../../assets/logo.svg";
import bagIcon from "../../assets/icons/bag.svg";
import { useCart } from "./CartContext";

const Header = () => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <header className="header">
      <div className="container header--container">
        <div className="header--container--logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="header--container--car">
          <img src={bagIcon} alt="Shopping bag" />
          {itemCount > 0 && <span className="cart-item-count">{itemCount}</span>}
        </div>
      </div>
    </header>
  );
};

export default Header;
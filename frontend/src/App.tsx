import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { CartProvider } from './components/Header/CartContext';
import { ProductPage } from './components/ProductPage/ProductPage';
import './styles/main.scss';

function App() {

  return (
    <CartProvider>
      <Header />
      <ProductPage />
      <Footer />
    </CartProvider>
  );
}

export default App

import logo from './logo.svg';
import './App.css';
import CryptoPrices from './CryptoPrices';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Crypto Prices</h1>
      <CryptoPrices />
    </div>
  );
}

export default App;

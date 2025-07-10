import React, { useEffect, useState } from "react";

function CryptoPrices() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setCryptos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10 mt-12">
      <table className="min-w-full divide-y divide-gray-200 text-lg">
        <thead>
          <tr>
            <th className="py-4 px-6 text-left text-base font-bold text-gray-700 uppercase tracking-wider">Logo</th>
            <th className="py-4 px-6 text-left text-base font-bold text-gray-700 uppercase tracking-wider">Symbol</th>
            <th className="py-4 px-6 text-left text-base font-bold text-gray-700 uppercase tracking-wider">Name</th>
            <th className="py-4 px-6 text-left text-base font-bold text-gray-700 uppercase tracking-wider">Price (USD)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {cryptos.map((crypto, idx) => (
            <tr
              key={crypto.id}
              className={idx % 2 === 0 ? "bg-gray-50 hover:bg-blue-50" : "bg-white hover:bg-blue-50"}
            >
              <td className="py-3 px-6">
                <img src={crypto.image} alt={crypto.name} className="w-12 h-12 rounded-full" />
              </td>
              <td className="py-3 px-6 font-mono uppercase font-semibold">{crypto.symbol}</td>
              <td className="py-3 px-6 font-semibold">{crypto.name}</td>
              <td className="py-3 px-6 font-bold">${crypto.current_price?.toLocaleString(undefined, { maximumFractionDigits: 8 })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoPrices; 
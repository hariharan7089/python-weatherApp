import React, { useState } from 'react';

function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async (event) => {
        if(event.key=="Enter"){
            event.preventDefault();
            setCity("")

            try {
                const response = await fetch(`http://127.0.0.1:5000/weather?city=${city}`);
                const data = await response.json();
    
                if (response.status === 200) {
                    setWeather(data);
                    setError('');
                } else {
                    setWeather(null);
                    setError(data.error);
                }
            } catch (err) {
                setWeather(null);
                setError('An error occurred while fetching the weather data.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500/80 via-purple-500/70 to-pink-500/40 flex items-center justify-center">
            <div className="glass w-full max-w-md p-6 space-y-6">
                <h1 className="text-4xl font-extrabold text-white text-center mb-4">Weather App</h1>
                <input 
                    type="text" 
                    placeholder="Enter city name" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    onKeyDown={fetchWeather}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    onClick={fetchWeather} 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition duration-300"
                >
                    Get Weather
                </button>

                {weather && (
                    <div className="mt-[10px] bg-white/70  bg-opacity-90 p-4 flex flex-col items-center rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-blue-700">{weather.city}</h2>
                        <p className="text-lg text-gray-800 mb-2">{weather.temperature} °C</p>
                        <p className="text-sm text-gray-600 mb-4">{weather.description}</p>
                        <img 
                            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
                            alt="weather icon" 
                            className="mx-auto"
                        />
                    </div>
                )}

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
}

export default Weather;

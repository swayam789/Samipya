import Footer from '../../../Shared/frontend/footer/footer';
import './hero.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const [locationValue, setLocationValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [Local,SetLocal] = useState('');
    const navigate = useNavigate();
  
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => 
                    {
                    getLocationName(position.coords.latitude, position.coords.longitude);
                    // On success, update input with coordinates
                    const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
                    setLocationValue(coords);
                },
                (error) => {
                    // On error, show appropriate message
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            alert("Please allow location access to use this feature.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert("Location information unavailable.");
                            break;
                        case error.TIMEOUT:
                            alert("Location request timed out.");
                            break;
                        default:
                            alert("An unknown error occurred.");
                            break;
                    }
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };
    const getLocationName = (la, lo) =>
    {
        
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${la}&lon=${lo}&format=json`;
          
            fetch(url)
              .then(response => response.json())
              .then(data => {
                SetLocal(data.display_name);  // This is the human-readable location name
              })
              .catch(error => console.log('Error: ', error));
          
    }
    const handleManualInput = (e) => {
        setLocationValue(e.target.value);
        SetLocal(e.target.value)
        console.log(locationValue);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() && locationValue.trim()) {
            navigate(`/user/products?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(locationValue)}`);
        } else {
            alert('Please enter both search query and location');
        }
    };

    return (
        <div className='uhome'>
            <section className="hero">
                <div className="container1">
                    <h2 className="hero-title" style={{fontSize: '3rem', marginTop: '5rem'}}>From Pin to Pinnacle</h2>
                    
                    <div className="search-container">
                        <div className="search-box">
                            <input 
                                type="text" 
                                name="search" 
                                placeholder="Search for products..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="location-box">
                            <input 
                                type="text" 
                                value={Local}
                                onChange={handleManualInput}
                                placeholder="Enter your location..." 
                            />
                            <button 
                                className="location-btn" 
                                onClick={getLocation}
                                title="We use your exact location to determine the nearest and fastest route to your location"
                            >
                                <i className="fas fa-map-marker-alt"></i>
                                Use My Location
                                <i className="fas fa-question-circle"></i>
                            </button>
                        </div>
                        <button onClick={handleSearch} className="search-btn">Search</button>
                    </div>
                    <p className="hero-text"></p>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default Hero;
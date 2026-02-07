import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('loggedInUser');
        handleSuccess('Logout successful');
        setTimeout(() => {
            navigate('/login');
        }, 1000)

    }
    

    const fetchProducts = async () => {
        try{
        const url = "http://localhost:8080/products";
        const headers = {
            headers: {
                'Authorization' : localStorage.getItem('jwtToken')

            }

        }

        const response = await fetch(url, headers);
        const result = await response.json();
        console.log(result);
        setProducts(result);
       
        } catch (err){
            handleError(err);
        }
    }
        useEffect(() =>{
            fetchProducts()
        }, [])

    return (
        <div>
            <h1 className="welcome-text">Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {
                    products && products?.map((item, index)=>(
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                }
            </div>

            <div className="cards-container">
  <div
    className="app-card"
    onClick={() =>
      window.open(
        'https://deveshsharma96.github.io/WetherForecast-and-AQI-Detail-using-api/',
        '_blank'
      )
    }
  >
    <h2>Weather & AQI App</h2>
    <p>Live weather updates and air quality index using APIs.</p>
  </div>

  <div
    className="app-card"
    onClick={() =>
      window.open(
        'https://deveshsharma96.github.io/CurrencyExchange-using-api-connection/',
        '_blank'
      )
    }
  >
    <h2>Currency Exchange App</h2>
    <p>Real-time currency conversion with live exchange rates.</p>
  </div>
</div>


            <ToastContainer/>
           
        </div>


    )
}

export default Home;

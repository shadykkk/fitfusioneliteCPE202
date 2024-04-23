import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const clientId = 'AYnh-9IN7iqMYmDzQBEF7n5R1nPztWUTQHP_5a64noW3ZMeNfyppUPlIyTNi-sFqQYlBc3DX4lbGtI44';
    const clientSecret = 'EKHp3ZpUkTaXpeLNRq7rCb_4NrGJLeioch9HcuP23Uick6ZuNHsVQv2lkdVw7b-uF7FZVg1r6pFRD397';

    const getToken = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
          },
          data: 'grant_type=client_credentials'
        });

        console.log(response.data);
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error(error);
      }
    };

    getToken();

    const intervalId = setInterval(() => {
      getToken();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>PayPal Access Token: {accessToken}</h1>
    </div>
  );
}

export default App;

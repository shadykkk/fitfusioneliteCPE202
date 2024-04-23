// import React, { useEffect, useState } from 'react';
// import paypal from 'paypal-rest-sdk';

// const PayPalAccessToken = () => {
//   const [accessToken, setAccessToken] = useState('');

//   useEffect(() => {
//     const clientId = 'YOUR_CLIENT_ID_HERE';
//     const secret = 'YOUR_CLIENT_SECRET_HERE';
//     const mode = 'sandbox'; // or 'live'

//     paypal.configure({
//       mode,
//       client_id: clientId,
//       client_secret: secret
//     });

//     // Request an access token immediately
//     requestAccessToken();

//     // Request a new access token every minute
//     const intervalId = setInterval(requestAccessToken, 60 * 1000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const requestAccessToken = () => {
//     paypal.auth.createAccessToken(function(error, token) {
//       if (error) {
//         console.error(error);
//       } else {
//         console.log('Access token: ' + token.access_token);
//         setAccessToken(token.access_token);
//       }
//     });
//   };

//   return <div>Access token: {accessToken}</div>;
// };

// export default PayPalAccessToken;

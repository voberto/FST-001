import React from 'react';
import axios from 'axios';

const MyComponent = () => {
    return (
      <div>
        <h1>Environment Variable Test</h1>
        <p>API URL Docker: {process.env.NEXT_PUBLIC_API_URL_DOCKER}</p>
      </div>
    );
  };
  
  export default MyComponent;
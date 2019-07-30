import React from 'react'

const Page404 = ({ location }) => (
   <div>
      <h1> Page 404 Error!</h1>
      <h2>No match found for <code>{location.pathname}</code></h2>
   </div>
);

export default Page404;

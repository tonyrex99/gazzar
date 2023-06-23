import React, { useEffect, useState } from "react";

const ErrorComponent = () => {
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    // Add logic to set the error message based on resource and action
    // if (resource) {
    //   if (action) {
    //     setErrorMessage(
    //       `You may have forgotten to add the "${action}" component to "${resource?.name}" resource.`
    //     );
    //   }
    // }
  }, []);

  return (
    <div>
      <h1>404</h1>
      <p>Sorry, the page you visited does not exist.</p>
      {errorMessage && <p>{errorMessage}</p>}
      <button
        onClick={() => {
          // Add logic to navigate back home
        }}
      >
        Back Home
      </button>
    </div>
  );
};

export default ErrorComponent;

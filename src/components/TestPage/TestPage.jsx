import React from 'react';
import './TestPage.css';

function TestPage() {
  const uploadFileHandle = () => {
    console.log('Test Click');
  };

  return (
    <>
      <div>
        <h1>Test Page</h1>
      </div>
      <div>
        <button onClick={uploadFileHandle}>Upload File</button>
      </div>
    </>
  );
}

export default TestPage;

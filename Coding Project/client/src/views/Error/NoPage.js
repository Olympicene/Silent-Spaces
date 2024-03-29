import React from 'react'

const NoPage = () => {
  require('./NoPage.css')
  return <div className='main'>
            <div style={{textAlign : 'center'}}>
              <h1 style={{fontSize : 100, marginBottom : 0}}>404</h1>
              <h2>Page Not Found</h2>
            </div>
        </div>
};
  
export default NoPage;
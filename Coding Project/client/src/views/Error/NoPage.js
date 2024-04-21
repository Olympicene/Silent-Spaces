import React from 'react'
import styles from './Error.module.css'

const NoPage = () => {
  return <div className={styles['main']}>
            <div style={{textAlign : 'center'}}>
              <h1 style={{fontSize : 100, marginBottom : 0}}>404</h1>
              <h2>Page Not Found</h2>
            </div>
        </div>
};
  
export default NoPage;
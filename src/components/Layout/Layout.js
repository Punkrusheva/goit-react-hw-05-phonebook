import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';

function Layout({ children}) {
    return (
            <div className={styles.layout} >
                <h1> </h1>
                {children}
            </div>)
}

Layout.defaultProps = {
  title: '',
  children: '',
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};


export default Layout;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Navigation from './pages/Navigation';

const App = () => {

  /** 
   * import SqlClient from './CommonClient/SqlClient/SqlClient'
   * client вызывает автоматический коннект к бд, дельше через client вызываем нужный метод 
   * 
   * const client = SqlClient();
   * const test = () => {client.get('*','USER')};
   */



  return (
    <>
   <Navigation/>
   </>
  );
};


export default App;

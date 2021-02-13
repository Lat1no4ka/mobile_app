/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import Navigation from './navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Appbar } from 'react-native-paper';
import Header from './header';

const Tab = createBottomTabNavigator();

const App = () => {

  /** 
   * import SqlClient from './CommonClient/SqlClient/SqlClient'
   * client вызывает автоматический коннект к бд, дельше через client вызываем нужный метод 
   * 
   * const client = SqlClient();
   * const test = () => {client.get('*','USER')};
   */

  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <>
    <Header/>
   <Navigation/>
   </>
  );
};


export default App;

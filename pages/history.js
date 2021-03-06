import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HistoryDetails from "./components/historyComponent/HistoryDetails";
import HistoryList from "./components/historyComponent/HistoryList";
import Result from "./components/productComponent/Result";

const Stack = createStackNavigator();

const HistoryScreen = () => {

  return (
    <>

      <Stack.Navigator initialRouteName="История">
        <Stack.Screen name="История" component={HistoryList} />
        <Stack.Screen name="Элемент" component={HistoryDetails} />
        <Stack.Screen name="Перерасчет" component={Result} />
      </Stack.Navigator>

    </>
  );
};

export default HistoryScreen;
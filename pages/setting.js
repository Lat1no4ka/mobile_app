
    import React from 'react';
    import { createStackNavigator } from '@react-navigation/stack';
import GetSettings from './components/settingComponent/GetSettings';
import ValueNutricial from './components/settingComponent/ValueNutricial';
import ConsumptionRates from './components/settingComponent/ConsumptionRates';


const SettingScreen = () => {

      
    const Stack = createStackNavigator();
  
   
    
        return (
            <Stack.Navigator initialRouteName="Настройки">
                <Stack.Screen name="Настройки" component={GetSettings} />
                <Stack.Screen name="Ценность" component={ValueNutricial} />
                <Stack.Screen name="Нормы" component={ConsumptionRates} />
                { /*<Stack.Screen name="Расчет" component={Calculations} />*/}
            </Stack.Navigator>
        );
    };
    
    
  
  
  export default SettingScreen;
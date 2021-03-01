
    import React from 'react';
    import { createStackNavigator } from '@react-navigation/stack';
import GetSettings from './components/settingComponent/GetSettings';
import ValueNutricial from './components/settingComponent/ValueNutricial';
import ConsumptionRates from './components/settingComponent/ConsumptionRates';
import ChangeValue from './components/settingComponent/ChangeValue';
import Discard from './components/settingComponent/Discard';


const SettingScreen = () => {

      
    const Stack = createStackNavigator();
  
   
    
        return (
            <Stack.Navigator initialRouteName="Настройки">
                <Stack.Screen name="Настройки" component={GetSettings} />
                <Stack.Screen name="Пищевая ценность продуктов" component={ValueNutricial} />
                <Stack.Screen name="Нормы суточного потребления" component={ConsumptionRates} />
                <Stack.Screen name="Изменение содержимого" component={ChangeValue} />
                <Stack.Screen name="Сброс" component={Discard}/>
            </Stack.Navigator>
        );
    };
    
    
  
  
  export default SettingScreen;
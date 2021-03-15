
    import React from 'react';
    import { createStackNavigator } from '@react-navigation/stack';
import GetSettings from './components/settingComponent/GetSettings';
import ValueNutricial from './components/settingComponent/ValueNutricial';
import ConsumptionRates from './components/settingComponent/ConsumptionRates';
import ChangeValue from './components/settingComponent/ChangeValue';
import NewProduct from './components/settingComponent/NewProduct';
import ChangeRates from './components/settingComponent/ChangeRates';



const SettingScreen = () => {

      
    const Stack = createStackNavigator();
  
   
    
        return (
            <Stack.Navigator initialRouteName="Настройки">
                <Stack.Screen name="Настройки" component={GetSettings} />
                <Stack.Screen name="Пищевая ценность продуктов" component={ValueNutricial} />
                <Stack.Screen name="Нормы суточного потребления" component={ConsumptionRates} />
                <Stack.Screen name="Изменение содержимого" component={ChangeValue} />
                <Stack.Screen name="Новый продукт" component={NewProduct} />
                <Stack.Screen name="Норма суточного потребления" component={ChangeRates} />
            </Stack.Navigator>
        );
    };
    
    
  
  
  export default SettingScreen;
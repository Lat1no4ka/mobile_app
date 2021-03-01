import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';


const ValueNutricial = ({navigation}) => {

  
  return(

    <View style={styles.Container}>
        
            <Button
                icon="create"
                mode="contained"
                style={styles.Buttons}
                onPress={() => navigation.navigate('Изменение содержимого',{})}>
                Изменение содержимого
            </Button>
            
            <Button
                icon="refresh-circle"
                mode="contained"
                
                style={styles.Buttons}
                onPress={() => navigation.navigate('Сброс',{})}>
                Сброс
            </Button>
        </View>
        
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 0.13,
        flexDirection: 'column',
        justifyContent: 'space-between',
        
      },
      Buttons: {
    
      }
});
  
  export default ValueNutricial;
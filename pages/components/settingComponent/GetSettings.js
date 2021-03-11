import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';




const GetSettings = ({ navigation }) => {
    return(

    <View style={styles.Container}>
        
            <Button
                icon="open"
                mode="contained"
                style={styles.Buttons}
                onPress={() => navigation.navigate('Пищевая ценность продуктов',{})}>
                Пищевая ценность продуктов
            </Button>
            
            <Button
                icon="open"
                mode="contained"
                
                style={styles.Buttons}
                onPress={() => navigation.navigate('Нормы суточного потребления',{})}>
                Нормы суточного потребления
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

export default GetSettings





       
  

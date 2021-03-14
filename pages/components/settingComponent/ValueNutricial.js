import React, {useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native'
import { TextInput, List, Button } from 'react-native-paper';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';


const ValueNutricial = ({navigation}) => {

    const [client] = useState(SqlClient());
   
 
    const refreshData = async () => {
      await client.ExecuteQuery(`DELETE FROM PRODUCT;`);  
      //console.log("delete");
      await client.ExecuteQuery(`INSERT INTO PRODUCT
                                 SELECT * from PRODUCTBACKUP;`);
                               //console.log("insert")
                               navigation.navigate('Настройки', {})
    }

    const buttonAlert = () =>
    Alert.alert(
      "ВНИМАНИЕ",
      "Вы уверены, что хотите сбросить все табличные значения до заводских?",
      [
        {
          text: "Отмена",
          //onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Подтвердить", onPress: () => refreshData() }
      ]
    );

  
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
                onPress={() => buttonAlert()}>
                Сброс
            </Button>
        </View>
        
    )
}
const styles = StyleSheet.create({
    Container: {
      flex: 0.15,
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginLeft:20,
      marginRight: 20,
      marginTop: 10
      },
      Buttons: {
    
      }
});
  
  export default ValueNutricial;
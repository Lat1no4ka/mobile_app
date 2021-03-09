import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native'
import { TextInput, List, Button } from 'react-native-paper';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';


const ValueNutricial = ({navigation}) => {

    const [client] = useState(SqlClient());
   
 
    const refreshData = async () => {
      await client.ExecuteQuery(`DELETE FROM PRODUCT;`);  
      //console.log("delete");
      await client.ExecuteQuery(`INSERT INTO PRODUCT
                                 SELECT * from PRODUCTBACKUP;`);
                              // console.log("insert")
    }

  
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
                onPress={() => refreshData()}>
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
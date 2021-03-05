import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native'
import { TextInput, List, Button } from 'react-native-paper';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';



const Discard = () => {

  const [client] = useState(SqlClient());
   
 
  const refreshData = async () => {
    await client.ExecuteQuery(`DELETE FROM PRODUCT;`);  
    console.log("delete");
    await client.ExecuteQuery(`INSERT INTO PRODUCT
                               SELECT * from PRODUCTBACKUP;`);
                             console.log("insert")
}
  return(
          <View>
                <Button
                            mode="contained"
                            style={styles.button}
                            onPress={() => refreshData()}>
                            Сбросить данные
                </Button>
          </View>
  )
};          
const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-end',
    },
});

  
  

  
  
  export default Discard;
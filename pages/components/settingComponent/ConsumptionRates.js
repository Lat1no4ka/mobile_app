import React, {useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native'
import { TextInput, List, Button } from 'react-native-paper';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';

const ConsumptionRates = ({navigation}) => {

  const [client] = useState(SqlClient());
   
 
  const refreshDaily = async () => {
    await client.ExecuteQuery(`DELETE FROM DAILY_RATE;`);  
    //console.log("delete");
    await client.ExecuteQuery(`INSERT INTO DAILY_RATE
                               SELECT * from DAILY_RATE_BACKUP;`);
                            //console.log("insert")
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
      { text: "Подтвердить", onPress: () => refreshDaily() }
    ]
  );


return(

  <View style={styles.Container}>
      
          <Button
              icon="create"
              mode="contained"
              style={styles.Buttons}
              onPress={() => navigation.navigate('Рекомендуемый уровень',{})}>
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
  export default ConsumptionRates;
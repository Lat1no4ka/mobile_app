import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions, FlatList,ScrollView, Alert } from 'react-native';
import { TextInput, List, Button } from 'react-native-paper';
import { Row } from 'react-native-table-component';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';

const ChangeRates = () => {


  const [client, setClient] = useState(SqlClient());
  const [protein, setProtein] = useState();
  const [fats, setFats] = useState();
  const [carbohydrates, setСarbohydrates] = useState();
  const [alimentaryfiber, setAlimentaryFiber] = useState();
  const [potassium, setPotassium] = useState();
  const [calcium, setCalcium] = useState();
  const [magnesium, setMagnesium] = useState();
  const [phosphorus, setPhosphorus] = useState();
  const [iron, setIron] = useState();
  const [vitamina, setVitaminA] = useState();
  const [vitaminbone, setVitaminBone] = useState();
  const [vitaminbtwo, setVitaminBtwo] = useState();
  const [vitaminpp, setVitaminPP] = useState();
  const [vitaminc, setVitaminC] = useState();
  const [vitamine, setVitaminE] = useState();
  const [energyvalue, setEnergyvalue] = useState(); 

  const updateData = async (table, param) => {
    if (param != null) {

        
  await client.ExecuteQuery(`UPDATE DAILY_RATE
  SET '${table}' = '${Number (param)}';`)
  //console.log("update");
 }
    else {
        Alert.alert("Ошибка",
        "Поле пустое")
    }
}


 return (
          <>  
              <ScrollView>
              
                  <TextInput
                      label="Белки, г"
                      value={protein}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={protein => setProtein(protein)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("protein",protein)}>
                          Применить
                        </Button>
              </View>
                  <TextInput
                      label="Жиры, г"
                      value={fats}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={fats => setFats(fats)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("fats", fats)}>
                          Применить
                        </Button>
              </View>
                  <TextInput
                      label="Углеводы, г"
                      value={carbohydrates}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={carbohydrates => setСarbohydrates(carbohydrates)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                  <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => updateData("carbohydrates", carbohydrates)}>
                    Применить
                  </Button>
        </View>
                  <TextInput
                      label="Пищевые волокна, г"
                      value={alimentaryfiber}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={alimentaryfiber => setAlimentaryFiber(alimentaryfiber)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("alimentary_fiber", alimentaryfiber)}>
                          Применить
                        </Button>
              </View>
                  <TextInput
                      label="Калий, мг"
                      value={potassium}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={potassium => setPotassium(potassium)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                  <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => updateData("potassium", potassium)}>
                    Применить
                  </Button>
        </View>
                  <TextInput
                      label="Кальций, мг"
                      value={calcium}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={calcium => setCalcium(calcium)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("calcium", calcium)}>
                          Применить
                        </Button>
              </View>
                  <TextInput
                      label="Магний, мг"
                      value={magnesium}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={magnesium => setMagnesium(magnesium)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("magnesium", magnesium)}>
                          Применить
                        </Button>
              </View>
                  <TextInput
                      label="Фосфор, мг"
                      value={phosphorus}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={phosphorus => setPhosphorus(phosphorus)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("phosphorus", phosphorus)}>
                          Применить
                        </Button>
              </View>
                  <TextInput
                      label="Железо, мг"
                      value={iron}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={iron => setIron(iron)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("iron", iron)}>
                          Применить
                        </Button>
              </View>
                  <TextInput
                      label="Витамин А, мкг"
                      value={vitamina}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={vitamina => setVitaminA(vitamina)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("vitamin_a", vitamina)}>
                          Применить
                        </Button>
              </View>
                  <TextInput
                      label="Витамин В1, мг"
                      value={vitaminbone}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={vitaminbone => setVitaminBone(vitaminbone)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("vitamin_b1", vitaminbone)}>
                          Применить
                        </Button>
              </View>
                  <TextInput
                      label="Витамин В2, мг"
                      value={vitaminbtwo}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={vitaminbtwo => setVitaminBtwo(vitaminbtwo)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("vitamin_b2", vitaminbtwo)}>
                          Применить
                        </Button>
              </View>
                  <TextInput
                      label="Витамин РР, мг"
                      value={vitaminpp}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={vitaminpp => setVitaminPP(vitaminpp)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                  <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => updateData("vitamin_pp", vitaminpp)}>
                    Применить
                  </Button>
        </View>
                  <TextInput
                      label="Витамин С, мг"
                      value={vitaminc}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={vitaminc => setVitaminC(vitaminc)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("vitamin_c", vitaminc)}>
                          Применить
                        </Button>
              </View>
                  <TextInput
                      label="Витамин Е, мг"
                      value={vitamine}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={vitamine => setVitaminE(vitamine)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("vitamin_e", vitamine)}>
                          Применить
                        </Button>
              </View>
                  <TextInput
                      label="Килокалории, ккал"
                      value={energyvalue}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={energyvalue => setEnergyvalue(energyvalue)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <View style={styles.containerWithBtn}>
                        <Button
                          mode="contained"
                          style={styles.button}
                          onPress={() => updateData("energy_value", energyvalue)}>
                          Применить
                        </Button>
                        
                  </View>
              </ScrollView>
          </>
      )
 }

 const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
      marginRight: 20,
      marginLeft: 20,
      marginTop: height * 0.15
  },
  textInput: {
    
      marginRight: 180,
      marginLeft: 20,
      marginTop: 10
  },
  serachView: {
      marginRight: 20,
      marginLeft: 20,
      maxHeight: height * 0.4
  },
  renderItem:
  {
      marginRight: 20,
      marginLeft: 20,
      color: 'black',
      padding: 10,
  },
  button: {
    marginLeft: 225,
      width: 150,
      height: 40,
      marginTop: -60,

  },
  containerWithBtn: {
      justifyContent: 'center',
      alignItems: 'center'
  }


});

  export default ChangeRates;
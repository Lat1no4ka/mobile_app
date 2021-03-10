import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList,ScrollView, Alert } from 'react-native';
import { TextInput, List, Button } from 'react-native-paper';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';

const ChangeValue = ({route, navigation}) => {

  
  const [id, setId] = useState('');
  const [text, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [client, setClient] = useState(SqlClient());
  const [focus, setFocus] = useState(false);
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


  
  const [searchReady, setSearchReady] = useState(false);

  //const product = route.params.product;

  const inputEl = useRef(null);

  //const name = () => { client.getProduct('name', 'PRODUCT').finally((res)=>{console.log(res)}) };

  useEffect(() => {
      searchList(text);
  }, [text]);

  const searchList = (search) => {

      if (search.length > 0) {
          getData(search);
      } else {
          setSearch('');
          setData([]);
      }
  }

  const getData = async (param) => {
      let product = [];
      let selectQuery = await client.ExecuteQuery(`SELECT id,product_name FROM PRODUCT 
                                                  WHERE product_name LIKE '%${param}%' LIMIT 10`, []);
                                                  console.log(param);
      var rows = selectQuery.rows;
      for (let i = 0; i < rows.length; i++) {
          let value = rows.item(i).product_name;
          let id = rows.item(i).id;
          product.push({ "id": id.toString(), 'name': value });
      }
      console.log(product);
      setData(product);
  }




  
const updateData = async () => {
    if ((protein || fats || carbohydrates || alimentaryfiber || potassium || calcium || magnesium || phosphorus || iron || vitamina || vitaminbone ||
        vitaminbtwo || vitaminpp || vitaminc || vitamine || energyvalue) != null) {

        
  await client.ExecuteQuery(`UPDATE PRODUCT
  SET protein = '${Number (protein)}', fats = '${Number (fats)}', carbohydrates = '${Number (carbohydrates)}', 
  alimentary_fiber = '${Number (alimentaryfiber)}', potassium =  '${Number (potassium)}', 
  calcium = '${Number (calcium)}', magnesium = '${Number (magnesium)}', phosphorus = '${Number (phosphorus)}',
  iron = '${Number (iron)}', vitamin_a = '${Number (vitamina)}', vitamin_b1 = '${Number (vitaminbone)}', 
  vitamin_b2 = '${Number (vitaminbtwo)}', vitamin_pp = '${Number (vitaminpp)}', vitamin_c = '${Number (vitaminc)}', 
  vitamin_e = '${Number (vitamine)}', energy_value = '${Number (energyvalue)}'
  WHERE id = '${id}';`)
// product.push(data);
//console.log(protein, fats, carbohydrates, alimentaryfiber, potassium, calcium, magnesium, phosphorus, iron, vitamina, vitaminbone, vitaminbtwo, vitaminpp, vitaminc, vitamine, energyvalue);
    }
    else {
        Alert.alert("Ошибка",
        "Введите все значения!")
    }
}


  const onItemHendler = (id, name) => {
      setId(id);
      setSearch(name);
      setFocus(false);
      setSearchReady(true);
      inputEl.current.blur();
  }

  const renderItem = ({ item }) => (

      <List.Item
          title={item.name}
          onPress={() => onItemHendler(item.id, item.name)}
      />

  )

  if (data.length > 0 && focus) {
      return (
          <>
              <TextInput
                  label="Введите название продукта"
                  mode='outlined'
                  ref={inputEl}
                  style={styles.container}
                  onChangeText={text => setSearch(text)}
                  onFocus={() => setFocus(true)}
                  value={text}
                  theme={{ colors: { primary: 'blue' } }}
              />


              <SafeAreaView style={styles.serachView} >
                  <FlatList
                      keyboardShouldPersistTaps='handled'
                      data={data}
                      renderItem={renderItem}
                  />

              </SafeAreaView>

          </>
      );
  } else if (searchReady) {
      return (
          <>
              <ScrollView>
                  <TextInput
                      label="Введите название продукта"
                      value={text}
                      mode='outlined'
                      style={styles.container}
                      onChangeText={text => setSearch(text)}
                      onFocus={() => setFocus(true)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу белков, г."
                      value={protein}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={protein => setProtein(protein)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу жиров, г."
                      value={fats}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={fats => setFats(fats)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу углеводов, г."
                      value={carbohydrates}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={carbohydrates => setСarbohydrates(carbohydrates)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу пищевых волокон, г."
                      value={alimentaryfiber}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={alimentaryfiber => setAlimentaryFiber(alimentaryfiber)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу калия, мг."
                      value={potassium}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={potassium => setPotassium(potassium)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу кальция, мг."
                      value={calcium}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={calcium => setCalcium(calcium)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу магния, мг."
                      value={magnesium}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={magnesium => setMagnesium(magnesium)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу фосфора, мг."
                      value={phosphorus}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={phosphorus => setPhosphorus(phosphorus)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу железа, мг."
                      value={iron}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={iron => setIron(iron)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу витамина А, мкг."
                      value={vitamina}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={vitamina => setVitaminA(vitamina)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу витамина В1, мг."
                      value={vitaminbone}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={vitaminbone => setVitaminBone(vitaminbone)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу витамина В2, мг."
                      value={vitaminbtwo}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={vitaminbtwo => setVitaminBtwo(vitaminbtwo)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу витамина РР, мг."
                      value={vitaminpp}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={vitaminpp => setVitaminPP(vitaminpp)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу витамина С, мг."
                      value={vitaminc}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={vitaminc => setVitaminC(vitaminc)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите массу витамина Е, мг."
                      value={vitamine}
                      keyboardType='numeric'
                      mode='outlined'
                      style={styles.textInput}
                      onChangeText={vitamine => setVitaminE(vitamine)}
                      theme={{ colors: { primary: 'blue' } }}
                  />
                  <TextInput
                      label="Введите колличество килокалорий, ккал."
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
                          onPress={() => updateData()}>
                          Применить
                        </Button>
                        
                  </View>
              </ScrollView>
          </>
      )
  } else if (data.length <= 0 || !focus) {
      return (
        <ScrollView>
          <TextInput
              label="Введите название продукта"
              value={text}
              mode='outlined'
              style={styles.container}
              onChangeText={text => setSearch(text)}
              onFocus={() => setFocus(true)}
              theme={{ colors: { primary: 'blue' } }}
          />
          <View style={styles.containerWithBtn}>
          <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Новый продукт',{})}>
          Новый продукт 
          </Button>
          </View>
      </ScrollView>
      )

  }

};
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
      marginRight: 20,
      marginLeft: 20,
      marginTop: height * 0.15
  },
  textInput: {
      marginRight: 20,
      marginLeft: 20,
      marginTop: 20
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
      width: 190,
      height: 40,
      margin: 20,

  },
  containerWithBtn: {
      justifyContent: 'center',
      alignItems: 'center'
  }


});

  
  
  export default ChangeValue;
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions, FlatList,ScrollView, Alert, Text } from 'react-native';
import { TextInput, List, Button } from 'react-native-paper';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';

const NewProduct = ({navigation}) => {


  const [client, setClient] = useState(SqlClient());

  const [text, setSearch] = useState();
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



  const newData = async () => {
    if ((text || protein || fats || carbohydrates || alimentaryfiber || potassium || calcium || magnesium || phosphorus || iron || vitamina || vitaminbone ||
        vitaminbtwo || vitaminpp || vitaminc || vitamine || energyvalue) != null) {
           // console.log(text, protein, fats, carbohydrates, alimentaryfiber, potassium, calcium, magnesium, phosphorus, iron, vitamina, vitaminbone, vitaminbtwo, vitaminpp, vitaminc, vitamine, energyvalue);
        //console.log(typeof(text));
        //await client.ExecuteQuery(`INSERT INTO PRODUCT (product_name)
        //VALUES ('deftest');`)
 await client.ExecuteQuery(`INSERT INTO PRODUCT (product_name, protein, fats, carbohydrates, alimentary_fiber, potassium, 
  calcium, magnesium, phosphorus, iron, vitamin_a, vitamin_b1, vitamin_b2, vitamin_pp, vitamin_c, vitamin_e, energy_value)
  VALUES ('${text}', '${Number (protein)}', '${Number (fats)}', '${Number (carbohydrates)}', '${Number (alimentaryfiber)}', '${Number (potassium)}',
   '${Number (calcium)}', '${Number (magnesium)}', '${Number (phosphorus)}', '${Number (iron)}', '${Number (vitamina)}', '${Number (vitaminbone)}', 
  '${Number (vitaminbtwo)}', '${Number (vitaminpp)}', '${Number (vitaminc)}', '${Number (vitamine)}', '${Number (energyvalue)}'  );`)
//console.log("insert into");
// product.push(data);
 navigation.navigate('Настройки',{});
    }
    else {
        Alert.alert("Ошибка",
        "Введите все значения!")
    }
}


    return (
        <>
        <ScrollView>
        <Text style={styles.innerText}> Вводится содержание пищевых веществ в 100 граммах продукта</Text>

            <TextInput
                label="Введите название продукта"
                value={text}
                mode='outlined'
                style={styles.textInput}
                onChangeText={text => setSearch(text)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу белков, г"
                value={protein}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={protein => setProtein(protein)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу жиров, г"
                value={fats}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={fats => setFats(fats)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу углеводов, г"
                value={carbohydrates}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={carbohydrates => setСarbohydrates(carbohydrates)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу пищевых волокон, г"
                value={alimentaryfiber}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={alimentaryfiber => setAlimentaryFiber(alimentaryfiber)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу калия, мг"
                value={potassium}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={potassium => setPotassium(potassium)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу кальция, мг"
                value={calcium}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={calcium => setCalcium(calcium)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу магния, мг"
                value={magnesium}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={magnesium => setMagnesium(magnesium)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу фосфора, мг"
                value={phosphorus}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={phosphorus => setPhosphorus(phosphorus)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу железа, мг"
                value={iron}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={iron => setIron(iron)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу витамина А, мкг"
                value={vitamina}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={vitamina => setVitaminA(vitamina)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу витамина В1, мг"
                value={vitaminbone}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={vitaminbone => setVitaminBone(vitaminbone)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу витамина В2, мг"
                value={vitaminbtwo}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={vitaminbtwo => setVitaminBtwo(vitaminbtwo)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу витамина РР, мг"
                value={vitaminpp}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={vitaminpp => setVitaminPP(vitaminpp)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу витамина С, мг"
                value={vitaminc}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={vitaminc => setVitaminC(vitaminc)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите массу витамина Е, мг"
                value={vitamine}
                keyboardType='numeric'
                mode='outlined'
                style={styles.textInput}
                onChangeText={vitamine => setVitaminE(vitamine)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <TextInput
                label="Введите колличество килокалорий, ккал"
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
                    onPress={() => newData()}>
                    Применить
                  </Button>
                  
            </View>
        </ScrollView>
    </>
    );
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
      backgroundColor:"blue",
      width: 190,
      height: 40,
      margin: 20,

  },
  containerWithBtn: {
      justifyContent: 'center',
      alignItems: 'center'
  },
  innerText: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 22
  }
});
  
  
  export default NewProduct;
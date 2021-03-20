import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';



const AboutApp = ({ navigation }) => {



    return(

<View style={styles.Container}>
    <Text style={styles.baseText}>  
      Данное приложение рассчитывает стоимость пищевых веществ, содержащихся в разных видах продукции.{'\n'}
      {'\n'}
    <Text style={styles.innerText}>HATHELNUT </Text>
    был разработан студентами на базе ФГБОУ ВО "КемГУ" из кафедры ЮНЕСКО по информационным вычислительным технологиям
     и кафедры технологии и организации общественного питания{'\n'}
     {'\n'}
     <Text style={styles.innerText}>РАЗРАБОТЧИКИ: </Text>
     {'\n'}

     Дашков Артём Вадимович
     {'\n'}

     Корольков Артём Сергеевич    
      {'\n'}
     Котышев Максим Юрьевич
     {'\n'}
     {'\n'}
     <Text style={styles.innerText}>УЧАСТНИКИ: </Text>
     {'\n'}
     Куракин Михаил Сергеевич
     {'\n'}

     Коммисарова Анна Леонидовна
    </Text>
    
    </View>

)

}
const styles = StyleSheet.create({
    Container: {
        flex: 0.22,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft:20,
        marginRight: 20,
        marginTop: 20
      },
      baseText: {
        textAlign: 'justify',

        fontWeight: 'bold',
        color: 'gray'

      },
      innerText: {
        fontWeight: 'bold',
        color: 'black'
      },
      Buttons:{
          backgroundColor:"#0000FF"
      }
});

export default AboutApp

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';

function Composition({ route, navigation }) {
    const [protein, setProtein] = useState(false);
    const [fat, setFat] = useState(false);
    const [carbohydrates, setCarbohydrates] = useState(false);
    const [alimentaryFiber, setFiber] = useState(false);
    const [potassium, setPotassium] = useState(false);
    const [calcium, setCalcium] = useState(false);
    const [magnesium, setMagnesium] = useState(false);
    const [phosphorus, setPhosphorus] = useState(false);
    const [iron, setIron] = useState(false);
    const [vitaminA, setVitaminA] = useState(false);
    const [vitaminB1, setVitaminB1] = useState(false);
    const [vitaminB2, setVitaminB2] = useState(false);
    const [vitaminPP, setVitaminPP] = useState(false);
    const [vitaminC, setVitaminC] = useState(false);
    const [vitaminE, setVitaminE] = useState(false);
    const [energyValue, setEnergy] = useState(false);
    const [data, setParams] = useState(route.params.product);
    const [messages, setMessages] = useState("");

    React.useEffect(() => {
    }, [messages]);

    const checkedItem = [
        protein ? { "name": 'Белки', "key": "protein" } : null,
        fat ? { "name": 'Жиры', "key": "fats" } : null,
        carbohydrates ? { "name": 'Углеводы', "key": "carbohydrates" } : null,
        alimentaryFiber ? { "name": 'Пищевые волокна', "key": "alimentary_fiber" } : null,
        potassium ? { "name": 'Калий', "key": "potassium" } : null,
        calcium ? { "name": 'Кальций', "key": "calcium" } : null,
        magnesium ? { "name": 'Магний', "key": "magnesium" } : null,
        phosphorus ? { "name": 'Фосфор', "key": "phosphorus" } : null,
        iron ? { "name": 'Железо', "key": "iron" } : null,
        vitaminA ? { "name": 'Витамин A', "key": "vitamin_a" } : null,
        vitaminB1 ? { "name": 'Витамин B1', "key": "vitamin_b1" } : null,
        vitaminB2 ? { "name": 'Витамин B2', "key": "vitamin_b2" } : null,
        vitaminPP ? { "name": 'Витамин PP', "key": "vitamin_pp" } : null,
        vitaminC ? { "name": 'Витамин C', "key": "vitamin_c" } : null,
        vitaminE ? { "name": 'Витамин Е', "key": "vitamin_e" } : null,
        energyValue ? { "name": 'Энергетическая ценность', "key": "energy_value" } : null,
    ];

    const nextPage = () => {
        if (checkedItem.every(elem => elem == null)) {
            setMessages("Выбирете хотя бы один нутриент")
        } else {
            addIntoHystory();
            setMessages("")
            navigation.navigate('Расчет', {
                data, checkedItem
            })
        }
    };

    const addIntoHystory = async () => {
        let client = SqlClient();
        let selectQuery = await client.ExecuteQuery(`INSERT INTO HISTORY ( products, nutrient ) 
                                                   VALUES ('${JSON.stringify(data)}','${JSON.stringify(checkedItem)}')`, []);

        //selectQuery = await client.ExecuteQuery(`select * from HISTORY`, []);
        //var rows = selectQuery.rows;
        //for (let i = 0; i < rows.length; i++) {
        //console.log('-------------');
        //console.log(JSON.parse(rows.item(i).products));
        //console.log(JSON.parse(rows.item(i).nutrient));
        //console.log('-------------');
        //}
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Белки, г" status={protein ? 'checked' : 'unchecked'} onPress={() => setProtein(!protein)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Жиры, г" status={fat ? 'checked' : 'unchecked'} onPress={() => setFat(!fat)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Углеводы, г" status={carbohydrates ? 'checked' : 'unchecked'} onPress={() => setCarbohydrates(!carbohydrates)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Пищевые волокна, г" status={alimentaryFiber ? 'checked' : 'unchecked'} onPress={() => setFiber(!alimentaryFiber)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Калий, мг" status={potassium ? 'checked' : 'unchecked'} onPress={() => setPotassium(!potassium)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Кальций, мг" status={calcium ? 'checked' : 'unchecked'} onPress={() => setCalcium(!calcium)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Магний, мг" status={magnesium ? 'checked' : 'unchecked'} onPress={() => setMagnesium(!magnesium)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Фосфор, мг" status={phosphorus ? 'checked' : 'unchecked'} onPress={() => setPhosphorus(!phosphorus)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Железо, мг" status={iron ? 'checked' : 'unchecked'} onPress={() => setIron(!iron)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Витамин A, мкг" status={vitaminA ? 'checked' : 'unchecked'} onPress={() => setVitaminA(!vitaminA)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Витамин B1, мг" status={vitaminB1 ? 'checked' : 'unchecked'} onPress={() => setVitaminB1(!vitaminB1)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Витамин B2, мг" status={vitaminB2 ? 'checked' : 'unchecked'} onPress={() => setVitaminB2(!vitaminB2)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Витамин PP, мг" status={vitaminPP ? 'checked' : 'unchecked'} onPress={() => setVitaminPP(!vitaminPP)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Витамин C, мг" status={vitaminC ? 'checked' : 'unchecked'} onPress={() => setVitaminC(!vitaminC)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Витамин Е, мг" status={vitaminE ? 'checked' : 'unchecked'} onPress={() => setVitaminE(!vitaminE)} style={styles.checkBox} />
                <Checkbox.Item theme={{ colors: { primary: 'black' } }} labelStyle={{ fontSize: 17 }} color={"blue"} label="Энергетическая ценность, ккал" status={energyValue ? 'checked' : 'unchecked'} onPress={() => setEnergy(!energyValue)} style={styles.checkBox} />
            </View>
            <Text style={{ textAlign: "center", margin: 10, color: "red" }}>{messages}</Text>
            <View style={styles.containerWithBtn}>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => nextPage()}>
                    Расчитать
                </Button>
            </View>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        marginLeft: 20,
    },
    checkBox: {

    },
    containerWithBtn: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        margin: 20,
        marginTop: 0,
        backgroundColor: "blue"
    },
    lable: {
        fontSize: 16,
    }
})
export default Composition;
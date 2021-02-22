
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';


function Composition({ route, navigation }) {
    const [protein, setProtein] = useState(false);
    const [fat, setFat] = useState(false);
    const [carbohydrates, setCarbohydrates] = useState(false);
    const [alimentaryFiber, setFiber] = useState(false);
    const [potassium,setPotassium] = useState(false);
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

    const checkedItem = [
        protein ? 'Белки' : null,
        fat ? 'Жиры' : null,
        carbohydrates ? 'Углеводы' : null,
        alimentaryFiber ? 'Пищевые волокна' : null,
        potassium ? 'Калий' : null,
        calcium ? 'Кальций' : null,
        magnesium ? 'Магний' : null,
        phosphorus ? 'Фосфор' : null,
        iron ? 'Железо' : null,
        vitaminA ? 'Витамин A' : null,
        vitaminB1 ? 'Витамин B1' : null,
        vitaminB2 ? 'Витамин B2' : null,
        vitaminPP ? 'Витамин PP' : null,
        vitaminC ? 'Витамин C' : null,
        vitaminE ? 'Витамин Е' : null,
        energyValue ? 'Энергетическая ценность' : null,
    ];



    return (
        <ScrollView>
            <View style={styles.container}>
                <Checkbox.Item label="Белки, г" status={protein ? 'checked' : 'unchecked'} onPress={() => setProtein(!protein)} style={styles.checkBox} />
                <Checkbox.Item label="Жиры, г" status={fat ? 'checked' : 'unchecked'} onPress={() => setFat(!fat)} style={styles.checkBox} />
                <Checkbox.Item label="Углеводы, г" status={carbohydrates ? 'checked' : 'unchecked'} onPress={() => setCarbohydrates(!carbohydrates)} style={styles.checkBox} />
                <Checkbox.Item label="Пищевые волокна, г" status={alimentaryFiber ? 'checked' : 'unchecked'} onPress={() => setFiber(!alimentaryFiber)} style={styles.checkBox} />
                <Checkbox.Item label="Калий, мг" status={potassium ? 'checked' : 'unchecked'} onPress={() =>setPotassium(!potassium)} style={styles.checkBox} />
                <Checkbox.Item label="Кальций, мг" status={calcium ? 'checked' : 'unchecked'} onPress={() => setCalcium(!calcium)} style={styles.checkBox} />
                <Checkbox.Item label="Магний, мг" status={magnesium ? 'checked' : 'unchecked'} onPress={() => setMagnesium(!magnesium)} style={styles.checkBox} />
                <Checkbox.Item label="Фосфор, мг" status={phosphorus ? 'checked' : 'unchecked'} onPress={() => setPhosphorus(!phosphorus)} style={styles.checkBox} />
                <Checkbox.Item label="Железо, мг" status={iron ? 'checked' : 'unchecked'} onPress={() => setIron(!iron)} style={styles.checkBox} />
                <Checkbox.Item label="Витамин A, мкг" status={vitaminA ? 'checked' : 'unchecked'} onPress={() => setVitaminA(!vitaminA)} style={styles.checkBox} />
                <Checkbox.Item label="Витамин B1, мг" status={vitaminB1 ? 'checked' : 'unchecked'} onPress={() => setVitaminB1(!vitaminB1)} style={styles.checkBox} />
                <Checkbox.Item label="Витамин B2, мг" status={vitaminB2 ? 'checked' : 'unchecked'} onPress={() => setVitaminB2(!vitaminB2)} style={styles.checkBox} />
                <Checkbox.Item label="Витамин PP, мг" status={vitaminPP ? 'checked' : 'unchecked'} onPress={() => setVitaminPP(!vitaminPP)} style={styles.checkBox} />
                <Checkbox.Item label="Витамин C, мг" status={vitaminC ? 'checked' : 'unchecked'} onPress={() => setVitaminC(!vitaminC)} style={styles.checkBox} />
                <Checkbox.Item label="Витамин Е, мг" status={vitaminE ? 'checked' : 'unchecked'} onPress={() => setVitaminE(!vitaminE)} style={styles.checkBox} />
                <Checkbox.Item label="Энергетическая ценность, ккал" status={energyValue ? 'checked' : 'unchecked'} onPress={() => setEnergy(!energyValue)} style={styles.checkBox} />
            </View>

            <View style={styles.containerWithBtn}>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => navigation.navigate('Расчет', {
                        data, checkedItem
                    })}>
                    Дальше
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
    }
})
export default Composition;
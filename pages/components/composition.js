
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';


function Composition({ route, navigation }) {
    const [protein, setProtein] = useState(false);
    const [fat, setFat] = useState(false);
    const [carbohyd, setCarbohyd] = useState(false);
    const [alim_fiber, setFiber] = useState(false);
    const [k_mg, setK] = useState(false);
    const [ca_mg, setCa] = useState(false);
    const [mg_mg, setMg] = useState(false);
    const [p_mg, setP] = useState(false);
    const [fe_mg, setFe] = useState(false);
    const [vit_a_mkg, setVitA] = useState(false);
    const [vit_b1_mg, setVitB1] = useState(false);
    const [vit_b2_mg, setVitB2] = useState(false);
    const [vit_pp_mg, setVitPP] = useState(false);
    const [vit_c_mg, setVitC] = useState(false);
    const [vit_e_mg, setVitE] = useState(false);
    const [energy_value, setEnergy] = useState(false);
    const [data, setParams] = useState(route.params);

    const checkedItem = [
        protein ? 'Белки' : null,
        fat ? 'Жиры' : null,
        carbohyd ? 'Углеводы' : null,
        alim_fiber ? 'Пищевые волокна' : null,
        k_mg ? 'Калий' : null,
        ca_mg ? 'Кальций' : null,
        mg_mg ? 'Магний' : null,
        p_mg ? 'Фосфор' : null,
        fe_mg ? 'Железо' : null,
        vit_a_mkg ? 'Витамин A' : null,
        vit_b1_mg ? 'Витамин B1' : null,
        vit_b2_mg ? 'Витамин B2' : null,
        vit_pp_mg ? 'Витамин PP' : null,
        vit_c_mg ? 'Витамин C' : null,
        vit_e_mg ? 'Витамин Е' : null,
        energy_value ? 'Энергетическая ценность' : null,
    ];



    return (
        <ScrollView>
            <View style={styles.container}>
                <Checkbox.Item label="Белки" status={protein ? 'checked' : 'unchecked'} onPress={() => setProtein(!protein)} style={styles.checkBox} />
                <Checkbox.Item label="Жиры" status={fat ? 'checked' : 'unchecked'} onPress={() => setFat(!fat)} style={styles.checkBox} />
                <Checkbox.Item label="Углеводы" status={carbohyd ? 'checked' : 'unchecked'} onPress={() => setCarbohyd(!carbohyd)} style={styles.checkBox} />
                <Checkbox.Item label="Пищевые волокна" status={alim_fiber ? 'checked' : 'unchecked'} onPress={() => setFiber(!alim_fiber)} style={styles.checkBox} />
                <Checkbox.Item label="Калий" status={k_mg ? 'checked' : 'unchecked'} onPress={() => setK(!k_mg)} style={styles.checkBox} />
                <Checkbox.Item label="Кальций" status={ca_mg ? 'checked' : 'unchecked'} onPress={() => setCa(!ca_mg)} style={styles.checkBox} />
                <Checkbox.Item label="Магний" status={mg_mg ? 'checked' : 'unchecked'} onPress={() => setMg(!mg_mg)} style={styles.checkBox} />
                <Checkbox.Item label="Фосфор" status={p_mg ? 'checked' : 'unchecked'} onPress={() => setP(!p_mg)} style={styles.checkBox} />
                <Checkbox.Item label="Железо" status={fe_mg ? 'checked' : 'unchecked'} onPress={() => setFe(!fe_mg)} style={styles.checkBox} />
                <Checkbox.Item label="Витамин A" status={vit_a_mkg ? 'checked' : 'unchecked'} onPress={() => setVitA(!vit_a_mkg)} style={styles.checkBox} />
                <Checkbox.Item label="Витамин B1" status={vit_b1_mg ? 'checked' : 'unchecked'} onPress={() => setVitB1(!vit_b1_mg)} style={styles.checkBox} />
                <Checkbox.Item label="Витамин B2" status={vit_b2_mg ? 'checked' : 'unchecked'} onPress={() => setVitB2(!vit_b2_mg)} style={styles.checkBox} />
                <Checkbox.Item label="Витамин PP" status={vit_pp_mg ? 'checked' : 'unchecked'} onPress={() => setVitPP(!vit_pp_mg)} style={styles.checkBox} />
                <Checkbox.Item label="Витамин C" status={vit_c_mg ? 'checked' : 'unchecked'} onPress={() => setVitC(!vit_c_mg)} style={styles.checkBox} />
                <Checkbox.Item label="Витамин Е" status={vit_e_mg ? 'checked' : 'unchecked'} onPress={() => setVitE(!vit_e_mg)} style={styles.checkBox} />
                <Checkbox.Item label="Энергетическая ценность" status={energy_value ? 'checked' : 'unchecked'} onPress={() => setEnergy(!energy_value)} style={styles.checkBox} />
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
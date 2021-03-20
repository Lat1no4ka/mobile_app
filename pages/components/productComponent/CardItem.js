import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Card, DataTable, Button } from 'react-native-paper';
const CardItem = (props) => {

    return (
        <Card style={styles.container}>
            <Card.Title title={props.item.name} />
            <Card.Content>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title >Цена</DataTable.Title>
                        <DataTable.Title >Масса</DataTable.Title>
                        <DataTable.Title >Одна порция</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell >{props.item.price}</DataTable.Cell>
                        <DataTable.Cell >{props.item.weight}</DataTable.Cell>
                        <DataTable.Cell >{props.item.onePortion}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </Card.Content>
            <Card.Actions style={styles.delBtn}>
                <Button
                    onPress={() => props.removeItem(props.item.id)}
                >
                  <Text style={{color:"#0000FF"}}>Удалить</Text>
            </Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    table: {
        alignSelf: 'center',
    },
    delBtn: {
        alignSelf: 'flex-end',
        marginRight: 20,
    },
});

export default CardItem;
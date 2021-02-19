import React, { useState } from 'react';

import { Text } from 'react-native';


const Calculations = ({ route, navigation }) => {
    { console.log(route.params.data) }
    return (
        <>
            {route.params.data.map((item) => {
                return (
                    <>
                        <Text>Здесь будет расчет и вывод c </Text>
                        <Text>{item.name}</Text>
                        <Text>С ценой {item.price ? item.price : 0}</Text>
                        <Text>Вес {item.weight ? item.weight : 0}</Text>
                        <Text>Поцрия {item.portion ? item.portion : 0}</Text>
                        <Text>С нутриентами </Text>
                    </>
                )
            })
            }

            {
                route.params.checkedItem.map((item) => {
                    return item ? <Text> {item} </Text> : null
                })
            }

        </>
    );
};


export default Calculations;
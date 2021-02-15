import React, { useState } from 'react';

import { Text } from 'react-native';

const Calculations = ({ route, navigation }) => {
    { console.log(route) }
    return (
        <>
            <Text>Здесь будет расчет и вывод c </Text>
            <Text>{route.params.text}</Text>
            <Text>С ценой {route.params.price ? route.params.price : 0}</Text>
            <Text>Вес {route.params.weight ? route.params.weight : 0}</Text>
            <Text>Поцрия {route.params.portion ? route.params.portion : 0}</Text>
            <Text>С нутриентами </Text>
            {
                route.params.checkedItem.map((item) => {
                    return item ? <Text> {item} </Text> : null
                })
            }

        </>
    );
};


export default Calculations;
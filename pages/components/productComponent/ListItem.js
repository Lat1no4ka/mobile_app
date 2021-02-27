import React, { useState, useEffect } from 'react';
import { List } from 'react-native-paper';
import { Text } from 'react-native';

const ListItem = (params) => {
    const name = params.item.name
    
    const itemHendler = () => {
        params.setSelected(params.item)
        params.setFocus(!params.focus)
    }

    return (
        <List.Item 
        title={name}
        onPress={() =>  itemHendler()}
        />
    );
}
export default ListItem;
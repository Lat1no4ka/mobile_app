import React, { useState } from 'react';
import SQLite from 'react-native-sqlite-storage';


const SqlClient = () => {

    const error = (error) => {
        console.log("ERROR: " + error);
    }

    const success = (success) => {
        //console.log("SUCCESS");
    }

    const db = SQLite.openDatabase({
        name: "DATA.db",
        location: 'default',
        createFromLocation: '~DATA.db',
    }, success, error);


    // SQLite.deleteDatabase({ name: 'DATA.db', location: 'default' });

    const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
                (error) => {
                    console.log(error)
                    reject(error);
                });
        });
    });



    return { ExecuteQuery };
};



export default SqlClient;
import React, {useState} from 'react';
import SQLite from 'react-native-sqlite-storage';


const SqlClient = () => {
    
    const db = SQLite.openDatabase({
        name: "DATA.db",
        location: 'default',
        createFromLocation: '~DATA.db',
    }, success, error);


    const error = (error) => {
        console.log("ERROR: " + error);
    }

    const success = (success) => {
        console.log("SUCCESS");
    }


    const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
                (error) => {
                    reject(error);
                });
        });
    });

     async function get(column,table) {
        let data = [];  
        let selectQuery = await ExecuteQuery(`SELECT ${column} FROM ${table}`, []);
        var rows = selectQuery.rows;

        for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
            
        
        }
        console.log('data');
        console.log(data);
        return selectQuery;
    }
   

    return {get};
};



export default SqlClient;
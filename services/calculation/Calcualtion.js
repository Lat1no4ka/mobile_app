import SqlClient from "../../CommonClient/SqlClient/SqlClient";
import React, { useState, useEffect } from 'react';
export const dataFromDB = (item) => {

    const [data, setdata] = useState(null);
    const client = SqlClient();

    useEffect(() => {
        if (!data) {
            getData(item).then((res) => {
                setdata({ "dayliRate": res.dayliRateFromDB, "product": res.productFromDB });
            });
        }
    }, []);
    async function getData() {
        let dayliRateFromDB = null;
        let selectQuery = await client.ExecuteQuery(`SELECT * FROM DAILY_RATE`, []);
        let rows = selectQuery.rows;
        for (let i = 0; i < rows.length; i++) {
            dayliRateFromDB = rows.item(i);
        }

        let productFromDB = null;
        selectQuery = await client.ExecuteQuery(`SELECT * FROM PRODUCT WHERE PRODUCT_NAME = ?`, [item.name]);
        rows = selectQuery.rows;
        for (let i = 0; i < rows.length; i++) {
            productFromDB = rows.item(i);
        }

        return { dayliRateFromDB, productFromDB }
    }
    if (data) {
        console.log(data)
        return data;
    }
}



/**
 * Содержание нутриента в продукции от суточной потребности в 100г, % (qb)
 * @param {*} nutrient
 */
export const qb = (dayliRate, item, nutrient) => {
    let nutKey = nutrient.key;
    let mass = item[nutKey];
    let dayliMass = dayliRate[nutKey];
    let res = ((mass * 100) / dayliMass)
    if(!isFinite(res) || isNaN(res)){
        return 0;
    }else{
        return res;
    }

}

/**
 * Содержание нутриента в продукции от суточной потребности в порции, % (pqb)
 * @param {*} nutrientFDR Содержание нутриента в продукции от суточной потребности в 100г, % (qb)
 * @param {*} item информация о выбранном продукте
 */
export const pqb = (nutrientFDR, item) => {
    let res = (item.onePortion * nutrientFDR / 100)
    if(!isFinite(res) || isNaN(res)){
        return 0;
    }else{
        return res;
    }
}

/**
 * Ценовой коэффициент полезности, руб/% (ccu)
 * @param {*} nutrientFDRinPortion  Содержание нутриента в продукции от суточной потребности в порции, % (pqb)
 * @param {*} item  информация о выбранном продукте
 */
export const ccu = (nutrientFDRinPortion, item) => {
    let portionsPrice = item.price * item.onePortion / item.weight;
    let res = (portionsPrice / nutrientFDRinPortion);
    if(!isFinite(res) || isNaN(res)){
        return 0;
    }else{
        return res;
    }
}

/**
 * Обратный коэффициент, %/руб (ucc)
 * @param {*} nutrientFDRinPortion  Содержание нутриента в продукции от суточной потребности в порции, % (pqb)
 * @param {*} item 
 */
export const ucc = (nutrientFDRinPortion, item) => {
    let portionsPrice = item.price * item.onePortion / item.weight;
    let res = (nutrientFDRinPortion / portionsPrice);
    if(!isFinite(res) || isNaN(res)){
        return 0;
    }else{
        return res;
    }
}

/**
 * Кол-во порций, шт (sp)
 * @param {*} nutrientFDRinPortion  Содержание нутриента в продукции от суточной потребности в порции, % (pqb)
 */
export const sp = (nutrientFDRinPortion) => {
    let res = ( 100 / nutrientFDRinPortion);
    if(!isFinite(res) || isNaN(res)){
        return 0;
    }else{
        return res;
    }
}

/**
 * Стоимость порций, руб. (scp)
 * @param {*} portionsCount  Кол-во порций, шт (sp)
 * @param {*} item  информация о выбранном продукте
 */
export const scp = (portionsCount, item) => {
    let portionsPrice = (item.price * item.onePortion) / item.weight;
    let res =  portionsCount * portionsPrice;
    if(!isFinite(res) || isNaN(res)){
        return 0;
    }else{
        return res;
    }
}

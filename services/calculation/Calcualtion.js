import SqlClient from "../../CommonClient/SqlClient/SqlClient";
import React, { useState, useEffect } from 'react';

const calculation = (item) => {
    const [client, setClient] = useState(SqlClient());
    const [dayliRate, setDayliRate] = useState();
    const [product, setProduct] = useState();

    useEffect(() => {
        if (item) {
            getDailyRate();
            nutrientFromProduct();
        }
    }, []);

    async function getDailyRate() {
        let value;
        let selectQuery = await client.ExecuteQuery(`SELECT * FROM DAILY_RATE`, []);
        let rows = selectQuery.rows;
        for (let i = 0; i < rows.length; i++) {
            value = rows.item(i);
        }
        setDayliRate(value);
    }
    async function nutrientFromProduct() {
        let value = [];
        let selectQuery = await client.ExecuteQuery(`SELECT * FROM PRODUCT WHERE PRODUCT_NAME = '${item.name}'`, []);
        let rows = selectQuery.rows;
        for (let i = 0; i < rows.length; i++) {
            value = rows.item(i);
        }
        setProduct(value);
    }

    const nutrientFromDailyRate = (nutKey) => {
        console.log(item)
        if (product && dayliRate) {
            let mass = product[nutKey];
            let dayliMass = dayliRate[nutKey];
            return (mass * 100) / dayliMass;
        }
    }

    const nutrientFromDailyRateInPortion = (nutrientFDR, item) => {
        return (item.oneWeight * nutrientFDR) / 100;
    }

    const priceCoef = (nutrientFDRinPortion, item) => {
        return item / nutrientFDRinPortion;
    }

    const reverseCoef = (nutrientFDRinPortion, item) => {
        let portionsPrice = (item.price * item.oneWeight) / item.weight;
        return nutrientFDRinPortion / portionsPrice;
    }

    const portionsCount = (nutrientFDRinPortion) => {
        return 100 / nutrientFDRinPortion;
    }

    const porionsPrice = (portionsCount, item) => {
        let portionsPrice = (item.price * item.oneWeight) / item.weight;
        return portionsCount * portionsPrice;
    }

    console.log(product);
    console.log(dayliRate);
    return { nutrientFromDailyRate }
}


export default calculation;
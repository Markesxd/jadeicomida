require('dotenv').config();
const { readFileSync } = require('fs');
const db = require('../connection');
const fs = require('fs/promises');
const path = require('path');
const { exit } = require('process');

async function setUp() {
    let sql = 
    `CREATE TABLE IF NOT EXISTS migrations (
        number INT
    )
    `
    await db.execute(sql)
    sql = "SELECT * FROM migrations";
    const [[{number: n}]] = await db.execute(sql);
    console.log('Last Migration number: ', n);
    const dirPath = path.join(__dirname, './migrations');
    const mDir = await fs.readdir(dirPath);
    let i = 0;
    for(let file of mDir) {
        if(i > n) {
            sql = readFileSync(path.join(dirPath, file)).toString();
            console.log(sql);
            await db.execute(sql);
        }
        i++;
    }
    i--;
    sql = `UPDATE migrations SET number=${i}`;
    console.log(sql);
    await db.execute(sql);
    exit(0);
}

setUp();
const db = require('../Database/connection');
const path = require('path');

module.exports = {
    createDb: async (req, res) => {
        const sql = 
        `CREATE TABLE IF NOT EXISTS food (
            id INT AUTO_INCREMENT,
            manha TINYINT DEFAULT 0,
            tarde TINYINT DEFAULT 0,
            noite TINYINT DEFAULT 0,
            data DATE,
            PRIMARY KEY (id)
        )
        `
        console.log(sql);
        await db.execute(sql);
        res.end();
    }, 

    setTodaysFood: async(req, res) => {
        const [today] = (new Date()).toISOString().split('T');
        let sql = `SELECT * FROM food WHERE data='${today}'`;
        const [result] = await db.execute(sql);
        const {manha, tarde, noite} = req.body;
        const values = [manha, tarde, noite];
        if(result.length === 0) {
            sql = `INSERT INTO food (manha, tarde, noite, data) VALUES (?, ?, ?, '${today}')`;
        } else {
            sql = `UPDATE food SET manha=?, tarde=?, noite=?`;
        }
        console.log(req.body);
        console.log(sql, values);
        const ok = await db.execute(sql, values);
        res.json(ok);
    }, 

    getTodaysFood: async (req, res) => {
        const [today] = (new Date()).toISOString().split('T');
        const sql = `SELECT * FROM food WHERE data='${today}'`;
        console.log(sql);
        const [[result]] = await db.execute(sql);
        res.json(result);
    },

    delete: async (req, res) => {
        const sql = `DELETE FROM food`;
        console.log(sql);
        const [result] = await db.execute(sql);
        res.json(result);
    }, 

    manifest: async (req, res) => {
        res.sendFile(path.join(__dirname, '/../../manifest.json'));
    }, 

    imageFinder: async (req, res) => {
        res.sendFile(path.join(__dirname, '/../Resources', req.params.imgPath));
    },

    sw: async (req, res) => {
        res.sendFile(path.join(__dirname, '/../Services/serviceWorker.js'));
    }
}
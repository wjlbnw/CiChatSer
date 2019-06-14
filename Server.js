// 服务器初始化
// 
// 
// 

const sqlConfig=JSON.parse(require('fs').readFileSync('config/sql.json','utf-8'));
// const sql=require('mysql');
// const connecter=sql.createConnection(sqlConfig);
// connecter.connect();
// connecter.query('show databases;',function(err,results){
//     if(err){
//         console.log(err);
//         return;
//     }
//      console.log(results);
// });

// connecter.end();
const dao = require('./DAO.js');
dao.end();
dao.initCon(sqlConfig);
dao.end();

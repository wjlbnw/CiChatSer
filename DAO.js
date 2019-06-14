// console.log('DAO run');
const sql=require('mysql');
let DAOCon=null;
exports.initCon=(config)=>{
    DAOCon=sql.createConnection(config);
    DAOCon.connect();
    // console.log('connected');
}
exports.end=()=>{
    if(DAOCon){
        DAOCon.end();
        // console.log('connected end');
    }else{
        // console.log('no connected');
    }
}
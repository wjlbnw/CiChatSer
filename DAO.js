// console.log('DAO run');
const sql=require('mysql');
let DAOCon=null;

exports.initCon=(config)=>{
    DAOCon=sql.createConnection(config);
    DAOCon.connect();
    exports.daocon=DAOCon;
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
exports.searchUser=(username,password,cbfun)=>{
    if(DAOCon){
        let id=parseInt(username);
        let sql=`
        SELECT id,user_name from users where (${isNaN(id)?'':'id='+id+'or'}  user_name='${username}') and password='${password}';
        `;
        console.log(sql);
       DAOCon.query(sql,function(err,results){
            if(err){
                console.log(err);
                return;
            }
            cbfun(results[0]);

        });
    }
};
exports.searchFriends=(username,cbfun)=>{
    let sql=`select u2.user_name,u2.id 
    from connect join users u1 on f1=u1.id 
    join users u2 on f2=u2.id 
    where u1.user_name='${username}';`;
    console.log(sql);
    DAOCon.query(sql,function(err,results){
        if(err){
            console.log(err);
            return;
        }
        console.log(results);
        cbfun(results);

    });
}
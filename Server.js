// 服务器初始化
// 
// 
// 
const config=JSON.parse(require('fs').readFileSync('config/config.json','utf-8'));
const sqlConfig=config.sqlConfig;
//初始化数据库操作对象
const dao = require('./DAO.js');
const control=require('./controls.js');
dao.initCon(sqlConfig);

const express=require('express');
const app=express();
const bodyParser = require('body-parser');
// app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const server=require('http').Server(app);
const io=require('socket.io')(server);

// 控制器绑定
app.post('/login',(req,res)=>{
    console.log('/login接入');
    let {username:username,password:pwd}=req.body;
    
    dao.searchUser(username,pwd,function(result){
            if(result){
                res.send({
                        result:true,
                        messagetext:'登陆成功'
                    });
            }else{
                 res.send({
                    result:false,
                    messagetext:'对应的账号或密码无效'
                });
            }
           
    });
});

app.get('/res/image/*',(req,res)=>{
    //图片加载,存储在public/images下的所有图片
    console.log( __dirname+ "/" + req.url);
    res.sendFile( __dirname+ "/" + req.url );
    console.log("Request for " + req.url + " received.");

});

// 监听端口
server.listen(8123);
const users=new Map([]);//在线列表
const meetings=new Map([
    ['一号会议',['zh','wjl','tyx']]
]);
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
    socket.on('initChat', function (user) {
        users.set(user,socket);
        dao.searchFriends(user,function(results){
            let list=[];
            for (const result of results) {
                list.push({
                    id:result.id,
                    user_name:result.user_name,
                    type:'暗线'
                });
            }
            list.push({
                id:10000,
                user_name:'一号会议',
                type:'会议'
            });
            socket.emit('getConnectors',list);
        });
      });
    socket.on('send',function(msg){
        console.log(msg);
        
        if(msg.type!='text'){
            return;
        }
        if(msg.receiver_type!='会议'){
            let receiversck=users.get(msg.receiver);
            if(receiversck){
                receiversck.emit('receive',msg);
            }
        }else{
            let parts=meetings.get(msg.receiver);
            if(parts){
                for(part of parts){
                    if(part==msg.sender){continue;}
                    let receiversck=users.get(part);
                    if(receiversck){
                    receiversck.emit('receive',msg);
                    }
                }
                
            }
        }
        
        

    });
  });



// 文件上传模块
const multiparty = require('multiparty');
const fs=require('fs');
// 上传文件
app.post("/upload", function (req, res) {
  /* 生成multiparty对象，并配置上传目标路径 */
  let form = new multiparty.Form();
  /* 设置编辑 */
  form.encoding = 'utf-8';
  //设置文件存储路劲
  form.uploadDir = './res/image';
  //设置文件大小限制
  // form.maxFilesSize = 1 * 1024 * 1024;
  form.parse(req, function (err, fields, files) {
    try {
      let inputFile = files.file[0];
      let uploadedPath = inputFile.path;
      let newPath = form.uploadDir + "/" + inputFile.originalFilename;
      //同步重命名文件名 fs.renameSync(oldPath, newPath)
      fs.renameSync(inputFile.path, newPath);
      res.send({ data: "上传成功！" });
      console.log(fields.message[0]);
      let message=JSON.parse(fields.message[0]);
      console.log(message);
      message.content=newPath.substr(1);
      console.log(message.content);

      if(message.receiver_type!='会议'){
        let receiversck=users.get(message.receiver);
        if(receiversck){
            receiversck.emit('receive',message);
        }
    }else{
        let parts=meetings.get(message.receiver);
        if(parts){
            for(part of parts){
                if(part==message.sender){continue;}
                let receiversck=users.get(part);
                if(receiversck){
                receiversck.emit('receive',message);
                }
            }
            
        }
    }
    //   let receiversck=users.get(message.receiver);
    //     if(receiversck){
    //         receiversck.emit('receive',message);
    //     }
      //读取数据后 删除文件
      // fs.unlink(newPath, function () {
      //   console.log("删除上传文件");
      // })
    } catch (err) {
      console.log(err);
      res.send({ err: "上传失败！" });
    };
  })
});
// app.post('/upload',(req,res)=>{
//     console.log(req);
// });


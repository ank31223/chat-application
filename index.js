var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})
var users=[];

io.on('connection',function(socket){
    console.log('User is connected');
    socket.on('setUsername',function(data){
        console.log(data);
        if(users.indexOf(data)> -1){
            socket.emit('userAlreadyExist',data + 'already exist.Try with some other name')
           
        }else{
            users.push(data);
            socket.emit('newUserSet',{username:data});
        }
    })

    socket.on('msg',function(data){
        io.sockets.emit('NewMessage',data);
    })

})

http.listen(5000,function(){
    console.log('The server is running at port 3000!!');
})

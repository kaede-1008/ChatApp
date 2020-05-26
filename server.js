'use strict';

// モジュール
const express = require( 'express' );
const http = require( 'http' );
const socketIO = require( 'socket.io' );

// オブジェクト
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// 定数
const PORT = process.env.PORT || 8080;
const SYSTEMNICKNAME = '**system**';

// 接続時の処理
// ・サーバーとクライアントの接続が確立すると、
// 　サーバー側で、'connection'イベント
// 　クライアント側で、'connect'イベントが発生する

let iCountUser = 0;

io.on(
    'connection',
    (socket) =>
    {
        console.log('connection');

        let strNickname = '';
        // 切断時の処理
        // ・クライアントが切断したら、サーバー側では'disconnect'イベントが発生する
        socket.on(
            'disconnect',
            () =>
            {
                console.log('disconnect');
                if (strNickname) {
                    iCountUser--;

                    require('date-utils')
                    const strNow = new Date();
                    const objMessage = {
                        strNickname: SYSTEMNICKNAME,
                        strMessage: strNickname + ' left.' + " there are " + iCountUser + " participants",
                        strDate: strNow
                    }
                    io.emit('sprad message', objMessage);
                }
            });
        
        socket.on(
            'join',
            (strNickname_) => {
                console.log('joined: ', strNickname_);
                strNickname = strNickname_;

                iCountUser++;
                require('date-utils')
                const strNow = new Date();
                const objMessage = {
                    strNickname: SYSTEMNICKNAME,
                    strMessage: strNickname + ' joined.' + " there are " + iCountUser + " participants",
                    strDate: strNow
                }
                io.emit('spread message', objMessage);
            });
        
        socket.on(
            'new message',
            (strMessage) => {
                console.log('new message', strMessage);

                require('date-utils')
                const strNow = new Date().toFormat('YYYY年M月D日 H時MI分SS秒');

                const objMessage = {
                    strNickname: strNickname,
                    strMessage: strMessage,
                    strDate: strNow
                }
                io.emit('spread message', objMessage);
            });
    });

// 公開フォルダの指定
app.use(express.static(__dirname + '/public'));

// サーバーの起動
server.listen(
    PORT,
    () =>
    {
        console.log('Server on port %d', PORT);
    });
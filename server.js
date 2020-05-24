'use strict';

// モジュール
const express = require( 'express' );
const http = require( 'http' );
const socketIO = require( 'socket.io' );

// オブジェクト
const app = express();
const server = http.Server( app );
const io = socketIO( server );

// 定数
const PORT = process.env.PORT || 8080;

// 接続時の処理
// ・サーバーとクライアントの接続が確立すると、
// 　サーバー側で、'connection'イベント
// 　クライアント側で、'connect'イベントが発生する
io.on(
    'connection',
    ( socket ) =>
    {
        console.log( 'connection' );

        // 切断時の処理
        // ・クライアントが切断したら、サーバー側では'disconnect'イベントが発生する
        socket.on(
            'disconnect',
            () =>
            {
                console.log( 'disconnect' );
            } );
        socket.on(
            'new message',
            (strMessage) => {
                console.log('new message', strMessage);

                require('date-utils')
                const strNow = new Date().toFormat('YYYY年M月D日 H時MI分SS秒');

                const objMessage = {
                    strMessage: strMessage,
                    strDate: strNow
                }
                io.emit('spread message', objMessage);
            });
    } );

// 公開フォルダの指定
app.use( express.static( __dirname + '/public' ) );

// サーバーの起動
server.listen(
    PORT,
    () =>
    {
        console.log( 'Server on port %d', PORT );
    } );
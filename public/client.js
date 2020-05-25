const socket = io.connect();

socket.on(
    'const',
    () => {
        console.log('connect');
    }
);

$ ('#join-form').submit (
    () => {
        console.log('#input_nickname: ', $('input_nickname').val());

        if ($('#input_nickname').val()) {
            socket.emit('join', $('#input_nickname').val());

            $('#nickname').html($('#input_nickname').val());
            $('#join-screen').hide();
            $('#chat-screen').show();
        }
    return false;
    });

$ ('form').submit(
    () => {
        console.log('#input_message: ', $('#input_message').val());
        
        if ( $('#input_message').val()) {
            socket.emit('new message', $('#input_message').val());
            $('#input_message').val('');
        }
        return false;
    });

socket.on(
    'spread message',
    (objMessage) => {
        console.log('spread message: ', objMessage);
        
        const strText = objMessage.strNickname+ ': ' + objMessage.strMessage + '(' + objMessage.strDate + ')';

        const li_element = $('<li>').text(strText);
        $('#message_list').prepend(li_element);
    });
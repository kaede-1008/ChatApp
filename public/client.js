const socket = io.connect();

socket.on(
    'const',
    () => {
        console.log('connect');
    }
);

$ ('form').submit(
    () => {
        console.log('#input_message :', $('#input_message').val());
        
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
        
        const strText = objMessage.strDate + '-' + objMessage.strMessage;

        const li_element = $('<li>').text(strText);
        $('#message_list').prepend(li_element);
    });
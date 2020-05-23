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
    (strMessage) => {
        console.log('spread message: ', strMessage);

        const li_element = $('<li>').text(strMessage);
        $('#message_list').prepend(li_element);
    });
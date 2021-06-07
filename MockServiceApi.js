const timeout = 1234;

function fetchMock(url) {
    switch (url) {
    case '/logIn':
        return logIn(logInParams)
        break;
    case '/sendMessage':
        return sendMessage(sendMessageParams)
        break;
    case '/newMessage':
        return newMessage(newMessageParams)
        break;
    case '/loadNewMessages':
        return loadNewMessages(loadNewMessagesParams)
        break;
    default:
        break;
    }
}

const logInParams = { method: 'POST', body : { email: 'hello@email.com', password: 'salut123@' } };
let logIn = params => new Promise(function(resolve, reject) {
    /* @endpoint: /logIn
       @method: POST
       @params: { email: <text>, password:<text> }
       @response: { success: <boolean>, user: {name: <text>, avatar_url:<string>} } */
    const data = takeOne(
        { success: true, user: { name: "toto", avatar_url: 'https://serveur.fr/avatars/toto1234.jpg' } },
        { success: false, user: { name: null, avatar_url: null } });
    setTimeout(() => { resolve(data); }, timeout);
});

const sendMessageParams = { method: 'POST', body : { text: 'some text', timestamp: '12748', recipient_id: '326'} };
let sendMessage = params => new Promise(function(resolve, reject) {
    /* @endpoint: /sendMessage
       @method: POST
       @params: { text: <text>, timestamp:<number>, recipient_id:<number> }
       @response: { success: <boolean>, delivered: <boolean>} } */  
    const data = takeOne(
        { success: true, delivered: false },
        { success: false, delivered: true });
    setTimeout(() => { resolve(data); }, timeout * 2);
});

const newMessageParams = { method: 'GET', body : {} };
let newMessage = params => new Promise(function(resolve, reject) {
    /* @endpoint: /newMessage
       @method: GET
       @params: {}
       @response: { success: <boolean>, from: <number>} } */
    const data = takeOne(
        { success: true, from: 1234566 },
        { success: false, from: null });
    setTimeout(() => { resolve(data); }, timeout * 3);
});

const loadNewMessagesParams = { method: 'POST', body : { id_new_messages: '1024' } };
let loadNewMessages = params => new Promise(function(resolve, reject) {
    /* @endpoint: /loadNewMessages
       @method: POST
       @params: { id_new_messages: <number> }
       @response: { success: <boolean>, nb_message: <number>, messages: [{timestamp:<number>, body:<text> }] } } */
    const data = takeOne(
        { success: true, nb_message: 3, messages: [ { timestamp: 13456, body: "Yo, ça va ?" },
                                                    { timestamp: 13477, body: "Moi ça va, et toi ?" },
                                                    { timestamp: 13499, body: "Oui, moi aussi." }, ] },
        { success: false, nb_message: 0, messages: null });
    setTimeout(() => { resolve(data); }, timeout * 4);
});


let sciExpo = (x, f = 1) => Number.parseFloat(x).toExponential(f);
let takeOne = (x, y) => (Math.random() > 0.5) ? x : y;
function takeOneTest(loopmax = 6e6) {
    /* takeOne(x, y) standart test
       to see if it is really random
       it is now tested and
       it looks very random */
    let dif = tot = div = 0;
    console.log('please wait while verifying random takeOne(x, y) ...');
    while (tot < loopmax) {
        dif += (takeOne(true, false)) ? 1 : -1;
        tot ++;
        div = dif / tot;
        if (tot % (loopmax / 80)) {
            tot = tot;
        } else {
            console.clear();
            console.log(`(fast random test) statistic: ${sciExpo(tot)}/${sciExpo(loopmax)}, deviation from zero: ${sciExpo(div)}`);
        }
    }

    return div;
}

module.exports = { fetchMock, takeOneTest }

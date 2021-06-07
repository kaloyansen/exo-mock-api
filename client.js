/* usage:
   node client.js */

//import { testTakeOne, fetchMock } from './MockServiceApi.mjs';
const { fetchMock, takeOneTest } = require('./MockServiceApi.js');
//let { testTakeOne, fetchMock } = require ('./MockServiceApi');

/* Consignes:
   Dans le fichier MockServiceApi.js, vous suivrez les indications en commentaires pour écrire des fonctions de mock de données.
   Chaque fonctions devra retourner un JSON qui correspond à la réponse prévu.
   Ces fonction doivent permettre de simuler une requête http à une api distante.
   Elles doivent donc retourner une promesse avec un certain temps de latence dans avant d'être résolue. */

takeOneTest(1e8);

/* after having tested my random function
   see takeOne(x, y) in ./MockServiceApi
   i'm gonna test all endpoints
   it is amazing that they are running in paralel
   so they start together but anyone could finish first
   because pending time (temps de latence) depends on random numbers */
let p = newPromise(`/logIn`); // custom promise
delete p; // as a c++ progammer i have learned that every <new> must have a <delete>
p = newPromise(`/sendMessage`);
delete p;
p = newPromise(`/newMessage`);
delete p;
p = newPromise(`/loadNewMessages`);
delete p;

function newPromise(params) {
    let log = `'${params}':`;
    let pro = fetchMock(params); // new promise
    pro.catch(err => { console.error(err) })
    pro.then(data => {
        if (!data.success) { // if not (pseudo)success the function calls itself to retry ...
            console.log(log + ' pending ...');
            delete pro;
            newPromise(params);
        } else { // ... while success !!!
            log += ' la réponse reçue =';
            pro.then(ok => { console.log(log, ok, "\n") })
        }
    })

    return pro;
}

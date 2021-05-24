let { fetchMock } = require ('./MockServiceApi');

/* Consignes:
   Dans le fichier MockServiceApi.js, vous suivrez les indications en commentaires pour écrire des fonctions de mock de données.
   Chaque fonctions devra retourner un JSON qui correspond à la réponse prévu.
   Ces fonction doivent permettre de simuler une requête http à une api distante.
   Elles doivent donc retourner une promesse avec un certain temps de latence dans avant d'être résolue.

   usage:
   node client.js */

let p; // custom promise
console.clear();

// gonna test all endpoints
p = newPromise(`/logIn`);
delete p;
p = newPromise(`/sendMessage`);
delete p;
p = newPromise(`/newMessage`);
delete p;
p = newPromise(`/loadNewMessages`);
delete p;

function newPromise(params) {
    let log = 'endpoint: ' + params;
    let prom = fetchMock(params);

    prom.catch(err => { console.error(err) })
    prom.then(data => {
        if (!data.success) {// resend if no success
            console.log(log + ' pending ...');
            delete prom;
            newPromise(params);
        } else {// success !!!
            console.log(log + ' received.');
            prom.then(ok => { console.log(ok) })
        }
    })

    return prom;
}

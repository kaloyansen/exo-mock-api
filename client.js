let { fetchMock } = require ('./MockServiceApi');

/* Consignes:
   Dans le fichier MockServiceApi.js, vous suivrez les indications en commentaires pour écrire des fonctions de mock de données.
   Chaque fonctions devra retourner un JSON qui correspond à la réponse prévu.
   Ces fonction doivent permettre de simuler une requête http à une api distante.
   Elles doivent donc retourner une promesse avec un certain temps de latence dans avant d'être résolue.

   usage:
   node client.js */

let prom; // custom promise
console.clear();

// gonna test all endpoints
prom = newPromise(`/logIn`);
delete prom;
prom = newPromise(`/sendMessage`);
delete prom;
prom = newPromise(`/newMessage`);
delete prom;
prom = newPromise(`/loadNewMessages`);
delete prom;

function newPromise(params) {
    let log = 'endpoint: ' + params;
    let reponse = fetchMock(params);

    reponse.catch(err => { console.error(err) })
    reponse.then(data => {
        if (!data.success) {// resend if no success
            console.log(log + ' pending ...');
            delete reponse;
            newPromise(params);
        } else {// success !!!
            console.log(log + ' received.');
            reponse.then(ok => { console.log(ok) })
        }
    })

    return reponse;
}

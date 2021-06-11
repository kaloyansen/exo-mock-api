/* usage:
   node client.js */


//import { fetchMock, takeOneTest } from './modules/MockServiceApi.mjs';
//import { fetchMock, takeOneTest } from './MockServiceApi.js';
//const { fetchMock, takeOneTest } = require('./MockServiceApi.js'); //with node client.js

//let { takeOneTest, fetchMock } = require ('MockServiceApi.js');


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

var app = new Vue({ el: '#app', data: app_data, methods: app_methods, watch: app_watch,
                    created: function () {
                        this.startime = Date.now();
                        console.log(this.$data);
                    }
                  });

var app_data = {
    context: 'cette javascript application, faite à l\'aide de vue.js framework, envoie un petit message',
    verbose: false,
    message: '',
    startime: 0,
    timer: 0,
    sent: false,
    showSaved: false
};

var app_methods = {
    readMe: function () {
        this.message = prompt('alice:> ');
        this.sendMe();
    },
    sendMe: function () {
        this.updateLocalTime();
        this.context = 'cette javascript application, faite à l\'aide de vue.js framework, c\'est une blague';
        this.sent = true;
    },
    updateLocalTime: function () { this.timer = Date.now() - this.startime; },
    ahoi: function (texte) {
        alert(texte);
        console.log(texte);
    }
};

var app_watch = {
    message: function (newMessage, oldMessage) {
        this.updateLocalTime();
    },
    sent: function () {
        if (this.sent) {
            this.sayAll(this.message + ' has been sent');
            this.message = this.message.split('').reverse().join('');
            this.message = '';
            this.sent = false;
        }
    }
};

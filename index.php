<?php

require_once './www/php/cgi.php';
$titre = 'mock application avec vue.js';

$myjsrc = array("https://cdn.jsdelivr.net/npm/vue/dist/vue.js");
$mycgi = new kcgi(666, $titre, "./www/img/favicon.ico", "inside", $myjsrc);
$mycgi->kheader('Kaloyan KRASTEV', $titre);

?>

<div id="app" :title="context">
  <div>
    <h3>robots:> {{ status }}</h3>
    <base-input label="alice:> " v-model="message" required placeholder="type here"></base-input>
  </div>

  <transition name="slide-fade">
    <div v-if="!verbose">
      <button @click="verbose = !verbose">
        v
      </button>
    </div>
  </transition>

  <transition name="slide-fade">
    <div v-if="verbose">
      <h4>watch: {{ wstat }}</h4>
    </div>
  </transition>

  <transition name="slide-fade">
    <div v-if="message != ''">
      <vue-mes-tag v-bind:propo="this"></vue-mes-tag>
      <button v-on:click="sendMe">{{ submit }}</button>
      <button v-on:click="message = ''">cancel</button>
    </div>
  </transition>

  <transition name="slide-fade">
    <div v-if="langageList.length > 0">
      <h3 class="inverse">database:</h3>
      <ol>
        <save-tag
          v-for="item in langageList"
          :propo="item"
          :key="item.time"
          ></save-tag>
      </ol>
      <button v-on:click="langageList = []">disappear</button>
    </div>
  </transition>

</div>


<?php


echo $mycgi->kscript("./MockServiceApi.js"); // vue translator
echo $mycgi->kscript("./client.js"); // vue translator


                   
$mycgi->ksetfooter(true);
$mycgi = null;

?>

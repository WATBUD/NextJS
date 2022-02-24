<template>
   <div>
  <!-- <Tutorial /> -->
  <!-- <two /> -->

  <NuxtLink to="/two">SSSS</NuxtLink>
<input v-model="firstName" placeholder="edit me">
<p>
Message is: {{ firstName }}
</p>
<p>
Message is: {{ M_Light_Perixx12 }}
</p>
<p>
Message is: {{ helloWorld }}
</p>
<p>
Message is: {{ M_Light_1 }}
</p>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from './HelloWorld.vue'
import { M_Light_CS } from './M_Light_Perixx'//ts enable add type variable  
import { M_Light_CS111 } from './M_Light_1'//js can not add type variable  
//Vue.prototype.$helloWorld= new HelloWorld();
const M_Light_Perixx = new M_Light_CS(80);
const M_Light_1 = new M_Light_CS111();

//const helloWorld = new HelloWorld();

export default Vue.extend({
  name: 'IndexPage',
  data: function () {
    return {
      //helloWorld:helloWorld,
      M_Light_1: new M_Light_CS111(),
      M_Light_Perixx12: new M_Light_CS(80),
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg',
    }
  }

})
var vm = new Vue({
  data: {
    firstName: 'Walter',
  }
})
//console.log(HelloWorld);
console.log('ZZZ',M_Light_Perixx);


var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
      
    }
  }
})
</script>

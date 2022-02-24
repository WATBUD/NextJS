<template>
  <div>
    <NuxtLink to="/">Home page</NuxtLink>
    <span @click="click">{{ text2 }}</span>
  </div>
</template>

<script>
  export default {
   data(){
    return {
     text: 'SS',
     newText: '1',
     text2: '555'
    }

   }
  }
</script>



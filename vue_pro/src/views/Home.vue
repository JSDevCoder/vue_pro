<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src

import serv from '../service/serv'

serv.login('15291985843', '123456').then(res => {
  console.log(res)
});


export default {
  name: "home",
  components: {
    
  }
};
</script>

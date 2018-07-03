<template>
  <div id="app">
    <header-overflow></header-overflow>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderOverflow from "@/components/HeaderOverflow";

export default {
  name: "app",
  components: {
    HeaderOverflow
  }
};
</script>


<style>
body {
  padding-top: 100px;
}
.meta {
  text-align: right;
  font-size: 10px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

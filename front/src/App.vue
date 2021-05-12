<template>
  <div id="app" class="relative">
    <div class="w-full fixed top-0 bg-gray-300 z-50">
      <el-progress :percentage="progress" v-if="showProgress"
        stroke-linecap="square" :show-text="false"
      />
    </div>
    <router-view />
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      progress: state => state.progress.progress || 0,
      show: state => state.progress.show || false,
    }),
    showProgress() {
      return this.show || (this.progress > 0 && this.progress < 100);
    },
  },
}
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

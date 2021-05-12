<template>
  <div class="flex flex-col items-center justify-between w-full min-h-screen overflow-y-auto relative">
    <div class="max-w-1920 w-full flex flex-col items-center z-30">
      <transition name="fade-transform" mode="out-in">
        <keep-alive v-if="$route.meta.cache">
          <router-view :key="$route.fullPath" />
        </keep-alive>
        <router-view :key="$route.fullPath" v-if="!$route.meta.cache" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
<script setup>
import HeaderRSS from './HeaderRSS.vue';
import PostsRSS from './PostsRSS.vue';
import SidebarRSS from './SidebarRSS.vue';


</script>

<template>
    <div class="main-container">
        <HeaderRSS/>
        <SidebarRSS/>
        <PostsRSS/>
    </div>
</template>

<style scoped>
.main-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
  height: 100vh;
}
</style>
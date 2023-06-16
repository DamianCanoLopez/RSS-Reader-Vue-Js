<script setup>
import { ref } from "vue";
import {useFeedStore} from "../stores/store";

const url = ref('');
const store = useFeedStore();

function handleSubmit(){
    if(!!url.value){
        store.registerNewSource(url.value)
        url.value = '';
    }
}

</script>

<template>
    <div class="header">
        <form action="" @submit.prevent="handleSubmit">
            <input type="url" required v-model="url" placeholder="Enter the url.."/>
            <button type="submit">Add source</button>
        </form>
    </div>
</template>

<style scoped>
.header {
  background: black;
  grid-area: header;
  justify-self: stretch;

  display: flex;
  justify-content: center;

  padding: 10px;
}

form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 5px;
}
.input {
  border: none;
  width: 100%;
}
button {
  border: none;
  background-color: #1283a9;
  color: white;
  padding: 5px 10px;
}
</style>
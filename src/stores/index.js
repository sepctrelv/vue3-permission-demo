import { ref } from "vue";
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const nav = ref([]);

  function setNav(data) {
    nav.value = data;
  }

  function resetNav() {
    nav.value = [];
  }

  return { nav, setNav, resetNav };
});

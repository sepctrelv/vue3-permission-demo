<script setup>
defineProps(["title"]);
</script>

<template>
  <div class="card">
    <div class="card-container">
      <h1 class="card-title">{{ title }}</h1>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  background: rgba(173, 221, 243, 0.5);
  width: 100%;
  height: 100%;

  &-title {
    margin-bottom: 20px;
    color: #003775;
    font-size: 40px;
  }

  &-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 576px;
    height: 350px;
    padding: 60px 80px;
    border-radius: 8px;
    background: #adddf3;

    @media (width < 768px) {
      width: 360px;
      padding: 30px 40px;
    }
  }
}
</style>

<script setup>
import { ref } from "vue";
import { useMainStore } from "@/stores";
import { Menu as IconMenu } from "@element-plus/icons-vue";

const store = useMainStore();
let items = ref([]);
items.value = store.nav;
</script>

<template>
  <el-aside>
    <el-menu default-active="/home/" class="el-menu-vertical-demo" router>
      <el-menu-item
        v-for="item in items"
        :key="item.mid"
        :index="`/home/${item.path}`"
      >
        <el-icon>
          <icon-menu />
        </el-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped lang="scss">
.el-aside {
  background: #409eff;
  --el-aside-width: 200px;

  .el-menu {
    border-right: solid 1px #409eff;
    background: #409eff;
  }

  .el-menu-item {
    color: #fff;

    &:hover {
      color: #409eff;
    }

    &.is-active {
      color: #409eff;
      background-color: var(--el-menu-hover-bg-color);
    }
  }

  @media (width < 576px) {
    --el-aside-width: 170px;
  }
}
</style>

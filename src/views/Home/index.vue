<script setup name="HomePage">
import { useRouter } from "vue-router";
import NavMenu from "@/views/Home/NavMenu.vue";
import { removeToken } from "@/utils/auth";
import { useMainStore } from "@/stores";

const router = useRouter();
const store = useMainStore();

function goBack() {
  removeToken();
  store.resetNav();
  router.push("/login");
}
</script>

<template>
  <div id="module">
    <el-container>
      <NavMenu />
      <el-container>
        <el-header>
          <el-button type="primary" class="exit" @click="goBack"
            >退出
          </el-button>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
#module {
  height: 100%;

  .el-container {
    height: 100%;

    .el-header {
      border-bottom: 1px solid #dcdfe6;
    }
  }

  .el-main {
    --el-main-padding: 30px 20px;
  }

  .el-submenu__title {
    color: #fff;
  }

  .exit {
    float: right;
    margin: 14px 10px;
  }
}
</style>

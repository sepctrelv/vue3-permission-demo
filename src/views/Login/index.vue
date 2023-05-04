<script setup name="LoginPage">
import CardLayout from "@/components/CardLayout/index.vue";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { reqUserLogin } from "@/api";
import { setToken } from "@/utils/auth";
import { ElMessage } from "element-plus";

const router = useRouter();
const ruleFormRef = ref();
const temp = reactive({
  account: "",
  password: "",
});

const rules = reactive({
  account: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 18, message: "用户名长度应该在3到18", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 18, message: "密码长度应该在3到18", trigger: "blur" },
  ],
});

function submitForm(formEl) {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        let res = await reqUserLogin(temp);
        if (res.code === 200 && res.ok) {
          ElMessage({ message: "登录成功", type: "success" });
          let { token } = res.data;
          // 缓存token
          setToken(token);
          router.push("/home");
        }
      } catch (error) {
        ElMessage.error(error.message);
      }
    } else {
      console.log("登录错误");
    }
  });
}

function goRegister() {
  router.push("/register");
}
</script>

<template>
  <CardLayout title="用户登录">
    <el-form
      ref="ruleFormRef"
      :model="temp"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="account">
        <el-input v-model="temp.account" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="temp.password"
          type="password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
        <el-button type="success" @click="goRegister"> 注册</el-button>
      </el-form-item>
    </el-form>
  </CardLayout>
</template>

<style scoped lang="scss">
.el-form {
  align-self: stretch;

  &-item:last-child {
    margin-bottom: 0;
  }
}
</style>

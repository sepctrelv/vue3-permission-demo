<script setup name="RegisterPage">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { reqUserRegister } from "@/api";
import CardLayout from "@/components/CardLayout/index.vue";

const router = useRouter();
const ruleFormRef = ref();
const temp = reactive({
  account: "",
  password: "",
  identity: "",
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
  identity: [{ required: true, message: "请选择用户身份", trigger: "change" }],
});

function submitForm(formEl) {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        let res = await reqUserRegister(temp);
        if (res.code === 200 && res.ok) {
          router.push("/login");
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log("注册出错");
    }
  });
}

function goLogin() {
  router.push("/login");
}
</script>

<template>
  <CardLayout title="用户注册">
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

      <el-form-item label="身份" prop="identity">
        <el-select v-model="temp.identity" placeholder="请选择用户身份">
          <el-option label="游客" value="guest" />
          <el-option label="会员" value="vip" />
          <el-option label="管理员" value="admin" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          注册
        </el-button>
        <el-button type="success" @click="goLogin"> 登录</el-button>
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

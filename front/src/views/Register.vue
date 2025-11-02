<template>
  <div class="flex h-screen w-full bg-neutral-900 text-white">
    <div class="flex flex-col justify-center items-center w-1/2 p-10">
      <h1 class="text-4xl font-extrabold leading-snug text-center">
        Odatdagidan <br />
        osonroq va <br />
        unumliroq
      </h1>
    </div>

    <div class="flex justify-center items-center w-1/2 bg-white text-black rounded-l-3xl">
      <div class="w-120 p-8">
        <n-h1 class="text-3xl font-bold mb-4">Ro‘yxatdan o‘tish</n-h1>
        <n-form ref="formRef" :model="form" :rules="rules" @submit.prevent="register">
          <n-form-item path="name" label="Ism familiya">
            <n-input v-model:value="form.name" placeholder="Ism familiya" size="large" />
          </n-form-item>
          <n-form-item path="phone" label="Telefon raqam">
            <n-input
              v-model:value="form.phone"
              placeholder="+998 91 123 45 67"
              :on-update:value="formatPhone"
              size="large"
            />
          </n-form-item>
          <n-form-item path="password" label="Parol">
            <n-input
              type="password"
              v-model:value="form.password"
              placeholder="Parol"
              size="large"
            />
          </n-form-item>
          <n-button type="primary" block size="large" attr-type="submit"
            >Ro‘yxatdan o‘tish</n-button
          >
        </n-form>

        <div class="mt-4 text-center text-sm">
          <router-link to="/login" class="text-blue-600 hover:underline">
            Allaqachon ro‘yxatdan o‘tganmisiz?
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useMessage, type FormInst, type FormRules } from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";

const formRef = ref<FormInst>();
const router = useRouter();
const authStore = useAuthStore();
const message = useMessage();

const form = ref({
  name: "",
  phone: "",
  password: "",
});

function formatPhone(e: any) {
  let digits = e.replace(/\D/g, "");

  if (!digits.startsWith("998")) {
    digits = "998" + digits;
  }

  digits = digits.slice(0, 12);

  let formatted = "+";
  if (digits.length > 0) formatted += digits.slice(0, 3); // +998
  if (digits.length > 3) formatted += " " + digits.slice(3, 5); // 91
  if (digits.length > 5) formatted += " " + digits.slice(5, 8); // 654
  if (digits.length > 8) formatted += " " + digits.slice(8, 10); // 43
  if (digits.length > 10) formatted += " " + digits.slice(10, 12); // 27

  form.value.phone = formatted;
}

const rules: FormRules = {
  name: [{ required: true, message: "Ismni kiriting" }],
  phone: [{ required: true, message: "Telefon raqamni kiriting" }],
  password: [{ required: true, message: "Parolni kiriting", min: 6 }],
};

const register = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        await authStore.register(form.value);
        router.push("/profile");
      } catch (err: any) {
        let txt = "Ro'yxatdan o'tish xato";
        if (Array.isArray(err?.response?.data?.message)) {
          txt = err.response.data.message.join(", ");
        }
        message.error(txt);
      }
    }
  });
};
</script>

<style scoped>
.n-card {
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>

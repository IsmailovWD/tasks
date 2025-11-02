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
        <n-h1 class="text-3xl font-bold mb-4">Kirish</n-h1>
        <n-form ref="formRef" size="large" :model="form" :rules="rules" @submit.prevent="submit">
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
          <n-button type="primary" block size="large" attr-type="submit">Kirish</n-button>
        </n-form>

        <div class="mt-4 text-center text-sm">
          <router-link to="/register" class="text-blue-600 hover:underline">
            Ro‘yxatdan o‘tish
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useMessage } from "naive-ui";

const router = useRouter();
const auth = useAuthStore();
const message = useMessage();
const formRef = ref();

const rules = {
  phone: [{ required: true, message: "Telefon raqamni kiriting" }],
  password: [{ required: true, message: "Parolni kiriting" }],
};

const form = reactive({
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

  form.phone = formatted;
}

const loading = ref(false);

const submit = () => {
  formRef.value.validate(async (errors: any) => {
    if (errors) {
      return;
    } else {
      try {
        loading.value = true;
        await auth.login(form.phone, form.password);
        message.success("Tizimga kirdingiz!");
        router.push("/profile");
      } catch (err: any) {
        let text = "Login xato";
        if (err.response?.data?.message) {
          if (Array.isArray(err.response?.data?.message)) {
            text = err.response?.data?.message.join(", ");
          }
        }

        message.error(text);
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="bg-white shadow-md rounded-2xl p-8 w-[400px]">
      <p class="text-gray-500 mb-6">Profil ma'lumotlari</p>
      <h2 v-if="!isEdit" class="text-xl font-semibold mb-2 text-center">{{ auth.user?.name }}</h2>
      <h2 v-if="!isEdit" class="text-xl font-semibold mb-2 text-center">{{ auth.user?.phone }}</h2>
      <h2 v-if="!isEdit" class="text-xl mb-2 text-center">{{ auth.user?.position }}</h2>
      <h2 v-if="!isEdit" class="text-xl mb-2 text-center">{{ auth.user?.bio }}</h2>
      <n-form v-if="isEdit" ref="formRef" :model="auth.user" :rules="rules" @submit.prevent="save">
        <n-form-item path="name" label="Ism familiya">
          <n-input v-model:value="auth.user.name" placeholder="Ism familiya" size="large" />
        </n-form-item>
        <n-form-item path="phone" label="Telefon raqam">
          <n-input
            v-model:value="auth.user.phone"
            placeholder="+998 91 123 45 67"
            :on-update:value="formatPhone"
            size="large"
          />
        </n-form-item>
        <n-form-item path="password" label="Parol">
          <n-input
            type="password"
            v-model:value="auth.user.password"
            placeholder="Parol"
            size="large"
          />
        </n-form-item>
        <n-form-item label="Lavozimi">
          <n-input v-model:value="auth.user.position" placeholder="Lavozimi" size="large"></n-input>
        </n-form-item>

        <n-form-item label="Bio">
          <n-input
            type="textarea"
            v-model:value="auth.user.bio"
            placeholder="Bio"
            size="large"
          ></n-input>
        </n-form-item>
        <n-button secondary block type="info" class="w-full" attr-type="submit">Saqlash</n-button>
      </n-form>
      <br />
      <n-button
        v-if="!isEdit"
        secondary
        block
        type="info"
        class="w-full"
        @click="() => (isEdit = true)"
        >Tahrirlash</n-button
      >
      <br />
      <n-button secondary block type="error" class="w-full" @click="logout">Chiqish</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useMessage, type FormRules } from "naive-ui";

const formRef = ref();
const loading = ref(false);
const isEdit = ref(false);
const auth = useAuthStore();
const router = useRouter();
const message = useMessage();

const rules: FormRules = {
  name: [{ required: true, message: "Ismni kiriting" }],
  phone: [{ required: true, message: "Telefon raqamni kiriting", min: 17 }],
  password: [{ required: false, message: "Parolni kiriting", min: 6 }],
};

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

  auth.user.phone = formatted;
}
const save = () => {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      loading.value = true;
      try {
        await auth.updateProfile(auth.user);
        await auth.getProfile();
        isEdit.value = false;
      } catch (err: any) {
        let txt = "Tahrirlash xato";
        if (Array.isArray(err?.response?.data?.message)) {
          txt = err.response.data.message.join(", ");
        }
        message.error(txt);
      } finally {
        loading.value = false;
      }
    }
  });
};

onMounted(async () => {
  if (!auth.user) {
    try {
      await auth.getProfile();
    } catch {
      router.push("/login");
    }
  }
});

const logout = () => {
  auth.logout();
  router.push("/login");
};
</script>

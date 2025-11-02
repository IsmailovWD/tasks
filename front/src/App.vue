<script setup lang="ts"></script>

<template>
  <NConfigProvider>
    <n-dialog-provider>
      <n-loading-bar-provider>
        <n-notification-provider>
          <n-message-provider>
            <RouterView />
          </n-message-provider>
        </n-notification-provider>
      </n-loading-bar-provider>
    </n-dialog-provider>
  </NConfigProvider>
</template>

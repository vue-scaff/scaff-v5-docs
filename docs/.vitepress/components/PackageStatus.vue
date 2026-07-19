<script setup lang="ts">
const packages = [
  { name: '@scaff/core', version: '5.0.0-alpha.0' },
  { name: '@scaff/vite', version: '5.0.0-alpha.0' },
  { name: '@scaff/vue', version: '5.0.0-alpha.0' },
  { name: '@scaff/react', version: '5.0.0-alpha.0' },
  { name: '@scaff/create', version: '5.0.0-alpha.1' },
] as const;
</script>

<template>
  <div class="package-status-grid">
    <article v-for="item in packages" :key="item.name">
      <code>{{ item.name }}</code>
      <span class="ready">{{ item.version }}</span>
    </article>
  </div>
</template>

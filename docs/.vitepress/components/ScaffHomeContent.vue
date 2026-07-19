<script setup lang="ts">
import ScaffMindMap from './ScaffMindMap.vue';
</script>

<template>
  <section class="scaff-home-section scaff-home-map">
    <div class="scaff-home-heading">
      <p class="scaff-home-eyebrow">工作原理</p>
      <h2>从目录到运行时上下文</h2>
      <p>目录负责描述，Manifest 负责连接，Core 负责在正确的时间激活正确的资源。</p>
    </div>

    <ScaffMindMap />
  </section>
</template>

<template>
  <div class="scaff-principle" role="img" aria-labelledby="scaff-principle-title scaff-principle-desc">
    <span id="scaff-principle-title" class="scaff-principle__sr-only">Scaff 工作原理</span>
    <span id="scaff-principle-desc" class="scaff-principle__sr-only">
      Scaff 从目录结构发现资源，生成 Manifest，根据访问状态按需激活资源组，
      最后通过统一 Context 提供给 Vue、React 或其他运行时。
    </span>

    <div class="scaff-principle__rail" aria-hidden="true" />

    <ol class="scaff-principle__stages">
      <li tabindex="0">
        <span class="scaff-principle__index">STEP 01</span>
        <div class="scaff-principle__visual">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M7 18h18l5 6h27v27H7Z" />
            <path d="M17 33h30M17 41h24" />
          </svg>
        </div>
        <div class="scaff-principle__copy">
          <h3>结构描述</h3>
          <p>用目录组织应用资源</p>
          <small>page · route · store · component</small>
        </div>
      </li>

      <li tabindex="0">
        <span class="scaff-principle__index">STEP 02</span>
        <div class="scaff-principle__visual">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M17 8h22l10 10v38H17Z" />
            <path d="M39 8v11h10M25 29h16M25 37h16M25 45h10" />
          </svg>
        </div>
        <div class="scaff-principle__copy">
          <h3>生成清单</h3>
          <p>构建阶段自动发现资源</p>
          <small>virtual:scaff-manifest</small>
        </div>
      </li>

      <li class="is-core" tabindex="0">
        <span class="scaff-principle__index">STEP 03</span>
        <div class="scaff-principle__visual">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="8" />
            <circle cx="32" cy="32" r="20" />
            <path d="M32 6v6M32 52v6M6 32h6M52 32h6" />
          </svg>
        </div>
        <div class="scaff-principle__copy">
          <h3>按需激活</h3>
          <p>访问哪个页面，加载哪组资源</p>
          <small>idle → active → inactive</small>
        </div>
      </li>

      <li tabindex="0">
        <span class="scaff-principle__index">STEP 04</span>
        <div class="scaff-principle__visual">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="15" r="7" />
            <circle cx="13" cy="49" r="7" />
            <circle cx="32" cy="49" r="7" />
            <circle cx="51" cy="49" r="7" />
            <path d="M32 22v10M13 42v-5h38v5M32 32v10" />
          </svg>
        </div>
        <div class="scaff-principle__copy">
          <h3>统一 Context</h3>
          <p>同一套资源接入不同运行时</p>
          <small>Vue · React · Custom</small>
        </div>
      </li>
    </ol>

  </div>
</template>

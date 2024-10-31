<script setup lang="ts">
import { useLocale, type SupportedLocale } from "../i18n";

const { setLocale, currentLocale, supportedLocales } = useLocale();

const handleLocaleChange = (locale: SupportedLocale) => {
  const localeIndex = supportedLocales.indexOf(locale);

  setLocale(locale);
  // FANCY-PANCY: Lets animate the background size!
  document.body.style.backgroundSize = `${localeIndex + 1}00% ${
    localeIndex + 1
  }00%`;
};
</script>

<template>
  <div class="language-switcher">
    <button
      v-for="locale in supportedLocales"
      :key="locale"
      :class="['locale-button', { active: currentLocale == locale }]"
      @click="handleLocaleChange(locale)"
    >
      {{ locale }}
    </button>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: -0.5rem 0 0.5rem;
}
.locale-button {
  border-radius: 2px;
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-muted);
  background: var(--color-muted);
  color: var(--color-text-default);
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    border-width: 2px;
    border-color: var(--color-accent);
  }
}

.locale-button.active {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}
</style>

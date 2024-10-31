<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { ProductList } from "../types/ProductTypes";

const { t } = useI18n();

interface Props {
  products: ProductList;
  selectedId: string;
}

const props = defineProps<Props>();

// Lets define the event emitter for the selectedId - 2 ways binding
const emit = defineEmits<{
  "update:selectedId": [id: string];
}>();

const selectProduct = (id: string) => {
  emit("update:selectedId", id);
};
</script>

<template>
  <div class="color-swatches">
    <button
      v-for="(product, id) in props.products"
      :key="id"
      :class="['color-swatches__swatch', { active: id === selectedId }]"
      :style="{ backgroundColor: product.productColour }"
      :aria-label="
        t('product.accessibility.colorSelect', {
          color: product.productVariant,
        })
      "
      @click="selectProduct(String(id))"
    />
  </div>
</template>

<style scoped>
.color-swatches {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.color-swatches__swatch {
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  &.active,
  &.active:hover {
    border: 2px solid var(--color-accent);
    transform: scale(1.2);
  }
  &:hover {
    border: 1px solid var(--color-accent);
  }
}
</style>

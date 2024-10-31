<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { ProductList } from "../types/ProductTypes";
import LoadingSpinner from "./LoadingSpinner.vue";
import { i18n } from "../i18n";

const { t } = useI18n();

const products = ref<ProductList>({});
const selectedId = ref("001");
const isLoading = ref(false);
const error = ref<string | null>(null);

const selectedProduct = computed(() => products.value?.[selectedId.value]);

const selectProduct = (id: string) => {
  selectedId.value = id;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat(i18n.global.locale.value, {
    style: "currency",
    currency: t("product.price.currency"),
    minimumFractionDigits: 2,
  }).format(price / 100);
};

const getProductImageUrl = (imageUrl: string) => {
  const imageDomain =
    "https://cdn.teufelaudio.com/image/upload/c_fill,f_auto,h_200,q_auto,w_300";

  return `${imageDomain}${imageUrl}`;
};

const fetchProducts = async () => {
  isLoading.value = true;
  fetch(
    "https://cdn.teufelaudio.com/raw/upload/v1599581070/test_assets/bikiniberlin.json"
  )
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch product list");
      return response.json();
    })
    .then((data) => {
      products.value = data;
    })
    .catch((e) => {
      error.value = e instanceof Error ? e.message : "Failed to load products";
    })
    .finally(() => {
      isLoading.value = false;
    });
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="product-details">
    <LoadingSpinner v-if="isLoading" />
    <div v-else-if="error">Error: {{ error }}</div>
    <template v-else-if="selectedProduct">
      <img
        :src="getProductImageUrl(selectedProduct.imageUrl)"
        :alt="
          t('product.accessibility.productImage', {
            color: selectedProduct.productVariant,
          })
        "
        class="product-details__image"
      />
      <h1 class="product-details__name">{{ t("product.title") }}</h1>
      <span class="price product-details__price">
        {{ formatPrice(selectedProduct.productPrice) }}</span
      >
      <div class="product-details__colors">
        <button
          v-for="(product, id) in products"
          :key="id"
          :class="['color-swatch', { active: id === selectedId }]"
          :style="{ backgroundColor: product.productColour }"
          :aria-label="
            t('product.accessibility.colorSelect', {
              color: product.productVariant,
            })
          "
          @click="selectProduct(String(id))"
        />
      </div>
      <button class="button" :disabled="!selectedProduct.inStock">
        {{
          t(
            `product.buyButton.${
              selectedProduct.inStock ? "available" : "unavailable"
            }`
          )
        }}
      </button>
    </template>
  </div>
</template>

<style scoped>
.product-details {
  max-width: 18.75rem;
  padding: 1.25rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-details__image {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

.product-details__name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
  text-align: center;
}

.product-details__price {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.product-details__colors {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.color-swatch {
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

.button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
}

.button:hover {
  background-color: var(--color-primary-dark);
}

.button:disabled {
  background-color: var(--color-muted-dark);
  color: var(--color-text-muted);
}
</style>

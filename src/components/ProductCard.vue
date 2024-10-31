<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { i18n } from "../i18n";
import { ProductList } from "../types/ProductTypes";
import LoadingSpinner from "./LoadingSpinner.vue";
import ColorSwatches from "./ColorSwatches.vue";

const { t } = useI18n();

const products = ref<ProductList>({});
const selectedId = ref("001");
const isLoading = ref(false);
const error = ref<string | null>(null);

// Reactivity and caching: only recompute when selectedProduct selectedId changes
const selectedProduct = computed(() => products.value?.[selectedId.value]);

// Lets format prices according to the current locale and currency settings
const formatPrice = (price: number) => {
  return new Intl.NumberFormat(i18n.global.locale.value, {
    style: "currency",
    currency: t("product.price.currency"),
    minimumFractionDigits: 2,
  }).format(price / 100);
};

// Lets construct the full URL for a product image by combining the provided image URL with the image domain.
const getProductImageUrl = (imageUrl: string) => {
  const imageDomain =
    "https://cdn.teufelaudio.com/image/upload/c_fill,f_auto,h_200,q_auto,w_300";

  return `${imageDomain}${imageUrl}`;
};

// Lets fetch the products from the API endpoint and handle errors
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

// Lets fetch the products when the component is mounted.
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
      <ColorSwatches :products="products" v-model:selectedId="selectedId" />
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

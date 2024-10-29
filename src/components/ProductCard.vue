<script setup lang="ts">
import { ref, computed } from "vue";
import { ProductList } from "../types/ProductTypes";
import productData from "../data/bikiniberlin.json";

const products = productData as ProductList;
const selectedId = ref("001");

const selectedProduct = computed(() => products[selectedId.value]);

const selectProduct = (id: string) => {
  selectedId.value = id;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price / 100);
};

const productName = "BOOMSTER Go";

const getProductImageUrl = (imageUrl: string) => {
  const imageDomain =
    "https://cdn.teufelaudio.com/image/upload/c_fill,f_auto,h_200,q_auto,w_300";

  return new URL(imageUrl, imageDomain).toString();
};
</script>

<template>
  <div class="product-details">
    <img
      :src="getProductImageUrl(selectedProduct.imageUrl)"
      :alt="selectedProduct.productVariant"
      class="product-details__image"
    />
    <h1 class="product-details__name">{{ productName }}</h1>
    <span class="price product-details__price">
      {{ formatPrice(selectedProduct.productPrice) }}</span
    >
    <div class="product-details__colors">
      <button
        v-for="(product, id) in products"
        :key="id"
        :class="['color-swatch', { active: id === selectedId }]"
        :style="{ backgroundColor: product.productColour }"
        :aria-label="`Select ${product.productVariant}`"
        @click="selectProduct(id)"
      />
    </div>
    <button class="button" :disabled="!selectedProduct.inStock">
      {{ selectedProduct.inStock ? "Buy now" : "Out of stock" }}
    </button>
  </div>
</template>

<style scoped>
.product-details {
  max-width: 300px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-details__image {
  width: 100%;
  height: auto;
  margin-bottom: 16px;
}

.product-details__name {
  font-size: 24px;
  font-weight: bold;
  margin: 8px 0;
  text-align: center;
}

.product-details__price {
  font-size: 20px;
  margin-bottom: 16px;
}

.product-details__colors {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.color-swatch {
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
}

.color-swatch:hover {
  border-color: #000;
}

.button {
  width: 100%;
  padding: 12px;
  background-color: #008744;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.button:hover {
  background-color: #006633;
}

.button:disabled {
  background-color: #808080;
  color: #fafafa;
  border: 1px solid #666666;
}
</style>

<script setup lang="ts">

import { ref } from 'vue'

defineProps({
  element: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const modelTemp = ref(null)
</script>

<template>
  <el-form-item :label="element.config.label">
    <el-select v-model="modelTemp" v-bind="element.attributes">
      <el-option
        v-for="item in element.config.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>

<style scoped lang="scss">

</style>

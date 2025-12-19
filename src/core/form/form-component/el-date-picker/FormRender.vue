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

const modelTemp = ref('')
</script>

<template>
<el-form-item :label="element.config.label">
  <el-date-picker v-model="modelTemp" v-bind="element.attributes"></el-date-picker>
</el-form-item>
</template>

<style scoped lang="scss">

</style>

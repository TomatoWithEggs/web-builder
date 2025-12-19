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
  <el-input v-model="modelTemp" v-bind="element.attributes"></el-input>
</el-form-item>
</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css';
import { computed, ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const container = ref(null);
let jsonEditor;
const jsonIsCorrect = ref(false)
const result = ref(null)
const emit = defineEmits(['importConfig','update:modelValue'])
const isShow = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})



const openDialog = () => {
  const options = {
    mode: 'code',               // 可选: 'code', 'form', 'text', 'view'
    modes: ['code', 'tree'],    // 允许用户切换的模式
    onChange: () => {
      try {
        const newData = jsonEditor?.get()
        result.value = JSON.parse(JSON.stringify(newData))
        jsonIsCorrect.value = true
        // 若需同步到响应式变量，可在此 emit 或更新 ref
      } catch (err) {
        jsonIsCorrect.value = false
        console.warn('Invalid JSON:', err)
      }
    }
  }
  jsonEditor = new JSONEditor(container.value, options)
}

const handleImportConfig = () => {
  emit('importConfig', result.value)
}
const handleClose = () => {
  isShow.value = false
}
</script>

<template>
  <el-dialog v-model="isShow" @opened="openDialog" @close="handleClose" destroy-on-close>
    <div ref="container" style="height: 500px;"></div>
    <template #footer>
      <el-button type="primary" :disabled="!jsonIsCorrect" @click="handleImportConfig">
        导入
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>

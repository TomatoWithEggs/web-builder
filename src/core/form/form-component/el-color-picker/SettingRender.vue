<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['update:config'])

const attributesTemp = ref({
  disabled: false,
  predefine: [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#00ff40',
    '#19d7be'
  ],
})

const configTemp = ref({
  label: '颜色选择', // form表单用于显示的label
  databaseField: '', // 数据库字段名
})

const props = defineProps({
  element: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

// 更新变量
const updateConfig = () => {
  const elementSetting = Object.assign({}, props.element)
  Object.assign(elementSetting.attributes, attributesTemp.value)
  Object.assign(elementSetting.config, configTemp.value)
  // 向父组件发送更新事件
  emit('update:config', elementSetting)
}

// 监听 props.widget 的变化来初始化表单
watch(
  () => props.element,
  (newWidget) => {
    if (newWidget) {
      Object.assign(attributesTemp.value, newWidget.attributes)
      Object.assign(configTemp.value, newWidget.config)
      updateConfig()
    }
  },
  { immediate: true, deep: true },
)


const addOption = () => {
  attributesTemp.value.predefine.push('')
  updateConfig()
}

const deleteOption = (index: number) => {
  attributesTemp.value.predefine.splice(index, 1)
  updateConfig()
}
</script>

<template>
  <div class="setting-wrapper">
    <el-form label-width="auto" style="max-width: 600px" label-position="top">
      <el-form-item label="字段名">
        <el-input v-model="configTemp.label" @input="updateConfig" />
      </el-form-item>
      <el-form-item label="数据库字段">
        <el-input v-model="configTemp.databaseField" @input="updateConfig" />
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch v-model="attributesTemp.disabled" @change="updateConfig" />
      </el-form-item>
      <el-form-item label="预定义颜色">
        <el-table :data="attributesTemp.predefine">
          <el-table-column label="颜色" align="center">
            <template #default="scope">
              <el-color-picker v-model="attributesTemp.predefine[scope.$index]"></el-color-picker>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #header>
              <el-button type="primary" circle icon="plus" @click="addOption"></el-button>
            </template>
            <template #default="scope">
              <el-button
                type="danger"
                circle
                icon="delete"
                @click="deleteOption(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.setting-wrapper {
  padding: 10px;
}
</style>

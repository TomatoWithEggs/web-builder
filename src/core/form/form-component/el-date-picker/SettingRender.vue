<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['update:config'])

const attributesTemp = ref({
  placeholder: '时间选择',
  disabled: false,
  clearable: false,
  type: 'datetime'
})

const configTemp = ref({
  label: '时间选择', // form表单用于显示的label
  databaseField: '' // 数据库字段名

})

const props = defineProps({
  element: {
    type: Object,
    default: () => {
      return {}
    }
  }
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
watch(() => props.element, (newWidget) => {
  if (newWidget) {
    Object.assign(attributesTemp, newWidget.attributes)
    Object.assign(configTemp, newWidget.config)
    updateConfig()
  }
}, { immediate: true, deep: true })
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
      <el-form-item label="提示字符">
        <el-input v-model="attributesTemp.placeholder" @input="updateConfig"/>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch v-model="attributesTemp.disabled"  @change="updateConfig"/>
      </el-form-item>
      <el-form-item label="是否显示清除按钮">
        <el-switch v-model="attributesTemp.clearable" @change="updateConfig"/>
      </el-form-item>
      <el-form-item label="时间类型">
        <el-radio-group v-model="attributesTemp.type" @change="updateConfig">
          <el-radio value="datetime">日期时间</el-radio>
          <el-radio label="date">日期</el-radio>
          <el-radio label="datetimerange">日期范围</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.setting-wrapper{
  padding: 10px;
}
</style>

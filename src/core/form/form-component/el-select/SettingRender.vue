<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['update:config'])

const attributesTemp = ref({
  placeholder: '请选择',
  disabled: false,
  clearable: false,
  filterable: true,
  multiple: false
})

const configTemp = ref({
  label: '下拉选择', // form表单用于显示的label
  databaseField: '', // 数据库字段名
  optionSource: "static", // 下拉选项来源 static-静态数据 dynamic-动态数据
  options: [
    {
      label: '选项1',
      value: '1'
    },
    {
      label: '选项2',
      value: '2'
    }
  ], // 下拉选项清单

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

const addOption = () => {
  configTemp.value.options.push({
    label: '',
    value: ''
  })
}

const deleteOption = (index:number) => {
  configTemp.value.options.splice(index, 1)
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
      <el-form-item label="提示字符">
        <el-input v-model="attributesTemp.placeholder" @input="updateConfig"/>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch v-model="attributesTemp.disabled"  @change="updateConfig"/>
      </el-form-item>
      <el-form-item label="是否可筛选">
        <el-switch v-model="attributesTemp.filterable"  @change="updateConfig"/>
      </el-form-item>
      <el-form-item label="是否可多选">
        <el-switch v-model="attributesTemp.multiple"  @change="updateConfig"/>
      </el-form-item>
      <el-form-item label="是否显示清除按钮">
        <el-switch v-model="attributesTemp.clearable" @change="updateConfig"/>
      </el-form-item>
      <el-form-item label="选项来源">
        <el-radio-group v-model="configTemp.optionSource">
          <el-radio value="static">静态数据</el-radio>
          <el-radio label="dynamic">动态数据</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="下拉选项">
        <el-table :data="configTemp.options">
          <el-table-column label="label" align="center">
            <template #default="scope">
              <el-input v-model="scope.row.label"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="value" align="center">
            <template #default="scope">
              <el-input v-model="scope.row.value"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #header>
              <el-button type="primary" circle icon="plus" @click="addOption"></el-button>
            </template>
            <template #default="scope">
              <el-button type="danger" circle icon="delete" @click="deleteOption(scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.setting-wrapper{
  padding: 10px;
}
</style>

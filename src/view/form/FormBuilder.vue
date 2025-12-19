<script setup lang="ts">
import initFormComponents from '@/core/form'
import { onMounted, reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import draggable from 'vuedraggable'
import { componentRegistry } from '@/core/form/ComponentRegistry.ts'
import type { FormComponentDefinition } from '@/core/form/types.ts'
// 测试
import InputMenuRender from '@/core/form/form-component/el-input/MenuRender.vue'
import InputSettingRender from '@/core/form/form-component/el-input/SettingRender.vue'
import InputFormRender from '@/core/form/form-component/el-input/FormRender.vue'
import SelectMenuRender from '@/core/form/form-component/el-select/MenuRender.vue'
import SelectSettingRender from '@/core/form/form-component/el-select/SettingRender.vue'
import SelectFormRender from '@/core/form/form-component/el-select/FormRender.vue'
import DateMenuRender from '@/core/form/form-component/el-date-picker/MenuRender.vue'
import DateSettingRender from '@/core/form/form-component/el-date-picker/SettingRender.vue'
import DateFormRender from '@/core/form/form-component/el-date-picker/FormRender.vue'
import ColorMenuRender from '@/core/form/form-component/el-color-picker/MenuRender.vue'
import ColorSettingRender from '@/core/form/form-component/el-color-picker/SettingRender.vue'
import ColorFormRender from '@/core/form/form-component/el-color-picker/FormRender.vue'

initFormComponents()
const componentsList = componentRegistry.getComponents()

// 选择字段
const currentSelectedFormItem = ref<FormComponentDefinition>(null)
// 打开设置面板
const handleOpenSetting = (item: FormComponentDefinition) => {
  currentSelectedFormItem.value = item
}

const formItemList = reactive<FormComponentDefinition[]>([
  {
    type: 'el-input',
    title: '输入框',
    configComponent: InputFormRender,
    settingComponent: InputSettingRender,
    menuComponent: InputMenuRender,
    attributes: {
      label: '输入框',
      placeholder: '请输入内容',
      clearable: true,
      disabled: false,
      required: false,
      rules: [],
    },
    config: {},
    id: 'b8d1fcce-b25e-422b-a1f3-1e4a24dbc295',
  },
  {
    type: 'el-select',
    title: '选择框',
    configComponent: SelectFormRender,
    settingComponent: SelectSettingRender,
    menuComponent: SelectMenuRender,
    attributes: {
      label: '选择框',
      placeholder: '请选择',
      clearable: false,
      disabled: false,
      required: false,
      rules: [],
    },
    config: {
      label: '下拉选择',
      databaseField: '',
      optionSource: 'static',
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
      ],
    },
    id: '35421032-81ad-4417-bdeb-cdcec7b5542b',
  },
  {
    type: 'el-date-picker',
    title: '时间选择',
    configComponent: DateFormRender,
    settingComponent: DateSettingRender,
    menuComponent: DateMenuRender,
    attributes: { placeholder: '时间选择', disabled: false, clearable: false },
    config: { label: '时间选择', databaseField: '' },
    id: '783aad12-6d90-4c35-9532-ff1b2bbc37d7',
  },
  {
    type: 'el-color-picker',
    title: '颜色选择',
    configComponent: ColorFormRender,
    settingComponent: ColorSettingRender,
    menuComponent: ColorMenuRender,
    attributes: {
      disabled: false,
      predefine: []
    },
    config: {
        label: '颜色选择',
        databaseField: ''
    },
    id: '783aad12-6d90-4c35-9532-ff1b2bbc37d8',
  },
])
// 表单配置增加一个组件之后的回调事件
const onItemAdd = (item: { newIndex: number }) => {
  const newIndex = item.newIndex
  const element = formItemList[newIndex]

  if (!formItemList[newIndex]) return
  element.id = uuidv4()

  handleOpenSetting(element)
}

const dragOutCloneComponent = (origin: FormComponentDefinition) => {
  const result = JSON.parse(JSON.stringify(origin))
  result['configComponent'] = origin.configComponent
  result['settingComponent'] = origin.settingComponent
  result['menuComponent'] = origin.menuComponent
  return result
}

// 处理配置更新
const handleConfigUpdate = (updateData: FormComponentDefinition) => {
  // 配置更新通过响应式对象自动同步，无需手动处理

  const formItem = formItemList.find((item) => item.id === updateData.id)

  Object.assign(formItem, updateData)
}

onMounted(() => {
  handleOpenSetting(formItemList[3])
})
</script>

<template>
  <div class="container">
    <!-- 左侧菜单 -->
    <div class="menu">
      <div class="menu-header">组件列表</div>
      <draggable
        :list="componentsList"
        :group="{ name: 'people', pull: 'clone', put: false }"
        item-key="title"
        class="menu-list"
        :clone="dragOutCloneComponent"
      >
        <template #item="{ element }">
          <div class="menu-item">
            <component :is="element.menuComponent"></component>
          </div>
        </template>
      </draggable>
    </div>
    <!-- 中间画布 -->
    <div class="content">
      <el-form class="form-canvas" label-width="80px">
        <draggable
          :list="formItemList"
          group="people"
          item-key="id"
          class="drag-area"
          @add="onItemAdd"
        >
          <template #item="{ element }">
            <div
              class="item"
              :class="{
                active: currentSelectedFormItem && currentSelectedFormItem.id === element.id,
              }"
              @click="handleOpenSetting(element)"
            >
              <component :is="element.configComponent" :element="element"></component>
            </div>
          </template>
        </draggable>
      </el-form>
    </div>
    <!-- 右侧属性面板 -->
    <div class="attribute">
      <div class="attr-header">属性配置</div>
      <template v-for="item in formItemList" :key="item.id">
        <component
          v-show="currentSelectedFormItem && currentSelectedFormItem.id === item.id"
          :is="item?.settingComponent"
          :element="item"
          @update:config="handleConfigUpdate"
        ></component>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  height: 100vh;
  overflow: hidden;
  background: #ffffff;

  .menu {
    border-right: 1px solid #eee;
    background: #ffffff;

    .menu-header {
      padding: 15px;
      font-weight: bold;
      border-bottom: 1px solid #eee;
      background: #fff;
    }

    .menu-list {
      padding: 15px;
      width: 100%;

      .menu-item {
        margin-bottom: 10px;
      }
    }
  }

  .content {
    background: #fff;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .toolbar {
      padding: 10px 20px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: flex-end;
    }

    .form-canvas {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background: #fafafa;

      .drag-area {
        min-height: 100%;
      }
    }

    .item {
      position: relative;
      padding: 20px 20px 0 20px;
      margin-bottom: 15px;
      background: #fff;
      border: 1px dashed #ccc;
      border-radius: 4px;
      transition: all 0.3s;

      &:hover {
        background: #f0f9eb;
        border-color: #67c23a;
        cursor: move;

        .operate-btn {
          display: block;
        }
      }

      &.active {
        border: 1px solid #409eff;
        background: #ecf5ff;
      }

      .operate-btn {
        position: absolute;
        right: 5px;
        top: 5px;
        display: none;
        z-index: 10;
      }
    }
  }

  .attribute {
    border-left: 1px solid #eee;
    background: #fff;
    height: 100vh;
    overflow: scroll;

    .attr-header {
      padding: 15px;
      font-weight: bold;
      border-bottom: 1px solid #eee;
    }

    .attr-content {
      padding: 0;
      height: calc(100vh - 51px);
      overflow-y: auto;
    }

    .empty-attr {
      padding: 50px 20px;
      text-align: center;
      color: #999;
    }
  }
}
</style>

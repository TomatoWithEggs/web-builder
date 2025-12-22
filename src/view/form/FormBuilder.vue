<script setup lang="ts">
import initFormComponents from '@/core/form'
import { reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import draggable from 'vuedraggable'
import { componentRegistry } from '@/core/form/ComponentRegistry.ts'
import type { FormComponentDefinition } from '@/core/form/types.ts'
import ImportFormConfig from '@/view/form/components/ImportFormConfig.vue'

initFormComponents()
const componentsList = componentRegistry.getComponents()
const isShowImportVisible = ref(false)

// 选择字段
const currentSelectedFormItem = ref<FormComponentDefinition>(null)
// 打开设置面板
const handleOpenSetting = (item: FormComponentDefinition) => {
  currentSelectedFormItem.value = item
}

const formItemList = reactive<FormComponentDefinition[]>([])
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
// 导入配置json
const importFormConfig = (config: FormComponentDefinition[]) => {
  const componentsMap = new Map<string, FormComponentDefinition>()
  Object.values(componentsList).forEach((item)=>{
    componentsMap.set(item.type, item)
  })
  formItemList.length = 0
  config.forEach((item) => {
    const component = componentsMap.get(item.type)
    if(component != undefined){
      item['configComponent'] = component.configComponent
      item['settingComponent'] = component.settingComponent
      item['menuComponent'] = component.menuComponent
      if(!('id' in  item)){
        item['id'] = uuidv4()
      }
      formItemList.push(item)
    }else{
      console.warn(`未找到组件：${item.type}`)
    }
  })
  if(formItemList.length>0 && typeof formItemList[0] === 'object'){
    handleOpenSetting(formItemList[0])
  }

  isShowImportVisible.value = false
}
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
      <div class="toolbar">
        <el-button type="primary" @click="isShowImportVisible=true">导入配置</el-button>
        <el-button type="primary">代码生成</el-button>
      </div>
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
    <ImportFormConfig v-model="isShowImportVisible" @importConfig="importFormConfig"></ImportFormConfig>
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

import { Component } from 'vue'

/**
 * 代码生成上下文
 */
export interface CodeGeneratorContext {
  /**
   * 组件实例属性
   */
  attributes: Record<string, any>
  /**
   * 组件配置
   */
  config: {
    label: string
    [key: string]: any
  }
  /**
   * 表单模型绑定的变量名，例如 'form.field_123'
   */
  modelName: string
  /**
   * 字段名/键名，例如 'field_123'
   */
  fieldName: string
}

/**
 * 代码生成结果
 */
export interface CodeGeneratorResult {
  /**
   * 模板代码片段
   */
  template: string
  /**
   * 脚本代码片段（可选）
   * 例如：const options_123 = [...]
   */
  script?: string
  /**
   * 需要导入的依赖（可选）
   * 例如：import { ElInput } from 'element-plus'
   */
  imports?: string[]
}

/**
 * 表单组件定义接口
 * 所有的表单组件都必须遵循这个接口
 */
export interface FormComponentDefinition {
  /**
   * 组件类型（唯一标识），例如 'el-input', 'custom-slider'
   */
  type: string

  /**
   * 组件显示名称，用于左侧菜单显示
   */
  title: string

  /**
   * 组件渲染器（在画布中显示的组件）
   */
  configComponent: Component

  /**
   * 组件设置面板（在右侧属性栏显示的组件）
   */
  settingComponent: Component

  /**
   * 左侧菜单（在左侧栏显示的组件）
   */
  menuComponent: Component


  /**
   * 组件的属性
   */
  attributes: Record<string, any>

  /**
   * 组件的配置信息
   */
  config: Record<string, any>

  /**
   * 代码生成函数
   * 根据配置生成对应的 Vue 源代码
   */
  codeGenerator: (context: CodeGeneratorContext) => CodeGeneratorResult

  /**
   * 可选：组件图标（可以是组件或字符串）
   */
  icon?: string | Component

  /**
   * 可选
   */
  id?: string
}

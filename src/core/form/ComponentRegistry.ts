import type { FormComponentDefinition } from './types.ts'

class ComponentRegistry {
  // 存储所有注册的组件定义，使用 Map 方便按 type 查找
  private definitions = new Map<string, FormComponentDefinition>()

  // 响应式的组件列表，供左侧菜单使用

  /**
   * 注册一个新组件
   * @param definition 组件定义
   */
  register(definition: FormComponentDefinition) {
    if (this.definitions.has(definition.type)) {
      console.warn(
        `Component type "${definition.type}" is already registered. It will be overwritten.`,
      )
    }

    this.definitions.set(definition.type, definition)
  }

  /**
   * 获取组件定义
   * @param type 组件类型
   */
  getDefinition(type: string): FormComponentDefinition | undefined {
    return this.definitions.get(type)
  }

  /**
   * 获取组件渲染器
   * @param type 组件类型
   */
  getRenderer(type: string): any {
    return this.definitions.get(type)?.configComponent || null
  }

  /**
   * 获取菜单组件
   * @param type 组件类型
   */
  getMenuComponent(type: string): any {
    return this.definitions.get(type)?.menuComponent || null
  }

  /**
   * 获取组件设置面板
   * @param type 组件类型
   */
  getSettingComponent(type: string): any {
    return this.definitions.get(type)?.settingComponent || null
  }

  getComponents(){
    return [...this.definitions.values()]
  }
}

// 导出单例实例
export const componentRegistry = new ComponentRegistry()

import { componentRegistry } from '@/core/form/ComponentRegistry.ts'
import type { FormComponentDefinition } from '@/core/form/types.ts'

export default function initFormComponents() {
  // 动态导入 form-component 里面的所有文件夹
  const formDefinitions = import.meta.glob('./form-component/**/FormComponentDefinition.ts', { eager: true });

  // 遍历所有导入的定义文件
  Object.values(formDefinitions).forEach((item: unknown) => {
    let definition;
    if(item !== null && typeof item === 'object' && 'Definition' in item){
      definition = item.Definition
    }
    // 类型检查
    if (isFormComponentDefinition(definition)) {
      componentRegistry.register(definition);
    } else {
      console.warn('Invalid form component definition:', definition);
    }
  })
}


// 类型守卫函数
function isFormComponentDefinition(obj: unknown): obj is FormComponentDefinition {
  return (
    obj !== null && typeof obj === 'object'
  );
}

import type {
  CodeGeneratorContext,
  CodeGeneratorResult,
  FormComponentDefinition
} from '@/core/form/types.ts'
import MenuRender from '@/core/form/form-component/el-color-picker/MenuRender.vue'
import SettingRender from '@/core/form/form-component/el-color-picker/SettingRender.vue'
import FormRender from '@/core/form/form-component/el-color-picker/FormRender.vue'

export const Definition: FormComponentDefinition = {
  codeGenerator(context: CodeGeneratorContext): CodeGeneratorResult {
    return undefined
  },
  type: 'el-color-picker',
  title: '颜色选择',
  configComponent: FormRender,
  settingComponent: SettingRender,
  menuComponent: MenuRender,
  attributes: {},
  config: {}
 }

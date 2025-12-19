import type {
  CodeGeneratorContext,
  CodeGeneratorResult,
  FormComponentDefinition
} from '@/core/form/types.ts'
import MenuRender from '@/core/form/form-component/el-input/MenuRender.vue'
import SettingRender from '@/core/form/form-component/el-input/SettingRender.vue'
import FormRender from '@/core/form/form-component/el-input/FormRender.vue'

export const Definition: FormComponentDefinition = {
  codeGenerator(context: CodeGeneratorContext): CodeGeneratorResult {
    return undefined
  },
  type: 'el-input',
  title: '输入框',
  configComponent: FormRender,
  settingComponent: SettingRender,
  menuComponent: MenuRender,
  attributes: {},
  config: {}
 }

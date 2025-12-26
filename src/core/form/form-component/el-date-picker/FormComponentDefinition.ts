import type { FormComponentDefinition } from '@/core/form/types.ts'
import MenuRender from '@/core/form/form-component/el-date-picker/MenuRender.vue'
import SettingRender from '@/core/form/form-component/el-date-picker/SettingRender.vue'
import FormRender from '@/core/form/form-component/el-date-picker/FormRender.vue'

export const Definition: FormComponentDefinition = {
  type: 'el-date-picker',
  title: '时间选择',
  configComponent: FormRender,
  settingComponent: SettingRender,
  menuComponent: MenuRender,
  attributes: {},
  config: {},
}

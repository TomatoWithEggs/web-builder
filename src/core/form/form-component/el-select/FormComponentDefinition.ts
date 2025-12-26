import type { FormComponentDefinition } from '@/core/form/types.ts'
import MenuRender from '@/core/form/form-component/el-select/MenuRender.vue'
import SettingRender from '@/core/form/form-component/el-select/SettingRender.vue'
import FormRender from '@/core/form/form-component/el-select/FormRender.vue'

export const Definition: FormComponentDefinition = {
  type: 'el-select',
  title: '选择框',
  configComponent: FormRender,
  settingComponent: SettingRender,
  menuComponent: MenuRender,
  attributes: {
    label: '选择框',
    placeholder: '请选择内容',
    clearable: true,
    disabled: false,
    required: false,
    rules: [],
  },
  config: {},
}

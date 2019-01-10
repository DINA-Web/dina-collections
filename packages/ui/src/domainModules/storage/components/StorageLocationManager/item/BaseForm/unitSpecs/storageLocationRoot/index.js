const parts = [
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 9 },
      fluid: true,
      type: 'text',
    },
    name: 'name',
    required: true,
    wrapInField: true,
  },
  {
    componentName: 'StorageLocationLevelDropdown',
    componentProps: {
      columnProps: { width: 9 },
    },
    name: 'group',
    required: true,
    wrapInField: true,
  },
  {
    componentName: 'StorageLocationDropdownPickerSearch',
    componentProps: {
      columnProps: { width: 9 },
    },
    name: 'parent.id',
    required: true,
    wrapInField: true,
  },
]

export default {
  name: 'storageLocationRoot',
  parts,
}

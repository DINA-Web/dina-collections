const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h2',
      textKey: 'headers.taxon',
    },
  },
  {
    componentName: 'TaxonDropdownPickerSearch',
    componentProps: {
      columnProps: { width: 10 },
    },
    name: 'parent.id',
    wrapInField: true,
  },
]
export default {
  name: 'taxonRoot',
  parts,
}

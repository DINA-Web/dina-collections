module.exports = [
  {
    input: 'pu*',
    matching: ['pusa', 'pusa hispida', 'rhabdomys pumilio'],
    notMatching: ['hispida'],
  },
  {
    input: '*pida',
    matching: ['pusa hispida'],
    notMatching: ['pusa'],
  },
  {
    input: '*pid',
    notMatching: ['pusa hispida'],
  },
  {
    input: 'his*',
    matching: ['pusa hispida'],
    notMatching: ['pusa'],
  },
  {
    input: '*lo*',
    matching: [
      'gulo',
      'gulo gulo',
      'phyllostomidae',
      'alouatta',
      'alouatta caraya',
      'mus musculoides',
    ],
    notMatching: ['pusa hispida', 'pusa'],
  },
]

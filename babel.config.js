const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
        ie:'9',
        node: '10.16'
      },
      useBuiltIns: "entry",
    },
  ],
  ["@babel/preset-typescript"]
];

const plugins = [ 
  [
    'transform-object-rest-spread', 
    {
    "useBuiltIns": true
    }
  ]
]

const extensions = [ '.ts' ]

module.exports = { presets, plugins, extensions };
let config = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: '芒果TV - AI',
    },
  },
  devServer: {
    disableHostCheck: true
  },
  // transpileDependencies: [
  //   'vue-echarts',
  //   'resize-detector'
  // ]
}

module.exports = config

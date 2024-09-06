const dts = require('rollup-plugin-dts').default;
const path = require('path');

module.exports = {
  input: path.resolve(__dirname, 'src/lazy-debounce.ts'),  // 실제 타입 정의할 파일 경로
  output: {
    file: path.resolve(__dirname, 'dist/index.d.ts'),
    format: 'es',
  },
  plugins: [dts()],
};

import observable from 'common/observable';
import loading from './loading';

const program = {
  /**
   * 暂存对象
   *
   * @type {Object}
   */
  data: {},
  setting: {},
  listening: true, // 正在监听事件
  loading // loading 对象
};

export default program;

observable.mixin(program);
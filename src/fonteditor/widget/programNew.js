import observable from 'common/observable';
import loading from './loading';

/**
 * 绑定键盘事件
 */
function bindKey() {
  let me = this;

  document.body.addEventListener('keydown', function (e) {

      if (!me.listening) {
          return;
      }

      e.ctrl = e.ctrlKey || e.metaKey;

      // 全选
      if (65 === e.keyCode && e.ctrl) {
          e.preventDefault();
          e.stopPropagation();
      }
      // 功能键
      if (e.keyCode >= 112 && e.keyCode <= 119 && e.keyCode !== 116) {
          e.preventDefault();
          e.stopPropagation();
          me.fire('function', {
              keyCode: e.keyCode
          });
      }
      // 保存
      else if (83 === e.keyCode && e.ctrl) {
          e.preventDefault();
          e.stopPropagation();
          if (e.shiftKey) {
              me.fire('save', {
                  saveType: 'force'
              });
          }
          else {
              me.fire('save');
          }
      }
      // 粘贴
      else if ((86 === e.keyCode && e.ctrl)) {
          e.preventDefault();
          e.stopPropagation();
          me.fire('paste');
      }
  });
}

const program = {
  init() {
    bindKey.call(this);
  },

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
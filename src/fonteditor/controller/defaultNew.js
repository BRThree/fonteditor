import clipboard from 'editor/widget/clipboard';
let program;

/**
 * 通知错误信息
 *
 * @param  {Object} options 参数
 * @param  {number} options.number 错误号
 * @param  {Object} options.data 错误数据
 */
function notifyError(options) {
    // 重复的代码点
    if (options.number === 10200 && options.data) {
        let glyfList = Array.isArray(options.data) ? options.data : [options.data];
        let pageSize = program.setting.get('editor').viewer.pageSize;
        let page = Math.ceil(glyfList[0] / pageSize);
        showTTF(program.ttfManager.get(), page, glyfList);
    }
}

/**
    * 绑定ttf管理器
    *
    * @param {Object} program 项目对象
    */
function bindttfManager(program) {
    program.ttfManager.on('change', function (e) {
        // 保存正在编辑的字形
        // let editingIndex = program.viewer.getEditing();
        // if (e.changeType === 'update' && program.editor.isEditing() && editingIndex !== -1) {
        //     program.viewer.refresh(e.ttf, [editingIndex]);
        // }
        // else {
        //     showTTF(e.ttf, program.viewer.getPage() + 1);
        // }

    }).on('set', function (e) {

            // 未初始化状态，命令栏是不显示的，需要设置下编辑模式
            // if (!program.viewer.inited) {
            //     program.viewer.setMode('list');
            //     program.viewer.inited = true;
            // }

            // // 初始化之后，启用菜单
            // if (!program.menuInited) {
            //     $('.action-groups [data-disabled="1"]').removeAttr('data-disabled');
            //     program.menuInited = true;
            // }

            // showTTF(e.ttf, 1, []);
        });
}

export default {

    /**
        * 初始化控制器
        *
        * @param {Object} curProgram 项目组件
        */
    init(curProgram) {

        // 设置当前的项目对象为指定的项目对象
        program = curProgram;

        // 绑定tff管理器
        bindttfManager(program);

        // 检查项目是否更改过，如果更改过，则弹出保存对话框

    }
};

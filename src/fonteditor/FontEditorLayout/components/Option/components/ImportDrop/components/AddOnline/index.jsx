import React, {useState} from 'react';
import styles from './index.module.scss';
import {Modal, Space} from 'antd';
import Scrollbars from 'react-custom-scrollbars';
import onlineList from '@/data/online-font';
import i18n from "@/i18n/i18n";
import string from 'common/string';
import {useProgramStore} from "@/store/programStore";
import ajaxFile from 'common/ajaxFile';
import {getOlByUrl} from '@/request/importService';

function AddOnline() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { program } = useProgramStore();

    // 打开对话框
    const openModal = () => {
        setIsModalOpen(true);
    };

    /**
     * 读取在线字体
     *
     * @param {string} type 类型 svg or binary
     * @param {string} url 文件地址
     */
    const readOnlineFont = (type, url) => {
        ajaxFile({
            type: type === 'svg' ? 'xml' : 'binary',
            url: url,
            onSuccess(buffer) {
                program.loader.load(buffer, {
                    type: type || 'ttf',
                    success(imported) {
                        program.loading.hide();
                        program.ttfManager.set(imported);
                        program.data.projectId = null;
                        program.projectViewer.unSelect();
                    }
                });
            },
            onError() {
                alert(i18n.lang.msg_read_file_error);
            }
        });
    }

    // url点击事件
    const handleClick = async (url) => {
        if (program.ttfManager.isChanged() && !window.confirm(i18n.lang.msg_confirm_save_proj)) {
            return;
        }

        let type = url.slice(url.lastIndexOf('.') + 1);
        let fontUrl = url;

        if (/^https?:\/\//i.test(url)) {
            const res = await getOlByUrl({url: fontUrl});
            console.log(res);
        }

        // readOnlineFont(type, fontUrl);
    }

    return (
        <>
            <div onClick={openModal} className={styles['container']}>
                在线字体
            </div>
            <Modal
                title="在线字体"
                open={isModalOpen}
                footer={null}
                width={600}
                destroyOnClose
            >
                <Scrollbars autoHeight>
                    <Space className={styles['online-list']} size={8} direction="vertical">
                        {
                            onlineList.map(item => (
                                <div onClick={() => handleClick(item.url)} key={item.name} className={styles['online-item']}>
                                    <div className={styles['online-item-name']}>
                                        {item.name}
                                    </div>
                                    <div className={styles['online-item-url']}>
                                        {item.from}
                                    </div>
                                </div>
                            ))
                        }
                    </Space>
                </Scrollbars>
            </Modal>
        </>
    );
}

export default AddOnline;

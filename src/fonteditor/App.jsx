import React from 'react';
import {HoxRoot} from 'hox';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import {createHashRouter, RouterProvider} from "react-router-dom";
import routes from "./routers";

const router = createHashRouter(routes);

const App = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <HoxRoot>
                <RouterProvider router={router}/>
            </HoxRoot>
        </ConfigProvider>
    );
};

export default App;

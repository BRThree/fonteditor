import React, { useState } from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function ProjectItems({
  item = { name: 'label', id: 'key' },
  onDeleteProjectItems = () => {},
}) {
  const [hoverItem, setHoverItem] = useState(false);
  return (
    <div
      onMouseOver={() => setHoverItem(true)}
      onMouseOut={() => setHoverItem(false)}
      className={styles['project-items']}
    >
      <span>{item.name}</span>
      {
        <span
          style={{
            display: hoverItem ? 'inline' : 'none',
          }}
        >
          <Button
            onClick={() =>
              onDeleteProjectItems({ key: item.id, label: item.name })
            }
            icon={<DeleteOutlined />}
            type="link"
            size="small"
          />
        </span>
      }
    </div>
  );
}

export default ProjectItems;

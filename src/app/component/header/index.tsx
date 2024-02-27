import React from 'react';
import { Avatar, Dropdown, MenuProps } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

const items: MenuProps['items'] = [
  {
    label: <a href="/">User1</a>,
    key: '1',
  },
  {
    label: <a href="/">User2</a>,
    key: '2',
  },
];
const CommonHeader:React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-300 px-3 flex flex-row items-center justify-end">
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          {/* @ */}
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined rev={undefined}   />} />
          <DownOutlined rev={undefined} />
        </a>
      </Dropdown>
    </div>
  );
}

export default CommonHeader;
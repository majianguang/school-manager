import { DeleteFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Popconfirm, Space, Table, TableProps, Tag } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import AddStudentModal from "../modal";

export interface DataType {
  key?: string;
  name: string;
  gender: string;
  age: number;
  avatar: string;
  birth: string;
}

const initData: DataType[] = [
  {
    key: '1',
    name: '闫娜',
    gender: 'Male',
    avatar: '',
    age: 13,
    birth: '2024-02-20',
  },
  {
    key: '2',
    name: '易娟',
    gender: 'FeMale',
    avatar: '',
    age: 13,
    birth: '2024-02-20',
  },
  {
    key: '3',
    name: '冯芳',
    gender: 'Male',
    avatar: '',
    age: 14,
    birth: '2024-02-20',
  },
  {
    key: '4',
    name: '蔡杰',
    gender: 'Female',
    avatar: '',
    age: 14,
    birth: '2024-02-20',
  },
  {
    key: '5',
    name: '潇磊',
    gender: 'Male',
    avatar: '',
    age: 13,
    birth: '2024-02-20',
  },
  {
    key: '6',
    name: '韩平',
    gender: 'Female',
    avatar: '',
    age: 13,
    birth: '2024-02-20',
  },
  {
    key: '7',
    name: '许超',
    gender: 'Female',
    avatar: '',
    age: 13,
    birth: '2024-02-20',
  },
  {
    key: '8',
    name: '晓刚',
    gender: 'Female',
    avatar: '',
    age: 13,
    birth: '2024-02-20',
  },
];
const PageSize = 10;
const Classes: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [editData, setEditData] = useState<DataType>();
  const [data, setData] = useState<DataType[]>(initData);
  const onSearch = useCallback((value: string) => {
    // 处理搜索逻辑
    console.log(value);
    setSearch(value);
  }, []);
  // 删除处理
  const onHandleDelete = (item: DataType) => {
    data.splice(data.indexOf(item), 1)
    setData([...data]);
  }
  const onEditStudent = (item: DataType) => {
    setEditData(item);
    setVisible(true);
  }
  // 表格配置
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (text) => <Tag color={text === 'Male' ? "green" : 'cyan'}>{text}</Tag>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text) => <Avatar src={text} style={{ width: 50, height: 50, backgroundColor: '#87d068' }}/>,
    },
    {
      title: 'Date of Birth',
      dataIndex: 'birth',
      key: 'birth',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined rev={undefined} />} type="link" onClick={() => onEditStudent(record)}></Button>
          <Popconfirm title="Are you sure to delete this?" onConfirm={() => onHandleDelete(record)}>
            <Button danger icon={<DeleteFilled rev={undefined} />} type="link"></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  const showData = useMemo(() => {
    if (search) {
      const list = data.filter((item) => item.name.indexOf(search) >= 0);
      return list;
    }
    return data;
  }, [search, data])

  /**
   * 添加学生
   */
  const onAddStudent = () => {
    setVisible(true);
  }
  // 弹窗回调
  const onHandleSuccess = (student: DataType) => {
    if (editData) {
      // 编辑
      const index = data.findIndex((item) => item.key === editData.key);
      data.splice(index, 1, student);
    } else {
      // 新增
      student.key = (data.length + 1).toString();
      data.unshift(student);
    }
    setData([...data]);
  }
  // 
  const onHandleClose = () => {
    setEditData(undefined);
    setVisible(false);
  }
  return (
    <div className="border border-1 border-gray-100 rounded-md">
      <div className="flex flex-row items-center justify-between px-3 py-5 border-b border-blue-50">
        <h2>StudentList</h2>
        <div>
          <Button type="primary" onClick={onAddStudent} icon={<PlusOutlined rev={undefined} />}>Add Student</Button>
        </div>
      </div>
      <div className="flex flex-row justify-end px-3 py-4">
        <Input.Search placeholder="search student by name" style={{width: 300}} onSearch={onSearch} enterButton />
      </div>
      <div className="px-3 py-4">
        <Table 
          bordered
          columns={columns} 
          dataSource={showData} 
          pagination={{
            pageSize: PageSize,
            total: showData.length,
            current: currentPage,
            onChange(page, pageSize) {
              setCurrentPage(page);
            },
          }}
          />
      </div>
      <AddStudentModal 
        visible={visible} 
        data={editData}
        onClose={onHandleClose} 
        onSuccess={onHandleSuccess}/>
    </div>
  )
}

export default Classes;
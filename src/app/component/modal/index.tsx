import { Button, DatePicker, DatePickerProps, Form, GetProp, Input, Modal, Select, Space, Upload, UploadProps, message } from "antd";
import { DataType } from "../classes";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};


const AddStudentModal = (props: {
  // 是否显示弹窗
  visible: boolean;
  // 编辑的数据，新增可不传
  data?: DataType;
  // 关闭回调
  onClose: () => void;
  // 新增、编辑回调
  onSuccess: (data: DataType) => void;
}) => {
  const { visible, data, onClose, onSuccess } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (visible && data) {
      const formData = {
        ...data,
        birth: dayjs(data!.birth),
      }
      if (data.avatar && data.avatar.length > 0) {
        setImageUrl(data.avatar);
      }
      form.setFieldsValue(formData);
    }
  }, [data, visible])

  // 关闭弹窗
  const handleCancel = () => {
    onClose && onClose();
    form.resetFields();
    setLoading(false);
    setImageUrl(undefined);
  };
  // 确定处理
  const handleOk = () => {
    form.validateFields().then((values) => {
      const resData = { 
        ...values,
        // 格式化时间
        birth: values['birth'].format('YYYY-MM-DD'),
        avatar: imageUrl,
      };
      console.log(resData);
      
      onSuccess && onSuccess(resData);
      handleCancel();
    });
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined rev={undefined} /> : <PlusOutlined rev={undefined} />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <Modal 
      closable={false} 
      centered 
      maskClosable={false} 
      open={visible} 
      title={data ? 'Update Student' : 'Add Student'}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Form
        {...layout}
        form={form}
        name="student-info"
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Input name"/>
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Select gender"
            allowClear
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item name="age" label="Age" rules={[{ required: true }]}>
          <Input placeholder="Input age"/>
        </Form.Item>
        <Form.Item name="avatar" label="Avatar" rules={[{ required: true }]}>
          {/* <Input placeholder="Input avatar" /> */}
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            maxCount={1}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item name="birth" label="Date of Birth" rules={[{ required: true }]}>
          <DatePicker placeholder="Select Date of birth" format="YYYY-MM-DD" style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddStudentModal;
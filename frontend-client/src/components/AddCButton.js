import React, { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import AddCustomer from "./AddCustomer.js";
import { createStyles } from 'antd-style';
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const AddCButton = () => {
  const { styles } = useStyle()
  const [open, setOpen] = useState(false)

  return (
    <ConfigProvider button={{ className: styles.linearGradientButton }}>
      <Button type="primary" size="middle" icon={<PlusOutlined/>} onClick={() => setOpen(true)} > 
        Add Customer
      </Button>
      <AddCustomer open={open} setOpen={setOpen} />
    </ConfigProvider>
  )
}

export default AddCButton

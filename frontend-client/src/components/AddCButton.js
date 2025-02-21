import React, { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import AddCustomer from "./AddCustomer.js";
import { createStyles } from 'antd-style';
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-default:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
        z-index: 1;
      }

      &::before {
        content: '';
        background: linear-gradient(90deg, hsla(216, 8%, 24%, 1) 0%, hsla(187, 30%, 28%, 1) 56%);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
        border-radius: inherit;
        z-index: 0;
      }

      &:hover::before {
        opacity: 1;
        transform: scale(1.02);
        background: linear-gradient(270deg, hsla(216, 8%, 24%, 1) 0%, hsla(187, 30%, 28%, 1) 56%)
      } 

      &:active::before {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,
}));

const AddCButton = ({ fetch }) => {
  const { styles } = useStyle()
  const [open, setOpen] = useState(false)

  return (
    <ConfigProvider button={{ className: styles.linearGradientButton }}>
      <Button type="default" size="middle" style={{color: "white"}}icon={<PlusOutlined/>} onClick={() => setOpen(true)} > 
        Add Customer
      </Button>
      <AddCustomer open={open} setOpen={setOpen} fetch={fetch} />
    </ConfigProvider>
  )
}

export default AddCButton

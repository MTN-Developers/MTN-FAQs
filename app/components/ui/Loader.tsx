import React from "react";
import { Spin } from "antd";

const Loader: React.FC = () => (
  <div className="w-screen flex items-center justify-center h-[500px]">
    <Spin size="large" />
  </div>
);

export default Loader;

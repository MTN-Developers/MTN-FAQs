"use client";
import React, { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { store } from "./store";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <Provider store={store}>{children}</Provider>
    </AntdRegistry>
  );
};

export default Providers;

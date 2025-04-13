"use client";
import React, { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { store } from "./store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";

export const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NextTopLoader showSpinner={false} />
          {children}
        </QueryClientProvider>
      </Provider>
    </AntdRegistry>
  );
};

export default Providers;

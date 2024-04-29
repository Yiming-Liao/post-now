"use client"

import { SessionProvider } from "next-auth/react";

// 使用 SessionProvider 組件來提供 Session 資料，使其在應用的其他部分可用
const Provider = ({ children, session }) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}

export default Provider;
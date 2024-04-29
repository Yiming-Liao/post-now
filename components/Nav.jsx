"use client"

import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Nav = () => {
    const { data: session } = useSession();  // 從 NextAuth 獲取當前的 Session 資訊
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        (async () => { // 使用自執行的異步函數獲取身份提供者資訊
            const res = await getProviders();
            setProviders(res);
        })();  // 加上()來立即調用異步函數
    }, []);

    return (
        <div className='w-full h-20 flex justify-between items-center px-[5vw] shadow-lg'>
            <Link href='/'>
                <p>Post Now</p>
            </Link>

            <div className='flex'>
                {!session?.user ? (    // 使用者尚未登入時
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                key={provider.name}
                                onClick={() => {
                                    signIn(provider.id);
                                }}
                            >
                                使用 {provider.name} 登入
                            </button>
                        ))}
                    </>
                ) : (
                    <>
                        <div className='flex items-center gap-[2vw]'>
                            <Link
                                href='/create-post'
                                className='border-2 border-orange-200 rounded-3xl py-1 px-4'
                            >
                                發布
                            </Link>

                            <button onClick={() => signOut()}>
                                登出
                            </button>

                            <Link href='/profile'>
                                <Image
                                    className='rounded-lg'
                                    src={session?.user.image}
                                    width={37}
                                    height={37}
                                    alt='profile'
                                />
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Nav
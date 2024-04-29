"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from './Card';

const Posts = () => {
    const [allPosts, setAllPosts] = useState([]);
    const router = useRouter();  // 使用 useRouter 鈎子

    const fetchPosts = async () => {
        const response = await fetch("/api/posts/all");
        const data = await response.json();
        setAllPosts(data);
    }

    useEffect(() => {
        // 初始載入時抓取一次資料
        fetchPosts();

        // 註冊一個路由事件監聽器，當路由變化時重新抓取文章資料
        const handleRouteChange = (url) => {
            console.log('App is changing to: ', url);
            fetchPosts();
        }

        router.events?.on('routeChangeComplete', handleRouteChange);

        // 清理函數，移除監聽器以避免記憶體洩漏
        return () => {
            router.events?.off('routeChangeComplete', handleRouteChange);
        }
    }, [router]);  // 添加 router 作為依賴以確保監聽器正確註冊

    return (
        <section>
            <div className='flex justify-center gap-10 mt-16 flex-wrap'>
                {allPosts && allPosts.map((post) => (
                    <Card
                        key={post._id}
                        post={post}
                    />
                ))}
            </div>
        </section>
    )
}

export default Posts;

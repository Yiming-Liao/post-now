"use client"

import { useEffect, useState } from 'react';
import Card from './Card';

const Posts = () => {
    const [allPosts, setAllPosts] = useState([]);


    useEffect(() => {

        const fetchPosts = async () => {
            const response = await fetch("/api/posts/all");
            const data = await response.json();
            setAllPosts(data);
        }
        // 初始載入時抓取一次資料
        fetchPosts();
    }, []);

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

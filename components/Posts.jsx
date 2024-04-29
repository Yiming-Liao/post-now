"use client"

import { useEffect, useState } from 'react'
import Card from './Card'

const Posts = () => {
    const [allPosts, setAllPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch("/api/posts/all");
        const data = await response.json();
        setAllPosts(data);
    }

    useEffect(() => {
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

export default Posts
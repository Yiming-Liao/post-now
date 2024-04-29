"use client"

import React, { useEffect, useState } from 'react'
import Profile from '../../components/Profile'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const MyProfile = () => {

    const router = useRouter();
    const { data: session } = useSession();

    const [myPosts, setMyPosts] = useState([]);


    const fetchPosts = async () => {
        const response = await fetch(`/api/user/${session?.user.id}/posts`);
        const data = await response.json();
        setMyPosts(data);
    };

    useEffect(() => {
        if (session?.user.id) fetchPosts();
        console.log(myPosts)
    }, [session?.user.id]);

    const handleEdit = (post) => {
        router.push(`/edit-post?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "確定要刪除嗎?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/posts/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = myPosts.filter((item) => item._id !== post._id);

                setMyPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Profile
            name='我'
            desc='歡迎來到您的個人頁面。分享您的獨特創意，並透過您的想像力激勵他人。'
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile
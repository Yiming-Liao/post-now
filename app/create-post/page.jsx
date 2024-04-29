"use client";

import Form from "../../components/Form";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const CreatePost = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [content, setContent] = useState("");

    const createPost = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if (!session) {
            console.error("No user ID found, user might not be logged in.");
            return; // Early return to prevent the API call if user ID is not available
        }

        try {
            const response = await fetch('/api/posts/new', {
                method: "POST",
                body: JSON.stringify({
                    userId: session.user.id,
                    content: content,
                })
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <>
            <Form
                type="發布"
                content={content}
                setContent={setContent}
                submitting={submitting}
                onSubmit={createPost}
            />
        </>
    )
}

export default CreatePost
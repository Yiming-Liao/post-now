"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "../../components/Form";

const UpdatePost = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const postId = searchParams.get("id");

    const [content, setContent] = useState("");
    const [submitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const getPostDetails = async () => {
            const response = await fetch(`/api/posts/${postId}`);
            const data = await response.json();

            setContent(data.content);
        };

        if (postId) getPostDetails();
    }, [postId]);

    const updatePost = async (e) => {
        router.push("/");

        e.preventDefault();
        setIsSubmitting(true);

        if (!postId) return alert("Missing postId!");

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    content: content,
                }),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            type='Edit'
            content={content}
            setContent={setContent}
            submitting={submitting}
            handleSubmit={updatePost}
        />
    );
};

export default UpdatePost;

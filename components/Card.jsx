import Image from "next/image";
import { useSession } from 'next-auth/react'
import { usePathname } from "next/navigation";

const Card = ({ post, handleEdit, handleDelete }) => {
    const { data: session } = useSession();
    const pathName = usePathname();

    return (
        <div className="w-72 h-64 border-2 border-slate-600 rounded-2xl p-3">
            <div className="w-[98%] mx-auto h-12 border-b-2 border-slate-600 flex justify-start items-center pl-2 pb-2">
                <Image
                    src={post.creator.image}
                    alt='avatar'
                    width={35}
                    height={35}
                    className="mr-3 rounded-lg"
                />
                <h1>{post.creator.username}</h1>
            </div>
            <div className="flex flex-col justify-between h-[80%]">
                <p className="mt-5 ml-3">{post.content}</p>

                <div className="flex justify-center gap-20">
                    {session?.user.id === post.creator._id && pathName === "/profile" && (
                        <>
                            <button
                                className='bg-orange-500 text-white py-2 px-4 rounded-full invisible'
                                onClick={handleEdit}
                            >
                                修改
                            </button>
                            <button
                                className='bg-slate-700 text-white py-2 px-4 rounded-full'
                                onClick={handleDelete}
                            >
                                刪除
                            </button>
                        </>
                    )}
                </div>
            </div>



        </div>
    );
}

export default Card;

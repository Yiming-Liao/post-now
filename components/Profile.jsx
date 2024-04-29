import Card from "./Card";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    return (
        <section className='w-full'>
            <h1 className='text-left mx-[6vw] my-10'>
                <span className='text-4xl'>{name}的個人頁面</span>
            </h1>
            <p className='text-left mx-[6vw]'>{desc}</p>

            <div className='flex justify-center gap-10 mt-20 flex-wrap'>
                {data.map((post) => (
                    <Card
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Profile;

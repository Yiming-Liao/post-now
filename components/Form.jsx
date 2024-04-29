import Link from 'next/link'

const Form = ({ type, content, setContent, submitting, onSubmit }) => {
    return (
        <section className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl m-10'>{type}</h1>

            <form
                onSubmit={onSubmit}
            >
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='在此寫下內容...'
                    required
                    className='border-2 border-slate-500 rounded-2xl w-[350px] h-[250px] p-6'
                />
                <div className="flex justify-center gap-20">
                    <button
                        className='bg-orange-500 text-white py-2 px-4 rounded-full'
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? `${type}中...` : type}
                    </button>

                    <Link
                        href={type === "發布" ? '/' : '/profile'}
                        className='bg-slate-700 text-white py-2 px-4 rounded-full'
                    >
                        取消
                    </Link>
                </div>
            </form>
        </section>
    )
}

export default Form
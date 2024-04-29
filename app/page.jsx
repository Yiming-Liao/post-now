import Posts from "../components/Posts"


const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-10 mx-[5vw]">
        <div>
          <h1 className="text-6xl my-4">
            Post Now
          </h1>
          <h1 className="text-6xl my-4">
            即刻發文
          </h1>
          <p className="text-lg my-4">
            在Post Now，每個人都是故事的主角，隨時隨地發佈你的思緒、觀點與生活點滴。
          </p>
        </div>

        <Posts />
      </div>
    </>
  )
}

export default Home
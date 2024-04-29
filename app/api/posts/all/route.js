import Post from "../../../../models/post";
import { connectToDB } from "../../../../utils/database";

export const GET = async (request) => {
  try {
    // 嘗試連接到資料庫
    await connectToDB();

    // 查找所有 Post 資料，並填充 creator 欄位的詳細信息（參照 'User' 模型）
    const posts = await Post.find({}).populate('creator');

    // 如果查詢成功，返回含有所有 Posts 的 JSON 格式響應
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    // 如果有錯誤發生，返回錯誤訊息和狀態碼 500
    return new Response("Failed to fetch all posts", { status: 500 });
  }
}

/*
const posts = await Post.find({}).populate('creator');
運行完後會是以下結果:
[
  {
    "_id": "662f11d83971d9814fba4f41",
    "creator": {
      "_id": "662e421f16c0601c6a8e48d8",
      "email": "ivancreate1997@gmail.com",
      "username": "ivanliao",
      "image": "https://lh3.googleusercontent.com/a/ACg8ocLiQjYCcjPr_voXVWW9-i0RNtg1eZ…",
      "__v": 0
    },
    "post": "It's Awesome!",
    "__v": 0
  }
]
*/
import Post from "../../../../models/post";
import { connectToDB } from "../../../../utils/database";

export const POST = async (request) => {
    const { userId, content } = await request.json(); // 從請求體中解析 userId, content

    try {
        await connectToDB(); // 嘗試連接到資料庫
        const newPost = new Post({ creator: userId, content }); // 創建一個新的 Post 實例

        await newPost.save(); // 將新創建的 Post 實例保存到資料庫中
        return new Response(JSON.stringify(newPost), { status: 201 }) // 如果成功，返回新創建的 Post 和狀態碼 201
    } catch (error) {
        return new Response("Failed to create a new post", { status: 500 }); // 如果有錯誤發生，返回錯誤訊息和狀態碼 500
    }
}

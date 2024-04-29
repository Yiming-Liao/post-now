import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '../../../../models/user';  // Variable: User 模型 (email, username, image)
import { connectToDB } from '../../../../utils/database';  // function: 連線到 MongoDB

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDB();    // 嘗試連接到 MongoDB

                const userExists = await User.findOne({ email: profile.email });  // 檢查使用者是否已經存在

                if (!userExists) {    // 如果不存在，則創建新的使用者並儲存至 MongoDB
                    await User.create({
                        email: profile.email,    // 設定 email
                        username: profile.name.replace(" ", "").toLowerCase(),  // 設定 username，將名字中的空格移除並轉為小寫
                        image: profile.picture,    // 設定圖片為 Google 提供的頭像
                    });
                }

                return true;  // 登入成功
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);  // 如果查詢過程中有錯誤，記錄錯誤信息
                return false;  // 登入失敗
            }
        },

        // session -> 管理當前的登入狀態  // 新增 _id 到當前的使用者
        async session({ session }) {  // const { data: session } = useSession();
            const sessionUser = await User.findOne({ email: session.user.email });  // 根據 email 找到 MongoDB 中的該使用者
            session.user.id = sessionUser._id.toString();  // 將 MongoDB 的使用者 _id 轉換成字串並賦值給 session 的 user.id

            return session;  // 返回更新後的 session
        },
    }
})

export { handler as GET, handler as POST } // 將 handler 函數作為 GET 和 POST 方法導出

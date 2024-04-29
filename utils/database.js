import mongoose from 'mongoose';

let isConnected = false;    // Variable: 是否已經連線到DB

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);    // 設定查詢模式為'嚴格'

    if (isConnected) {
        console.log("MongoDB 已存在連線");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "post-now",    // Database名稱
        })

        isConnected = true;

        console.log("MongoDB 連線完成!")

    } catch (error) {
        console.log(error);
    }
}
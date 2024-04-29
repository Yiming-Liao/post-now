import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists!"],
        require: [true, "Email is required!"]
    },
    username: {
        type: String,
        require: [true, "Username is required!"]
    },
    image: {
        type: String  // Avatar 的 URL
    }
})

// 嘗試從已存在的模型中獲取 User 模型，如果不存在，則基於 UserSchema 創建新的 User 模型
// 這樣做可以避免在熱重載或多次調用時重複創建模型導致的錯誤
const User = models.User || model("User", UserSchema);

export default User;
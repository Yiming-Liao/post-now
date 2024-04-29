import { Schema, model, models } from 'mongoose'; // 從 mongoose 引入 Schema、model 和 models 方法

// 定義 PostSchema，這是一個新的資料結構模型
const PostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId, // creator 字段是一個 ObjectId，用於參照 User 模型
        ref: 'User', // 參照 'User' 這個模型  //*用來連結到指定使用者*
    },
    content: {
        type: String, // content 字段是一個字串
        required: [true, 'Content is required.'], // 這是一個必填字段，如果未填寫將返回錯誤提示
    }
});

// 檢查 models 是否已經有 Post 模型，如果有則使用現有的，如果沒有則創建新的模型
const Post = models.Post || model('Post', PostSchema);

export default Post; // 導出 Post 模型，使其可在其他文件中使用

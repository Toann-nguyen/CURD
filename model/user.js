// const mongoose = require('mongoose')
// 	const userSchema = new mongoose.Schema({
// 		Maso:mongoose.Schema.Types.Number,
// 		Name:mongoose.Schema.Types.String,
// 		Email:mongoose.Schema.Types.String,
// 		Pass:mongoose.Schema.Types.String
//   })
// 	const register = mongoose.model('Register', userSchema)
// 	module.exports = register

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	
Maso: { type: Number, required: true, unique: true, autoIncrement: true }, 
  fullname: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  notes: { type: String },
  avatar: { type: String }, // Lưu trữ đường dẫn ảnh hoặc dữ liệu ảnh 
  hobbies: { type: [String] } // Lưu trữ mảng sở thích
});


const register = mongoose.model('Register', userSchema);

module.exports = register;


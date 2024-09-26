const mongoose = require('mongoose')
	const userSchema = new mongoose.Schema({
		Maso:mongoose.Schema.Types.Number,
		Name:mongoose.Schema.Types.String,
		Email:mongoose.Schema.Types.String,
		Pass:mongoose.Schema.Types.String
  })
	const register = mongoose.model('Register', userSchema)
	module.exports = register
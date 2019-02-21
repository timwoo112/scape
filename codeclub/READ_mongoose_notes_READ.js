// Basic schema below
  let mongoose = require('mongoose')
  let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
  })
  module.exports = mongoose.model('User', userSchema)

// Instance methods
  userSchema.methods.getInitials = function() {
    return this.firstName[0] + this.lastName[0]
  }
  *Using the method*
  let model = new UserModel({
  firstName: 'Thomas',
  lastName: 'Anderson'
  })
  let initials = model.getInitials()
  console.log(initials) // This will output: TA

  // Middleware
  let mongoose = require('mongoose')
  let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    createdAt: Date,
    updatedAt: Date
  })
  module.exports = mongoose.model('User', userSchema)
  // Using the schema
  userSchema.pre('save', function (next) {
    let now = Date.now()

    this.updatedAt = now
    // Set a value for createdAt only if it is null
    if (!this.createdAt) {
      this.createdAt = now
    }
    // Call the next function in the pre-save chain
    next()
  })
  // Should output the updatedAt time as well as the createdAt time.
  { _id: 5a7bbbeebc3b49cb919da675,
  firstName: 'Thomas',
  lastName: 'Anderson',
  updatedAt: 2018-02-08T02:54:38.888Z,
  createdAt: 2018-02-08T02:54:38.888Z,
  __v: 0 }

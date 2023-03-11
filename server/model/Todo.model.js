import mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [
    {
      id: {
        type: String,
      },
      text: {
        type: String,
        required: true,
        unique: true,
      },
    },
  ],
});

export default mongoose.model('Todo', TodoSchema);

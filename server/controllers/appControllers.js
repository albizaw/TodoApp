import UserModel from '../model/User.model.js';
import TodoModel from '../model/Todo.model.js';
import bcrypt from 'bcrypt';

// POST REGISTER, LOGIN
// REGISTER
export async function signup(req, res) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).exec();
  if (user) {
    res.status(500);
    res.json({
      message: 'User already exist!',
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.create({ email, password: hashedPassword });
  res.status(201);
  res.json({ message: 'User was created', hashedPassword });
}

// LOGIN
export async function signin(req, res) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).exec();
  if (user && user.password) {
    const checkPassword = await bcrypt.compare(password, user.password);
  } else {
    res.status(500);
    res.json({
      message: 'Invalid login',
    });
    return;
  }

  res.status(201);
  res.json({ message: 'User Log in' });
}

// TODOS POST,GET, DELETE, PUT
// POST
export async function todosPost(req, res) {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [email, password] = token.split(':');
  const todosItems = req.body;

  const user = await UserModel.findOne({ email }).exec();
  if (user && user.password) {
    const checkPassword = await bcrypt.compare(password, user.password);
  } else {
    res.status(403);
    res.json({ message: 'Invalid action' });
    return;
  }

  const todos = await TodoModel.findOne({ userId: user._id }).exec();
  if (!todos) {
    await TodoModel.create({ userId: user._id, todos: todosItems });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.status(201);
  res.json(todosItems);
}

// GET
export async function todosGet(req, res) {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [email, password] = token.split(':');

  const user = await UserModel.findOne({ email }).exec();
  if (user && user.password) {
    const checkPassword = await bcrypt.compare(password, user.password);
  } else {
    res.status(403);
    res.json({
      message: 'Invalid action',
    });
    return;
  }

  const todosDocument = await TodoModel.findOne({ userId: user._id }).exec();
  if (todosDocument != null) {
    const { todos } = todosDocument;
    res.status(201);
    res.json(todos);
  }
}

// DELETE
export async function todosDelete(req, res) {
  const { id } = req.params;
  const { email, password } = req.headers;
  const user = await UserModel.findOne({ email }).exec();
  if (user && user.password) {
    const checkPassword = await bcrypt.compare(password, user.password);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const todos = await TodoModel.findOne({ userId: user._id }).exec();
  if (!todos) {
    res.status(404).json({ message: 'Todos not found' });
    return;
  }

  todos.todos = todos.todos.filter((todo) => todo.id !== id);
  await todos.save();
  res.status(200).json({ message: 'Todo deleted successfully' });
}

// UPDATE
export async function todosUpdate(req, res) {
  const { id } = req.params;
  const { email, password } = req.headers;
  const user = await UserModel.findOne({ email }).exec();
  if (user && user.password) {
    const checkPassword = await bcrypt.compare(password, user.password);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const todos = await TodoModel.findOne({ userId: user._id }).exec();
  if (!todos) {
    res.status(404).json({ message: 'Todos not found' });
    return;
  }

  const todo = todos.todos.find((todo) => todo.id === id);
  if (!todo) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  const { text } = req.body;
  if (text) {
    todo.text = text;
    await todos.save();
    res.status(200).json({ message: 'Todo updated successfully' });
  } else {
    res.status(400).json({ message: 'Bad request' });
  }
}

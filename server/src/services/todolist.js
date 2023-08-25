import TodoList from "../models/todolist.js";
import DatabaseError from "../models/error.js";

class TodoListService {
  static async list() {
    try {
      return TodoList.find();
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await TodoList.findOne({ _id: id }).exec();
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create(data) {
    try {
      const obj = new TodoList(data);
      await obj.save();
      return obj;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      return await TodoList.findOneAndUpdate({ _id: id }, data, {
        new: true,
        upsert: false,
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async delete(id) {
    try {
      const result = await TodoList.deleteOne({ _id: id }).exec();
      return result.deletedCount === 1;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default TodoListService;

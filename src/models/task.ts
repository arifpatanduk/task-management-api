import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db.config";

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string | null;
  public completed!: boolean;
}

Task.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
  }
);

export default Task;

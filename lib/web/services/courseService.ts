import { dynamoDB, TABLE_NAME } from '../../config/dynamodb';
import { Course } from '../models/course';
import { v4 as uuidv4 } from 'uuid';

export class CourseService {
  static async getAllCourses(): Promise<Course[]> {
    const params = { TableName: TABLE_NAME };
    const result = await dynamoDB.scan(params).promise();
    return result.Items as Course[];
  }

  static async getCourseById(id: string): Promise<Course | null> {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };
    const result = await dynamoDB.get(params).promise();
    return result.Item as Course || null;
  }

  static async createCourse(courseData: Omit<Course, "id">): Promise<Course> {
    const newCourse: Course = { id: uuidv4(), ...courseData };
    const params = {
      TableName: TABLE_NAME,
      Item: newCourse,
    };
    await dynamoDB.put(params).promise();
    return newCourse;
  }

  static async updateCourse(id: string, updateData: Partial<Course>): Promise<void> {
    const updateExpression = Object.keys(updateData)
      .map((key, index) => `${key} = :val${index}`)
      .join(", ");
    
    const expressionAttributeValues = Object.entries(updateData).reduce(
      (acc, [key, value], index) => ({ ...acc, [`:val${index}`]: value }),
      {}
    );

    const params = {
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: `set ${updateExpression}`,
      ExpressionAttributeValues: expressionAttributeValues,
    };

    await dynamoDB.update(params).promise();
  }

  static async deleteCourse(id: string): Promise<void> {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };
    await dynamoDB.delete(params).promise();
  }
}

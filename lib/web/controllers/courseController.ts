import { Request, Response } from 'express';
import { CourseService } from '../services/courseService';

export class CourseController {
  static async getAllCourses(req: Request, res: Response) {
    try {
      const courses = await CourseService.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async getCourseById(req: Request, res: Response) {
    try {
      const course = await CourseService.getCourseById(req.params.id);
      if (!course) return res.status(404).json({ message: "Course not found" });
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async createCourse(req: Request, res: Response) {
    try {
      const newCourse = await CourseService.createCourse(req.body);
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async updateCourse(req: Request, res: Response) {
    try {
      await CourseService.updateCourse(req.params.id, req.body);
      res.json({ message: "Course updated successfully" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async deleteCourse(req: Request, res: Response) {
    try {
      await CourseService.deleteCourse(req.params.id);
      res.json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

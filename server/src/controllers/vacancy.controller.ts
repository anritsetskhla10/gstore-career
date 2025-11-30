import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

//  Get all vacancies
export const getVacancies = async (req: Request, res: Response) => {
  try {
    const vacancies = await prisma.vacancy.findMany({ 
      orderBy: { createdAt: 'desc' } 
    });
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get a single vacancy
export const getVacancyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vacancy = await prisma.vacancy.findUnique({
      where: { id: parseInt(id) }
    });
    if (!vacancy) return res.status(404).json({ error: "Not found" });
    res.json(vacancy);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// create a vacancy
export const createVacancy = async (req: Request, res: Response) => {
  try {
    const { title, location, type, salary, description, deadline } = req.body;
    const newVacancy = await prisma.vacancy.create({
      data: {
        title,
        location: location || "Remote",
        type: type || "Full-time",
        salary: salary || "Negotiable",
        description,
        deadline: deadline ? new Date(deadline) : null
      }
    });
    res.json(newVacancy);
  } catch (error) {
    res.status(500).json({ error: "Error creating vacancy" });
  }
};

// delete a vacancy
export const deleteVacancy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.vacancy.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Vacancy deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting vacancy" });
  }
};

// Seeding (test data)
export const seedVacancies = async (req: Request, res: Response) => {
  try {
    const count = await prisma.vacancy.count();
    if (count === 0) {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      await prisma.vacancy.createMany({
        data: [
          { 
            title: "Senior React Developer", 
            location: "Tbilisi", 
            type: "Full-time", 
            salary: "7000 GEL",
            description: "React, TypeScript, Tailwind...",
            deadline: nextMonth 
          },
        ]
      });
      res.json({ message: "Database seeded" });
    } else {
      res.json({ message: "Database already seeded" });
    }
  } catch (error) {
    res.status(500).json({ error: "Seed Error" });
  }
};
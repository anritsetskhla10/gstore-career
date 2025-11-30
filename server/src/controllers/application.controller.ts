import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

//  Submit an application
export const submitApplication = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: "CV (PDF) is required" });
    
    const { fullName, email, phone, vacancyId } = req.body;
    
    if (!fullName || !email || !phone || !vacancyId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const application = await prisma.application.create({
      data: {
        fullName, 
        email, 
        phone,
        vacancyId: parseInt(vacancyId),
        cvPath: `/uploads/${req.file.filename}`
      }
    });
    res.status(201).json(application);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Application failed" });
  }
};

// Get applications (with filtering and sorting)
export const getApplications = async (req: Request, res: Response) => {
  try {
    const { vacancyId, sort } = req.query;
    const where: any = {};
    if (vacancyId) where.vacancyId = parseInt(vacancyId as string);

    let orderBy: any = { createdAt: 'desc' }; 
    if (sort === 'oldest') orderBy = { createdAt: 'asc' };
    else if (sort === 'a-z') orderBy = { fullName: 'asc' };
    else if (sort === 'z-a') orderBy = { fullName: 'desc' };

    const apps = await prisma.application.findMany({ 
      where, 
      orderBy, 
      include: { vacancy: { select: { title: true } } } 
    });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applications" });
  }
};
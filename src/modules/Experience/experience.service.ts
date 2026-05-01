import { prisma } from "../../lib/prisma";

const createExperience = async (payload: any) => {
  const result = await prisma.experience.create({
    data: {
      ...payload,
      startDate: new Date(payload.startDate),
      endDate: payload.endDate ? new Date(payload.endDate) : null
    }
  });
  return result;
};

const getAllExperience = async () => {
  const result = await prisma.experience.findMany({
    orderBy: {
      startDate: 'desc'
    }
  });
  return result;
};

const getExperienceById = async (id: string) => {
  const result = await prisma.experience.findUnique({
    where: { id }
  });
  return result;
};

const updateExperience = async (id: string, payload: any) => {
  const updateData = { ...payload };
  if (payload.startDate) updateData.startDate = new Date(payload.startDate);
  if (payload.endDate !== undefined) {
    updateData.endDate = payload.endDate ? new Date(payload.endDate) : null;
  }
  
  const result = await prisma.experience.update({
    where: { id },
    data: updateData
  });
  return result;
};

const deleteExperience = async (id: string) => {
  const result = await prisma.experience.delete({
    where: { id }
  });
  return result;
};

export const ExperienceService = {
  createExperience,
  getAllExperience,
  getExperienceById,
  updateExperience,
  deleteExperience
};

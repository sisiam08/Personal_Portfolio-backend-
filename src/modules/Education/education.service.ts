import { prisma } from "../../lib/prisma";

const createEducation = async (payload: any) => {
  const result = await prisma.education.create({
    data: payload
  });
  return result;
};

const getAllEducation = async () => {
  const result = await prisma.education.findMany({
    orderBy: {
      startYear: 'desc'
    }
  });
  return result;
};

const getEducationById = async (id: string) => {
  const result = await prisma.education.findUnique({
    where: { id }
  });
  return result;
};

const updateEducation = async (id: string, payload: any) => {
  const result = await prisma.education.update({
    where: { id },
    data: payload
  });
  return result;
};

const deleteEducation = async (id: string) => {
  const result = await prisma.education.delete({
    where: { id }
  });
  return result;
};

export const EducationService = {
  createEducation,
  getAllEducation,
  getEducationById,
  updateEducation,
  deleteEducation
};

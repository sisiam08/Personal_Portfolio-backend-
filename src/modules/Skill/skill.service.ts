import { SkillCreateInput, SkillUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { deleteFileFromCloudinary } from "../../config/cloudinary.config";

const createSkill = async (payload: SkillCreateInput) => {
  const result = await prisma.skill.create({
    data: payload
  });
  return result;
};

const getAllSkills = async () => {
  const result = await prisma.skill.findMany({
    orderBy: [
      { category: 'asc' },
      { level: 'desc' },
      { name: 'asc' }
    ]
  });
  return result;
};

const getSkillById = async (id: string) => {
  const result = await prisma.skill.findUnique({
    where: { id },
    include: {
      projects: {
        select: {
          id: true,
          title: true,
          slug: true,
        }
      }
    }
  });
  return result;
};

const updateSkill = async (id: string, payload: SkillUpdateInput) => {
  const existing = await prisma.skill.findUnique({ where: { id } });

  const result = await prisma.skill.update({
    where: { id },
    data: payload
  });

  if (payload.icon && existing?.icon && existing.icon !== payload.icon) {
    deleteFileFromCloudinary(existing.icon).catch(() => undefined);
  }

  return result;
};

const deleteSkill = async (id: string) => {
  const existing = await prisma.skill.findUnique({ where: { id } });

  const result = await prisma.skill.delete({
    where: { id }
  });

  if (existing?.icon) {
    deleteFileFromCloudinary(existing.icon).catch(() => undefined);
  }

  return result;
};

export const SkillService = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill
};

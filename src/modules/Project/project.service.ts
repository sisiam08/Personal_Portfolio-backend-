import { prisma } from "../../lib/prisma";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const createProject = async (payload: any) => {
  const { skills, ...projectData } = payload;

  const slug = generateSlug(projectData.title);

  // Handle unique slug
  const existingSlugs = await prisma.project.findMany({
    where: {
      slug: {
        startsWith: slug,
      },
    },
    select: { slug: true },
  });

  const slugSet = new Set(existingSlugs.map((s) => s.slug));

  let finalSlug = slug;
  let counter = 1;

  while (slugSet.has(finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }

  const result = await prisma.project.create({
    data: {
      ...projectData,
      slug: finalSlug,
      ...(skills &&
        skills.length > 0 && {
          skills: {
            connect: skills.map((id: string) => ({ id })),
          },
        }),
    },
    include: {
      skills: true,
    },
  });

  return result;
};

const getAllProjects = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const result = await prisma.project.findMany({
    skip,
    take: limit,
    include: {
      skills: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.project.count();

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

const getProjectBySlug = async (slug: string) => {
  const result = await prisma.project.findUnique({
    where: { slug },
    include: {
      skills: true,
    },
  });
  return result;
};

const updateProject = async (id: string, payload: any) => {
  const { skills, ...projectData } = payload;

  if (projectData.title) {
    projectData.slug = generateSlug(projectData.title);
    // Note: in a real app you might want to check if the new slug exists,
    // but ignoring for simplicity unless required.
  }

  const result = await prisma.project.update({
    where: { id },
    data: {
      ...projectData,
      ...(skills && {
        skills: {
          set:
            Object.keys(skills).length > 0
              ? skills.map((skillId: string) => ({ id: skillId }))
              : [],
        },
      }),
    },
    include: {
      skills: true,
    },
  });

  return result;
};

const deleteProject = async (id: string) => {
  const result = await prisma.project.delete({
    where: { id },
  });
  return result;
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
};

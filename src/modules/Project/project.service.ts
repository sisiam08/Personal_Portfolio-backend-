import { prisma } from "../../lib/prisma";
import { deleteFileFromCloudinary } from "../../config/cloudinary.config";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const buildUniqueSlug = async (base: string, excludeId?: string) => {
  const existing = await prisma.project.findMany({
    where: {
      slug: { startsWith: base },
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { slug: true },
  });

  const slugSet = new Set(existing.map((s) => s.slug));
  let finalSlug = base;
  let counter = 1;
  while (slugSet.has(finalSlug)) {
    finalSlug = `${base}-${counter}`;
    counter++;
  }
  return finalSlug;
};

const createProject = async (payload: any) => {
  const { skills, ...projectData } = payload;

  const slug = await buildUniqueSlug(generateSlug(projectData.title));

  // Append new projects to the end of the custom order.
  const maxOrder = await prisma.project.aggregate({ _max: { order: true } });
  const order = (maxOrder._max.order ?? -1) + 1;

  const result = await prisma.project.create({
    data: {
      ...projectData,
      slug,
      order,
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
    orderBy: [{ order: "asc" }, { createdAt: "desc" }, { id: "asc" }],
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

  const existing = await prisma.project.findUnique({ where: { id } });

  if (projectData.title) {
    projectData.slug = await buildUniqueSlug(
      generateSlug(projectData.title),
      id,
    );
  }

  const result = await prisma.project.update({
    where: { id },
    data: {
      ...projectData,
      ...(skills && {
        skills: {
          set: skills.map((skillId: string) => ({ id: skillId })),
        },
      }),
    },
    include: {
      skills: true,
    },
  });

  if (
    projectData.image &&
    existing?.image &&
    existing.image !== projectData.image
  ) {
    // Best-effort cleanup; never fail the request because of an orphaned asset.
    deleteFileFromCloudinary(existing.image).catch(() => undefined);
  }

  return result;
};

const deleteProject = async (id: string) => {
  const existing = await prisma.project.findUnique({ where: { id } });

  const result = await prisma.project.delete({
    where: { id },
  });

  if (existing?.image) {
    deleteFileFromCloudinary(existing.image).catch(() => undefined);
  }

  return result;
};

const reorderProjects = async (ids: string[]) => {
  const existing = await prisma.project.findMany({ select: { id: true } });
  const existingIds = new Set(existing.map((p) => p.id));

  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== ids.length) {
    throw Object.assign(new Error("Duplicate project ids are not allowed"), {
      statusCode: 400,
    });
  }

  if (ids.length !== existingIds.size) {
    throw Object.assign(
      new Error(
        `The reorder list must contain all ${existingIds.size} projects (received ${ids.length})`,
      ),
      { statusCode: 400 },
    );
  }

  const unknownId = ids.find((id) => !existingIds.has(id));
  if (unknownId) {
    throw Object.assign(new Error(`Project ${unknownId} was not found`), {
      statusCode: 400,
    });
  }

  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.project.update({ where: { id }, data: { order: index } }),
    ),
  );

  return { count: ids.length };
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
  reorderProjects,
};

import { prisma } from "../../lib/prisma";

const createMessage = async (payload: any) => {
  const result = await prisma.message.create({
    data: payload
  });
  return result;
};

const getAllMessages = async () => {
  const result = await prisma.message.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return result;
};

const deleteMessage = async (id: string) => {
  const result = await prisma.message.delete({
    where: { id },
  });
  return result;
};

export const MessageService = {
  createMessage,
  getAllMessages,
  deleteMessage
};

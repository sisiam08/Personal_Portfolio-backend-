import { Router } from "express";
import { IRoute } from "../types";
import { UserRoutes } from "../modules/User/user.router";
import { SkillRoutes } from "../modules/Skill/skill.router";
import { ProjectRoutes } from "../modules/Project/project.router";
import { ExperienceRoutes } from "../modules/Experience/experience.router";
import { EducationRoutes } from "../modules/Education/education.router";
import { MessageRoutes } from "../modules/Message/message.router";

const router = Router();

const routes: IRoute[] = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/skills",
    route: SkillRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/experiences",
    route: ExperienceRoutes,
  },
  {
    path: "/educations",
    route: EducationRoutes,
  },
  {
    path: "/messages",
    route: MessageRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

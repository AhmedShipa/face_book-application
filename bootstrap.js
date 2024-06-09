import commentRouter from "./modules/comment/comment.routes.js";
import postRouter from "./modules/post/post.routes.js";
import userRouter from "./modules/user/user.routes.js";

const bootstrap = (app) => {
  app.use(userRouter);
  app.use(postRouter);
  app.use(commentRouter);
};
export default bootstrap;

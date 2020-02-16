import { Router } from "express";
import graphqlHTTP from "express-graphql";

import schema from "../../../graphql/schema";

import HeaderToTokenMiddleware from "../../../middlewares/headerToToken.middleware";
import AuthMiddleware from "../../../middlewares/auth.middleware";

const router = Router();

router.use(
  "/",
  /*HeaderToTokenMiddleware,
  AuthMiddleware,*/
  graphqlHTTP((req: any) => ({
    schema,
    graphiql: true,
    context: {
      user: req.user
    }
  }))
);

export default router;

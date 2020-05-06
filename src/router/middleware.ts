import { Request, Response, NextFunction } from "express";

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("Please login");
  }
};

const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("Login users cannot access the page");
  }
};

export { isLoggedIn, isLoggedOut };

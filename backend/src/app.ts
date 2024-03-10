import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import logger from "./utils/logger";
import cors from "cors";
import connectDB from "./utils/connectDB";
import userDetailRouter from "./routes/userDetail.route";
import userRouter from "../src/routes/user.route";
import serviceRouter from "../src/routes/service.route";
import testimonialRouter from "./routes/testimonial.route";
import faqRouter from "./routes/faq.route";
import dealRouter from "./routes/deal1.route";
import dealFaqRouter from "./routes/dealFaq.route";
import dealEnquiryRouter from "./routes/dealEnquiry.routes";
import serviceEnquiryRouter from "./routes/serviceEnquiry.routes";
import dealCategoryRouter from "./routes/dealCategory.route";
import companyRouter from "./routes/company.route";
import enquiryRouter from "./routes/enquiry.route";
import contactRouter from "./routes/contact.route";
import adminRouter from "./routes/admin.route";
import emailRouter from "./routes/email.route";

import cookieParser from "cookie-parser"
import blogCategoryRouter from './routes/blogCategory.route';
import applicationRouter from './routes/application.route'
import blogRouter from './routes/blog.route'
import jobRouter from './routes/jobInformation.route'
import packageRouter from './routes/package.route';
import packageEnquiryRouter from './routes/packageEnquiry.route';



const app = express();
const port = 5007;

// Middleware

// Body Parser middleware
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://demo.expertbusiness.com.np", "http://demo.expertbusiness.com.np", "http://localhost:3000","https://vercel-frontend-sand.vercel.app/"],
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// Route
app.use("/api/users", userRouter);
app.use("/api/user-detail", userDetailRouter);
app.use("/api/services", serviceRouter);
app.use("/api/testimonials", testimonialRouter);
app.use("/api/faqs", faqRouter);
app.use("/api/deals", dealRouter);
app.use("/api/deal-faqs", dealFaqRouter);
app.use("/api/deal-enquiries", dealEnquiryRouter);
app.use("/api/service-enquiries", serviceEnquiryRouter);
app.use("/api/categories-deal", dealCategoryRouter);
app.use("/api/categories-blog", blogCategoryRouter);
app.use("/api/companies", companyRouter);

app.use('/api/enquiries',enquiryRouter);
app.use('/api/contacts',contactRouter);
app.use('/api/admin',adminRouter);
app.use('/api/emails',emailRouter);
app.use('/api/applications',applicationRouter);
app.use('/api/blogs',blogRouter);
app.use('/api/jobs',jobRouter);
app.use('/api/packages',packageRouter);
app.use('/api/package-enquiries',packageEnquiryRouter);


// Testing
app.get("/healthChecker", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to expert business Server.",
  });
});


//check cookie


// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});




app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connectDB();
});

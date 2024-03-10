import express from "express";

import { deleteEnquiryHandler, getAllEnquiriesHandler, getEnquiryHandler, updateEnquiryHandler } from "../controller/enquiry.controller";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

router.get(
    "/",
    getAllEnquiriesHandler
  )

  router.get('/:enquiryId',
  getEnquiryHandler
  )
  router.patch('/:enquiryId', requireSuperAdmin,updateEnquiryHandler);
  router.delete('/:enquiryId',requireSuperAdmin,deleteEnquiryHandler);
  export default router;
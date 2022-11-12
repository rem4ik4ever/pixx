import { createRouter } from "./context";
import testimonialService from '../services/testimonial'
import * as yup from 'yup'
import { TestimonialType } from "@prisma/client";
import signS3Upload from "../services/aws";

const inputValidation = yup.object({
  filename: yup.string().required('missing filetype'),
  filetype: yup.string().required('missing filetype')
})

export const uploadRouter = createRouter()
  .mutation("getSignedURL", {
    input: inputValidation,
    async resolve({ input }) {
      try {
        const { filename, filetype } = input
        const result = await signS3Upload({ filename, filetype })
        return {
          data: result
        };
      } catch (error) {
        return {
          error,
          data: null
        };
      }
    },
  })

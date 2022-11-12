import { createRouter } from "./context";
import testimonialService from '../services/testimonial'
import * as yup from 'yup'
import { TestimonialType } from "@prisma/client";

const inputValidation = yup.object({
  testimonial: yup.object({
    type: yup.string().required(),
    content: yup.string().when('type', {
      is: TestimonialType.TEXT,
      then: schema => schema.max(250).required('Missing testimonial text')
    }),
    rating: yup.number().min(1).max(5).when({
      is: TestimonialType.SOCIAL,
      then: schema => schema.notRequired(),
      otherwise: schema => schema.required('Please add your rating')
    }),
    videoUrl: yup.string().when({
      is: TestimonialType.VIDEO,
      then: schema => schema.required('Please record video first'),
      otherwise: schema => schema.notRequired()
    })
  }),
  profile: yup.object({
    name: yup.string().required("Required"),
    email: yup.string().email('Must be a valid email').required("Required"),
  })
})

export const testimonialRouter = createRouter()
  .mutation("createTestimonial", {
    input: inputValidation,
    async resolve({ ctx, input }) {
      try {
        const result = await testimonialService.create({
          ...input.testimonial,
          from: input.profile
        })
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

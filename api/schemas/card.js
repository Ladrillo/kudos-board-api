import * as yup from 'yup'

export const createCardSchema = yup.object({
  title: yup.string().required().min(1),
  description: yup.string().required().min(1),
  gif: yup.string().url().required(),
  owner: yup.string().optional().nullable(),
}).strict(true)

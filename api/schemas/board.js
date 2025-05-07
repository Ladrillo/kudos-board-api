import * as yup from 'yup'

export const createBoardSchema = yup.object({
  title: yup.string().required().min(1),
  category: yup.string().required().min(1),
  owner: yup.string().required().min(1),
}).strict(true)

const create = async (data: any) => {
  const result = await prisma?.testimonial.create({
    data
  })

  return result;
}

const service = {
  create
}

export default service;

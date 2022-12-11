import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (reg: NextApiRequest, res: NextApiResponse): Promise<void> {
  const prisma = new PrismaClient()

  const jeans = await prisma.jeans.findMany({
    include: {
      sizeXS: true,
      sizeS: true,
      sizeM: true,
      sizeL: true,
      sizeXL: true,
      rating: true
    }
  })

  if (jeans.length) {
    res.status(200).json(jeans)
    res.end()
  } else {
    res.status(404).json({ message: 'No data' })
    res.end()
  }
}

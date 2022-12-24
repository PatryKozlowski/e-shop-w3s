import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

const updateUserAddress = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  if (req.method === 'POST') {
    const { street, name, city } = req.body

    if (!street) {
      res.status(404).json({ message: 'Enter your adress', status: 404 })
    }

    if (!name) {
      res.status(404).json({ message: 'Enter your first name and last name ', status: 404 })
    }

    if (!city) {
      res.status(404).json({ message: 'Enter your city', status: 404 })
    }

    const userId = session?.user?.id as string

    const updateAddress = await prisma.usersAdress.upsert({
      where: {
        userId
      },
      update: {
        name,
        street,
        city
      },
      create: {
        userId,
        name,
        street,
        city
      }
    })

    if (updateAddress) {
      res.status(200).json({ message: 'You have successfully updated your data', status: 200 })
    } else {
      res.status(500).json({ message: 'Error occured', status: 500 })
    }
  } else {
    res.status(500).json({ message: 'HTTP method not valid (only PATCH)' })
  }
}

export default updateUserAddress

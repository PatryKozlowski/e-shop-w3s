import { compare, hash } from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PASSWORD_ERROR_VALIDATION, PASSWORD_REQUIRED_VALIDATION, REPEAT_PASSWORD_ERROR_VALIDATION } from '../../../lib/formValidation'
import prisma from '../../../lib/prisma'

const updatPassword = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized', status: 401 })
  }

  if (req.method === 'PATCH') {
    const saltRounds = 12
    const { password, newPassword, confirmePassword } = req.body

    const isUserExists = await prisma.user.findUnique({
      where: {
        id: session?.user?.id
      }
    })

    if (!isUserExists) {
      return res.status(404).json({ message: 'User not exists', status: 404 })
    }

    if (!password) {
      return res.status(404).json({ message: PASSWORD_REQUIRED_VALIDATION, status: 404 })
    }

    if (!newPassword) {
      return res.status(404).json({ message: PASSWORD_REQUIRED_VALIDATION, status: 404 })
    }

    if (password.length < 8 || newPassword.length < 8 || confirmePassword.length < 8) {
      return res.status(404).json({ message: PASSWORD_ERROR_VALIDATION, status: 404 })
    }

    if (!(newPassword === confirmePassword)) {
      return res.status(404).json({ message: REPEAT_PASSWORD_ERROR_VALIDATION, status: 404 })
    }

    const oldUserPassword = isUserExists?.password as string

    const compareHashedPassword = await compare(password, oldUserPassword)

    if (!compareHashedPassword) {
      return res.status(404).json({ message: REPEAT_PASSWORD_ERROR_VALIDATION, status: 404 })
    }

    const hashedNewPassword = await hash(newPassword, saltRounds)

    const isChangedPassword = await prisma.user.update({
      where: {
        id: session?.user?.id
      },
      data: {
        password: hashedNewPassword
      }
    })

    if (isChangedPassword) {
      return res.status(200).json({ message: 'The password has been changed successfully', status: 200 })
    } else {
      return res.status(500).json({ message: 'During changed password error occured', status: 500 })
    }
  } else {
    return res.status(405).json({ message: 'HTTP method not valid (only PATCH)' })
  }
}

export default updatPassword

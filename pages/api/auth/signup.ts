import { NextApiRequest, NextApiResponse } from 'next'
import { EMAIL_REQUIRED_VALIDATION, PASSWORD_REQUIRED_VALIDATION, REPEAT_PASSWORD_ERROR_VALIDATION, PASSWORD_ERROR_VALIDATION, USER_EXISTS, SUCCESSFULLY_REGISTERED, UNABLE_LINK_ACCOUNT_USER_PROFILE } from '../../../lib/formValidation'
import prisma from '../../../lib/prisma'
import { hash } from 'bcrypt'

const signUpHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { email, password, repeatPassword } = req.body
  const saltRounds = 12

  if (req.method === 'POST') {
    if (!email) {
      res.status(404).json({ message: EMAIL_REQUIRED_VALIDATION, status: 404 })
    }

    if (!password) {
      res.status(404).json({ message: PASSWORD_REQUIRED_VALIDATION, status: 404 })
    }

    if (!repeatPassword) {
      res.status(404).json({ message: PASSWORD_REQUIRED_VALIDATION, status: 404 })
    }

    if (password.length < 8 || repeatPassword.length < 8) {
      res.status(404).json({ message: PASSWORD_ERROR_VALIDATION, status: 404 })
    }

    const isUserExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (isUserExists) {
      res.status(404).json({ message: USER_EXISTS, status: 404 })
    }

    if (!(password === repeatPassword)) {
      res.status(404).json({ message: REPEAT_PASSWORD_ERROR_VALIDATION, status: 404 })
    }

    const hashedPassword = await hash(password, saltRounds)

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword
      }
    })

    const account = await prisma.account.create({
      data: {
        userId: user.id,
        type: 'credentials',
        provider: 'credentials',
        providerAccountId: user.id
      }
    })

    if (user && account) {
      res.status(200).json({ message: SUCCESSFULLY_REGISTERED, status: 200 })
    } else {
      res.status(500).json({ message: UNABLE_LINK_ACCOUNT_USER_PROFILE, status: 500 })
    }
  } else {
    res.status(405).json({ message: 'HTTP method not valid (only POST)' })
  }
}

export default signUpHandler

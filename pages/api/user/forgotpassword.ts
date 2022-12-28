import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken'
import { transporter } from '../../../lib/nodemailer'

const forgetpassword = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'POST') {
    const { email } = req.body

    const isUserExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!isUserExists) {
      return res.status(404).json({ message: 'User not exists', status: 404 })
    }
    const JWT_SECRET = process.env.JWT_SECRET as string

    const secret = `${String(JWT_SECRET)}${String(isUserExists?.password)}`

    const id = isUserExists?.id
    const emailJWT = isUserExists?.email as string
    const url = process.env.NEXT_PUBLIC_API_URL as string

    const payload = {
      id,
      email: emailJWT
    }

    const recoveryPasswordToken = jwt.sign(payload, secret, { expiresIn: '5m' })

    const recoveryPasswordURL = `${url}/user/forgot-password/${id}/${recoveryPasswordToken}`

    const mailData = {
      from: process.env.EMAIL_USER_SERVICE as string,
      to: emailJWT,
      subject: 'Recovery password link - E-commerce w3school',
      text: 'Here is your password change link',
      html: `<h1>Reset password link</h1><a href='${recoveryPasswordURL}'>E-commerce-w3school reset password link</a>`
    }

    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.log(err)
        return res.status(404).json({ message: 'Error occured during send email', status: 404 })
      } else {
        return res.status(200).json({ message: 'Password reset link has been send to your email', status: 200 })
      }
    })
  } else {
    return res.status(405).json({ message: 'HTTP method not valid (only POST)' })
  }
}

export default forgetpassword

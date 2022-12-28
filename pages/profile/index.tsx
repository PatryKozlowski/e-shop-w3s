import type { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

import UserAddress from '../../components/UserAddress'
import type { UserAddressProps } from '../../types/index'
import PasswordChange from '../../components/PasswordChange'

const Profile = ({ userInfo }: UserAddressProps): JSX.Element => {
  return (
    <div className={'flex flex-col w-full justify-center h-full space-y-8 mb-8'}>
      <UserAddress userInfo={userInfo} />

      <PasswordChange />
    </div>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx })

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  const userInfo = await prisma.usersAdress.findUnique({
    where: {
      userId: session?.user?.id
    }
  })

  return {
    props: {
      userInfo: JSON.parse(JSON.stringify(userInfo))
    }
  }
}

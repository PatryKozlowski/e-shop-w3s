import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client'
import { useForm } from 'react-hook-form'
import type { ProductProps } from '../../types'

const prisma = new PrismaClient()

const JeansOnePage = ({ product }: ProductProps): React.ReactElement => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      productId: product.id,
      size: ''
    }
  })

  const handleProduct = (data: any): void => {
    console.log(data)
  }

  const { sizeXS, sizeS, sizeM, sizeL, sizeXL } = product
  const sizes = [...sizeXS, ...sizeS, ...sizeM, ...sizeL, ...sizeXL]

  return (
    <>
      <Head>
        <title>Clothes shop - {product?.name}</title>
        <meta
          name={'description'}
          content={'The best clothes on the world'}
        />
        <link
          rel={'icon'}
          href={'/favicon.ico'}
        />
      </Head>
      <div className={'grid grid-cols-1 lg:grid-cols-2 gap-9 my-4 px-4 lg:px-0'}>
        <Image
          src={product?.image}
          alt={product?.name}
          width={'0'}
          height={'0'}
          sizes={'100vw'}
          className={'w-full h-auto'}
        />
        <div className={'flex flex-col justify-evenly'}>
          <h2 className={'text-2xl font-normal mb-4'}>{product?.name}</h2>
          <p>
            {product?.description}
          </p>
          <form
            onSubmit={handleSubmit(handleProduct)}
            className={'flex justify-between flex-wrap'}
          >
            {
              sizes.length === 0 ?
                <p className={'font-semibold mt-5'}>Out of stock</p>
                :
                sizes.map((size) => (
                  <div
                    className={'space-y-5 lg:space-y-0 peer'}
                    key={size?.id}
                  >
                    <div className={'flex flex-col items-center space-y-1'}>
                      <input
                        className={'appearance-none peer mt-5'}
                        {...register('size', { required: true })}
                        type={'radio'}
                        value={size?.size}
                        id={size?.size}
                      />
                      <label
                        htmlFor={size?.size}
                        className={'p-4 border border-black w-14 h-14 text-center peer-checked:text-blue-800 peer-checked:border-2 peer-checked:font-semibold hover:text-gray-600 hover:bg-gray-100 hover:scale-105 transition ease-in-out duration-300 cursor-pointer'}
                      >
                        {size.size}
                      </label>
                      <span className={''}>{size?.stock}</span>
                    </div>
                  </div>
                ))
              }
            {
              sizes.length === 0 ?
                null
                :
                <button
                  type={'submit'}
                  className={'mt-5 border border-black p-6 w-full hover:text-gray-600 hover:font-semibold hover:bg-gray-300 transition ease-in-out duration-300 cursor-pointer'}
                >
                  Add to cart &nbsp;
                  <span className={'font-semibold'}>
                    ${product?.price}
                  </span>
                </button>
            }
          </form>
        </div>
      </div>
    </>
  )
}

export default JeansOnePage

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string
  const product = await prisma.jeans.findUnique({
    where: {
      id
    },
    include: {
      sizeXS: true,
      sizeS: true,
      sizeM: true,
      sizeL: true,
      sizeXL: true,
      rating: true
    }
  })

  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await prisma.jeans.findMany()
  const productId = products?.map((product) => ({ params: { id: product.id } }))
  return {
    paths: productId,
    fallback: false
  }
}

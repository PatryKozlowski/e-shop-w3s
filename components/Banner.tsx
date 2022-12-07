import Image from 'next/image'

const Banner = (): JSX.Element => {
  return (
    <section className={'relative px-4 lg:px-0'}>
      <Image
        src={'https://www.w3schools.com/w3images/jeans.jpg'}
        alt={'Banner image'}
        width={918}
        height={612}
        className={'object-fill'}
      />
      <div className={'text-white font-normal absolute top-8 left-8'}>
        <h1 className={'text-4xl md:text-6xl my-3'}>New arrivals</h1>
        <h2 className={'hidden md:block  text-4xl my-3'}>COLLECTION 2016</h2>
        <button className={'my-1 px-6 py-3 bg-black text-lg hoverNav hover:text-black'}>SHOP NOW</button>
      </div>
    </section>
  )
}

export default Banner

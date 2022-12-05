
const Subscribe = (): JSX.Element => {
  return (
    <section
      className={'flex flex-col px-4 py-8 bg-black text-white'}
    >
      <form className={'w-full'}>
        <h2 className={'my-3 text-4xl'}>Subscribe</h2>
        <p className={'my-3'}>To get special offers and VIP treatment:</p>
        <input
          placeholder={'Enter e-mail'}
          className={'p-2 w-full'}
        />
        <div className={'my-3'}>
          <button className={'p-2 bg-red-500 cursor-pointer hover:bg-gray-300 hover:text-black transition ease-in-out duration-500'}>Subscribe</button>
        </div>
      </form>
    </section>
  )
}

export default Subscribe

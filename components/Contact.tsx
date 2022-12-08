import Link from 'next/link'
import { MdLocationOn, MdPhone, MdEmail, MdCreditCard } from 'react-icons/md'
import { FaCcAmex, FaFacebookSquare, FaInstagram, FaSnapchatSquare, FaPinterestP, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { aboutItems as About, storeItems as Store, paymentItems as Payment, socialItems as Social } from '../types'

const Contact = (): JSX.Element => {
  const aboutItems: About[] = [
    { title: 'About us', href: '/' },
    { title: 'We\'re hiring', href: '/' },
    { title: 'Support', href: '/' },
    { title: 'Find store', href: '/' },
    { title: 'Shipment', href: '/' },
    { title: 'Payment', href: '/' },
    { title: 'Gift card', href: '/' },
    { title: 'Return', href: '/' },
    { title: 'Help', href: '/' }
  ]

  const sotreItems: Store[] = [
    { title: 'Company Name', icon: <MdLocationOn /> },
    { title: '0044123123', icon: <MdPhone /> },
    { title: 'ex@mail.com', icon: <MdEmail /> }
  ]

  const paymentItems: Payment[] = [
    { title: 'Amex', icon: <FaCcAmex /> },
    { title: 'Credit Card', icon: <MdCreditCard /> }
  ]

  const socialItems: Social[] = [
    { icon: <FaFacebookSquare />, href: 'https://github.com/PatryKozlowski' },
    { icon: <FaInstagram />, href: 'https://github.com/PatryKozlowski' },
    { icon: <FaSnapchatSquare />, href: 'https://github.com/PatryKozlowski' },
    { icon: <FaPinterestP />, href: 'https://github.com/PatryKozlowski' },
    { icon: <FaLinkedin />, href: 'https://github.com/PatryKozlowski' },
    { icon: <FaTwitter />, href: 'https://github.com/PatryKozlowski' }
  ]

  return (
    <section className={'bg-gray-200 flex basis-1/3 py-16 text-center'}>
      <form className={'px-4 flex flex-col space-y-4 text-xs w-1/3'}>
        <h4 className={'text-xl my-2'}>Contact</h4>
        <p className={'my-3'}>Questions? Go ahead.</p>
        <input
          className={'p-2 border'}
          type={'text'}
          placeholder={'Name'}
        />
        <input
          className={'p-2 border'}
          type={'text'}
          placeholder={'Email'}
        />
        <input
          className={'p-2 border'}
          type={'text'}
          placeholder={'Subject'}
        />
        <input
          className={'p-2 border'}
          type={'text'}
          placeholder={'Message'}
        />
        <button className={'py-2 px-4 bg-black text-white hover:bg-gray-400 hover:text-black transition ease-in-out duration-700 cursor-pointer'}>
          Send
        </button>
      </form>
      <div className={'text-xs mx-2 w-1/3'}>
        <h4 className={'my-2 text-xl'}>About</h4>
        <div className={'space-y-4 flex flex-col '}>
          {
            aboutItems.map(({ title, href }, index) => (
              <Link
                key={index}
                className={'underline'}
                href={href}
              > {title}
              </Link>
            ))
          }
        </div>
      </div>
      <div className={'text-xs space-y-3'}>
        <div className={'flex items-start flex-col space-y-3'}>
          <h4 className={'my-2 text-xl'}>Store</h4>
          {
            sotreItems.map(({ title, icon }, index) => (
              <div
                className={'flex items-center space-x-1'}
                key={index}
              >
                {icon}
                <p>
                  {title}
                </p>
              </div>
            ))
          }
        </div>
        <div className={'flex items-start flex-col space-y-3'}>
          <h4 className={'my-2 text-xl'}>We accept</h4>
          {
            paymentItems.map(({ title, icon }, index) => (
              <div
                className={'flex items-center space-x-2'}
                key={index}
              >
                {icon}
                <p>
                  {title}
                </p>
              </div>
            ))
          }
        </div>
        <div className={'flex space-x-2 text-lg'}>
          {
            socialItems.map(({ icon, href }, index) => (
              <Link
                className={'my-4 hover:scale-125 transition ease-in-out duration-300 cursor-pointer'}
                key={index}
                href={href}
                target={'_blank'}
              >
                {icon}
              </Link>
            ))
          }
        </div>
      </div>
    </section >
  )
}

export default Contact

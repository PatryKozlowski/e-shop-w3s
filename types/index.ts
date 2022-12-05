import { ReactElement } from 'react'
// Contact types
export interface Icon { icon: ReactElement }

export interface aboutItems {
  title: string
  href: string
}

export interface storeItems extends Icon {
  title: string
}

export interface paymentItems extends Icon {
  title: string
}

export interface socialItems extends Icon {
  href: string
}
//

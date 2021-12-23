import { rakutenData } from 'data/rakutenData'
import { hotPepperData } from 'data/hotPepperData'
import { addressData } from 'data/addressData'

export type CounterState = {
  value: number
}

export type RakutenRes = typeof rakutenData
export type RakutenQueryType = typeof rakutenData.hotels

export type HotPepperRes = typeof hotPepperData
export type HotPepperQueryType = typeof hotPepperData.results.shop

export type AddressRes = typeof addressData
export type AddressQueryType = typeof addressData.results[0]

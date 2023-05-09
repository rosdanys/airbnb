'use client'

import Container from '../common/Container'
import { FaSkiing } from 'react-icons/fa'
import { IoDiamond } from 'react-icons/io5'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi'
import { BsSnow } from 'react-icons/bs'
import { MdOutlineVilla } from 'react-icons/md'
import CategoriesBox from '../common/CategoriesBox'
import { usePathname, useSearchParams } from 'next/navigation'

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is Modern',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property has a pool',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on a Island',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is closed for lake!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities',
  },
  {
    label: 'Castle',
    icon: GiCastle,
    description: 'This property is in a castle',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has camping activities',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property has camping activities',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This property is in a cave',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert ',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in the Barn ',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is  luxurious',
  },
]

function Categories() {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()

  const isMainPage = pathname === '/'
  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div
        className='
      pt-4
      flex
      flex-row
      justify-between
      items-center
      overflow-x-auto
      '
      >
        {categories.map(item => (
          <CategoriesBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories

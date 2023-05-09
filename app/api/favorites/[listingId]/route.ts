import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface IParams {
  listingId: string
}
// add in favorites
export async function POST(request: Request, { params }: { params: IParams }) {
  const currrentUser = await getCurrentUser()
  if (!currrentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('invalid listingsId')
  }

  let favoriteIds = [...(currrentUser.favoriteIds || [])]
  favoriteIds.push(listingId)

  const user = await prisma.user.update({
    where: { id: currrentUser.id },
    data: {
      favoriteIds,
    },
  })

  return NextResponse.json(user)
}
// Delete from favorites
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currrentUser = await getCurrentUser()
  if (!currrentUser) {return NextResponse.error()}

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('invalid ID')
  }

  let favoriteIds = [...(currrentUser.favoriteIds || [])]
  favoriteIds = favoriteIds.filter(id => id !== listingId)

  const user = await prisma.user.update({
    where: { id: currrentUser.id },
    data: {
      favoriteIds,
    },
  })
  return NextResponse.json(user);
}

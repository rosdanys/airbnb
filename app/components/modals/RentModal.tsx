'use client'

import { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../common/Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../common/Inputs/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../common/Inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../common/Inputs/Counter'
import ImageUpload from '../common/Inputs/ImageUpload'
import Input from '../common/Inputs/Input'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

function RentModal() {
  const router = useRouter()
  const rentModal = useRentModal()
  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

   const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })

  const onBack = () => {
    setStep(step => step - 1)
  }
  const onNext = () => {
    setStep(step => step + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }
    setIsLoading(true)
    axios.post('/api/listings', data)
    .then((res)=> {
      toast.success('Listing Created!') 
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
    })
    .catch((err)=> {
      toast.error('Something went wrong!')
      setIsLoading(false)
    })
    .finally(() => setIsLoading(false))
  }


  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')

  const Map = useMemo(
    () => dynamic(() => import('../common/Map'), { ssr: false }),
    [location]
  )

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  let bodyContent = (
    <div
      className='
    flex flex-col gap-8
    '
    >
      <Heading
        title='Which of these best describes your place?'
        subtitle='Pick a Category'
      />
      <div
        className='
      grid
      grid-cols-1
      md:grid-cols-2
      gap-3
      max-h-[50vh]
      overflow-y-auto
      '
      >
        {categories.map(item => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={category => {
                setCustomValue('category', category)
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Where is your place location?'
          subtitle='Help guests find you?'
        />
        <CountrySelect
          value={location}
          onChange={value => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Share some basics about your place'
          subtitle='What amenitis do you have?'
        />
        <Counter
          onChange={value => setCustomValue('guestCount', value)}
          value={guestCount}
          title='Guests'
          subtitle='How many guests do you allow?'
        />
        <hr />
        <Counter
          onChange={value => setCustomValue('roomCount', value)}
          value={roomCount}
          title='Rooms'
          subtitle='How many rooms do you have?'
        />
        <hr />
        <Counter
          onChange={value => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Add a photo of your place'
          subtitle='Show guests what your place looks like!'
        />
        <ImageUpload
          onChange={value => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How would you describe your place?'
          subtitle='Short and sweet works best!'
        />
        <Input
          id='title'
          label='Title'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id='description'
          label='Description'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Now, set your price'
          subtitle='How much do you charge per night?'
        />
        <Input
          id='price'
          label='Price'
          formatPrice
          type='number'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  // MAIN RETURN
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title='Airbnb your home!'
      body={bodyContent}
    />
  )
}

export default RentModal

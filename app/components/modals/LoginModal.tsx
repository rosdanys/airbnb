'use client'
import { signIn } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useState, useCallback } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import Heading from '../common/Heading'
import Input from '../common/Inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../common/Button'
import { useRouter } from 'next/navigation'
import useRegisterModal from '@/app/hooks/useRegisterModal'

const LoginModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then(callback => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success('Login successful')
        router.refresh()
        loginModal.onClose()
        reset()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const toggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div
      className='
  flex
  flex-col
  gap-4
  '
    >
      <Heading title='Welcome back' subtitle='Login to you account!' />
      <Input
        id='email'
        label='Email Address'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div
      className='
    flex
    flex-col
    gap-4
    mt-3
    
    '
    >
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className='
      text-neutral-500
      text-center
      mt-4
      font-light

      '
      >
        <div className=' flex justify-center flex-row items-center gap-2'>
          <div>First time using Airbnb?</div>
          <div
            onClick={toggle}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login In'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal

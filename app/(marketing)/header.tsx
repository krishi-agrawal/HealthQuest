import Image from 'next/image'
import { Loader } from 'lucide-react'
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
const Header = () => {
  return (
    <header className='h-20 w-full border-b-2 border-slate-200 px-4'>
      <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          <Image src="/TempLogo.png" alt="Logo" height={40} width={40}/>
          <h1 className='text-2xl font-extrabold text-green-600 tracking-wide'>HealthQuest</h1>
        </div>
        <ClerkLoading>
          <Loader className='h-5 w-5 text-muted-foreground 
          animate-spin'/>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton/>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button>LOGIN</Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  )
}

export default Header
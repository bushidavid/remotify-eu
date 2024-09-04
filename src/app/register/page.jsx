'use client';

import Footer from '../components/footer';
import { Input } from '@nextui-org/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {

    const router = useRouter();

    const [registerForm, setRegisterForm] = useState({
      email: "",
      password: "",
    })

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
      setRegisterForm({
        ...registerForm,
        [e.target.name] : e.target.value
      })

      console.log(registerForm)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);

      try {
          const response = await fetch('/api/register', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(registerForm)
          });

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.message || 'An error occurred during registration');
          }

          console.log("Registration successful");
          router.push('/signin');
      } catch (err) {
          setError(err.message);
      } finally {
          setIsLoading(false);
      }
  }


    return (
      <>
          <div className="flex min-h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-500">
                Create a Company Account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit} >
                <div>
                  <Input type="email" variant="underlined" label="Your Email" isRequired name="email" placeholder="email@example.com" onChange={handleChange}></Input>
                  </div>
                <div>
                  <div className="flex items-center justify-between">
                  <Input type="password" variant="underlined" label="Password" isRequired name="password" onChange={handleChange}></Input>
                  </div>
                </div>

                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-remotify-db hover:bg-remotify-lb hover:text-remotify-db px-3 py-1.5 text-sm font-semibold leading-6 text-white"
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </form>

              
            </div>
          </div>
        <Footer />
      </>
    )
}

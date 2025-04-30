'use client';

import React, { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// 👇 dynamically import SimpleMDE only on the client
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  return (
    <div className='max-w-xl '>
      {error && (
        <Callout.Root color="red" className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async data => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError("Something went wrong");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register('title')} />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;

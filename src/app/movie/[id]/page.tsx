'use client'

import { useCallback, useEffect, useState } from 'react'

import { EyeIcon, HeartIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ReactPlayer from 'react-player'
import trpc from 'trpc'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export default function MoviePage({
  params: { id },
}: {
  params: { id: string | undefined }
}) {
  const router = useRouter()
  const [likedTrailers, setLikedTrailers] = useState<string[]>([])

  const {
    data,
    error,
    isLoading,
    refetch: refetchMovie,
  } = trpc.getMovie.useQuery(
    {
      movieId: id as string,
    },
    {
      enabled: !!id,
    }
  )

  const incrementViews = trpc.incrementViews.useMutation({
    onSuccess: () => refetchMovie(),
  })

  const toggleLikeMutation = trpc.toggleLike.useMutation({
    onSuccess: () => refetchMovie(),
  })

  useEffect(() => {
    if (!id) {
      router.push('/')
    }

    const storedLikes = JSON.parse(
      localStorage.getItem('likedTrailers') || '[]'
    )
    setLikedTrailers(storedLikes)
  }, [id, router])

  const toggleLike = (trailerId: string) => {
    const isLiked = likedTrailers.includes(trailerId)
    const updatedLikes = isLiked
      ? likedTrailers.filter((like) => like !== trailerId)
      : [...likedTrailers, trailerId]

    localStorage.setItem('likedTrailers', JSON.stringify(updatedLikes))
    toggleLikeMutation.mutate({ trailerId, liked: !isLiked })
    setLikedTrailers(updatedLikes)
  }

  const handleTrailerStart = useCallback(
    (trailerId: string) => {
      incrementViews.mutate({ trailerId })
    },
    [incrementViews]
  )

  if (isLoading) {
    return (
      <div className='flex h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>Error</h1>
        <p className='text-lg'>{error.message}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className='flex h-screen flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>404 - Not Found</h1>
        <p className='text-lg'>The movie you are looking for does not exist.</p>
      </div>
    )
  }

  const { movie, trailers } = data

  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <h1 className='mb-4 text-4xl font-bold'>{movie.title}</h1>
      <p className='mb-4 text-lg'>{movie.overview}</p>

      <div className='flex flex-wrap justify-center'>
        {trailers && trailers.length > 0 ? (
          trailers.map((trailer) => (
            <div key={trailer.id} className='m-4'>
              <h3 className='mb-2 text-xl font-semibold'>{trailer.name}</h3>

              <ReactPlayer
                url={`https://www.youtube.com/embed/${trailer.key}`}
                controls={true}
                onStart={() => handleTrailerStart(trailer.id)}
              />

              <div className='flex items-center justify-end gap-5 pt-2'>
                <div className='flex items-center gap-2'>
                  <EyeIcon className='h-4 w-4' />
                  <span>{trailer.views}</span>
                </div>
                <Button
                  onClick={() => toggleLike(trailer.id)}
                  disabled={toggleLikeMutation.isPending}
                >
                  <HeartIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      likedTrailers.includes(trailer.id) && 'fill-red-600'
                    )}
                  />
                  <span className='mr-2'>{trailer.likes}</span>
                  <span>
                    {likedTrailers.includes(trailer.id) ? 'Unlike' : 'Like'}
                  </span>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No trailers available.</p>
        )}
      </div>
    </div>
  )
}

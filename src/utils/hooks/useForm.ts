import React, { useEffect, useState } from 'react'
import computeDistance from '../computeDistance'

const useForm = (
  callback: Function,
  validate: Function
): {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleMapChange: (markers?: any) => void
  handleChange: (e: React.SyntheticEvent) => void
  state: any
  errors: any
  handleLengthChange: (result: google.maps.DirectionsResult) => void
} => {
  const [state, setState] = useState<Partial<any>>({})

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement
    setState({
      ...state,
      [target.id]: target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors(validate(state))
    setIsSubmitting(true)
  }

  const handleMapChange = (markers = [] as any) => {
    setState({
      ...state,
      route: markers,
    })
  }

  const handleLengthChange = (result: google.maps.DirectionsResult) => {
    setState({
      ...state,
      pathLength: computeDistance(result),
    })
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [errors])

  return {
    handleChange,
    handleMapChange,
    handleLengthChange,
    handleSubmit,
    state,
    errors,
  }
}

export default useForm

import React, { useEffect, useState } from 'react'
import { IPathItem } from '../../models/pathItem'
import computeDistance from '../computeDistance'

const useForm = (
  callback: Function,
  validate: Function
): {
  handleSubmit: (e: React.FormEvent<HTMLInputElement>) => void
  handleMapChange: (markers?: any) => void
  handleLengthChange: (stateL?: any) => void
  handleChange: (e: React.SyntheticEvent) => void
  state: Partial<IPathItem>
  errors: any
} => {
  const [state, setState] = useState<Partial<IPathItem>>({})

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement
    setState({
      ...state,
      [target.id]: target.value,
    })
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

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setErrors(validate(state))
    setIsSubmitting(true)
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

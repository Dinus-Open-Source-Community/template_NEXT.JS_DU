'use client'

import React, { forwardRef } from 'react'

const TextInput = forwardRef(
  (
    {
      id = null,
      type = 'text',
      name,
      label = null,
      placeholder = null,
      required = false,
      error = null,
      className,
      register,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        <label className="block mb-2 text-sm font-bold text-black">
          {label}
          {required && label ? <span className="text-sm text-red-500 font-bold"> *</span> : null}
        </label>
        <input
          id={id}
          type={type}
          name={name}
          ref={ref}
          className={`bg-gray-50 border text-black ${
            error ? 'border-red-500' : 'border-blue-950'
          }  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-950 block w-full p-2  outline-none`}
          placeholder={placeholder}
          // {...register(name)}
          {...rest}
        />
        {error && <label className="block mb-2 text-sm text-red-500 ">{error}</label>}
      </div>
    )
  }
)

export default TextInput

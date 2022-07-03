import React, { useState, useRef } from 'react'

import Button from '../Button/Button'

import './ImageUpload.scss'

const ImageUpload = ({ id, onInput }) => {
  const [previewUrl, setPreviewUrl] = useState()

  const filePickerRef = useRef()

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }

  const pickedHandler = (e) => {
    const [file] = e.target.files

    if (file) {
      onInput(id, file, true)

      const fileReader = new FileReader()

      fileReader.onload = () => {
        setPreviewUrl(fileReader.result)
      }

      fileReader.readAsDataURL(file)
    }
  }

  return (
    <div className="image-upload">
      <input
        id={id}
        ref={filePickerRef}
        type="file"
        accept="image/*"
        onChange={pickedHandler}
      />
      <div className="image-upload__preview">
        {previewUrl ? (
          <img src={previewUrl} alt="preview"></img>
        ) : (
          <p>Please pick an image.</p>
        )}
      </div>
      <Button type="button" onClick={pickImageHandler}>
        PICK IMAGE
      </Button>
    </div>
  )
}

export default ImageUpload

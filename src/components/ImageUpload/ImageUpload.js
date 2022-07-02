import React, { useState, useRef, useEffect } from 'react'

import Button from '../Button/Button'

import './ImageUpload.scss'

const ImageUpload = ({ id, onInput }) => {
  const [fileState, setFileState] = useState({
    file: null,
    isValid: false
  })
  const [previewUrl, setPreviewUrl] = useState()

  const filePickerRef = useRef()

  const { file, isValid } = fileState

  useEffect(() => {
    onInput(id, file, isValid)
  }, [id, file, isValid, onInput])

  useEffect(() => {
    if (!file) return

    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }

  const pickedHandler = (e) => {
    const [file] = e.target.files

    if (file) {
      setFileState({ file, isValid: true })
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

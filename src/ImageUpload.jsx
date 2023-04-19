import React, { useState, useEffect } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
const defaultImageSrc = 'img/mbgsp.jpg'

const initialFieldValues = {
  imageID: 0,
  imageName: '',
  imageSrc: defaultImageSrc,
  imageFile: [],
  floor: 0,
}

export default function ImageUpload(props) {
  const { addOrEdit, recordForEdit } = props

  const [values, setValues] = useState(initialFieldValues)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (recordForEdit != null)
      setValues(recordForEdit);
  }, [recordForEdit])

  const showPreview = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile: e.target.files,
          imageSrc: URL.createObjectURL(e.target.files[0]),
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setValues({
        ...values,
        imageFile: [],
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {}
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    setErrors(temp)
    return Object.values(temp).every(x => x === true)
  }

  const resetForm = () => {
    setValues(initialFieldValues)
    document.getElementById('image-uploader').value = null;
    setErrors({})
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append('imageID', values.imageID);
      formData.append('imageName', values.imageName);
      formData.append('floor', values.floor);
      for (let i = 0; i < values.imageFile.length; i++) {
        formData.append('files', values.imageFile[i]);
      }
      addOrEdit(formData, resetForm);
    }
  };

  const handleClick = (event) => {
    event.currentTarget.classList.toggle("showImage");
  };
 

  const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid-field' : '')

  return (
    <>
      <div className="cards">
        <img src={values.imageSrc} className="cardTop" alt="" onClick={handleClick} />
        

      </div>
      
      <form typeof='multipart/form-data' type="multipart/form-data" autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className='UploadImage'>
          <div className="fileChoose">
            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc') } onChange={showPreview} id="image-uploader" multiple />
          </div>
          <div className="btnupload">
            <button type="submit" className="btn btn-light">Upload<UploadIcon /></button>
          </div>
        </div>
      

            </form>
            
        </>
    )
}
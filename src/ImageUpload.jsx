import React, { useState, useEffect } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
const defaultImageSrc = 'upload.jpg'

const initialFieldValues = {
    imageID: 0,
   // name: '',
  //  description: '',
    imageName: '',
    imageSrc: '',
    imageFile: []
}

export default function ImageUpload(props) {

    const { addOrEdit, recordForEdit } = props

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    


    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
    }, [recordForEdit])

 //   const handleInputChange = e => {
     //   const { name, value } = e.target;
       // setValues({
          //  ...values,
          //  [name]: value
      //  })
   // }

   const showPreview = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let imageFiles = [...values.imageFile];
      for (let i = 0; i < e.target.files.length; i++) {
        let imageFile = e.target.files[i];
        const reader = new FileReader();
        reader.onload = (x) => {
          imageFiles.push(imageFile);
          setValues({
            ...values,
            imageFile: imageFiles,
            imageSrc: x.target.result,
          });
        };
        reader.readAsDataURL(imageFile);
      }
      console.log(imageFiles)
    } else {
      setValues({
        ...values,
        ImageFile: [],
        ImageSrc:'',
      });
    }
  
  };
  
    const validate = () => {
        let temp = {}
       // temp.name = values.name === "" ? false : true;
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
          for (let i = 0; i < values.imageFile.length; i++) {
            formData.append('files', values.imageFile[i]);
          }
          addOrEdit(formData, resetForm);
         console.log(formData.getAll("files"))
        
        }
      };
      const handleClick = (event) => {
        event.currentTarget.classList.toggle("showImage");
      };
      

    const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid-field' : '')

    return (
     <>
     <div className="cards">
    <img
      src={values.imageSrc}
      className="cardTop "
      alt=""
      onClick={handleClick}
    />
    <div className="cardsbody"></div>
  </div>
         <div className='UploadImage'>
           
                  <form typeof='multipart/form-data' type="multipart/form-data" autoComplete="off" noValidate onSubmit={handleFormSubmit}>
               
                  <div className="fileChoose">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc') }
                                onChange={showPreview} id="image-uploader" multiple/>
                        </div>
                        <div className="btnupload">
                       
                            <button type="submit" className="btn btn-light">Upload<UploadIcon /></button>
                            
                        </div>
                    
               
                
            </form>
            </div>
        </>
    )
}
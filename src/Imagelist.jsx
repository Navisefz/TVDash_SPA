import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import axios from "axios";
import Grid from '@mui/material/Grid';


export default function Imagelist() {
            const [imageList, setImageList] = useState([])
             const [recordForEdit, setRecordForEdit] = useState(null)
             const [loading, isLoading] = useState(false)
            useEffect(() => {
             refreshImageList();
    }, [])
//connection to int API
   /* const imageAPI = (url = 'https://mbgsp-portal-int.apac.bg.corpintra.net/tvapi/api/Image/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }*/
    const imageAPI = (url = 'https://localhost:44323/api/Image/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
//function to refresh all the imagelist
    function refreshImageList() {
        
        isLoading(false)
        imageAPI().fetchAll()
            .then(res => {
                setImageList(res.data)
              
            })
            .catch(err => console.log(err))
    }
   const addOrEdit = (formData, onSuccess) => {
        isLoading(true)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };

  if (formData.get('imageID') === '0') {
   
    imageAPI().create(formData, config)
    
      .then(_res => {
        onSuccess();
        refreshImageList();
      })
      .catch(err => console.log(err));
     
  } 
  
};


    const showRecordDetails = data => {
        setRecordForEdit(data)
    }
  //delete an image
    const onDelete = (e, id) => {
        const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
          };
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this Image?'))
            imageAPI().delete(id,config)
                .then(_res => refreshImageList())
                .catch(err => console.log(err))
    }

    const imageCard = data => (  
        
        <div className="card" onClick={() => { showRecordDetails(data) }}>
            <img src={data.imageSrc} alt="" className="cardimage" />
            <div className="card-body">
               
                {/* <h5>{data.name}</h5> */}
                 {/*   <span>{data.Description}</span> <br /> */}
              
                <button className="btn btn-light delete-button" onClick={e => onDelete(e, parseInt(data.imageID))}>
                <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )
return (  
        <>{ loading == true ? (<>
      <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>  </>):(<></>)}
        
           <div className='imageUploadCard'>
                <ImageUpload  
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit} />
           </div>
            
           <Grid container spacing={0.5} sx={{ backgroundColor: "whitesmoke" , objectFit:"cover",width:"100%", objectFit:"cover" }}>
      {imageList.map((image) => (
       <Grid item xs={1.5} sm={1.5} md={1.5} key={image.id}>
        
  {imageCard(image)
  }
  
</Grid>
      ))}
      
    </Grid>


          
            </>      
    )
}

import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import axios from "axios";
export default function Imagelist() {
            const [imageList, setImageList] = useState([])
             const [recordForEdit, setRecordForEdit] = useState(null)
             const [loading, isLoading] = useState(false)
            useEffect(() => {
             refreshImageList();
    }, [])
//connection to API
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
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this Image?'))
            imageAPI().delete(id)
                .then(_res => refreshImageList())
                .catch(err => console.log(err))
    }

    const imageCard = data => (  
        
        <div className="card" onClick={() => { showRecordDetails(data) }}>
            <img src={data.imageSrc} alt="" className="card-img-top" />
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
              <div className="Images">
                <table>
                    <tbody>
                        {
                            //table for image lists in card format
                            //tr > 3 td                       
                            [...Array(Math.ceil(imageList.length / 10 ))].map((_e, i) => <div key={i}>
                                <td>{imageCard(imageList[10  * i])}</td>
                                <td>{imageList[10 * i + 1] ? imageCard(imageList[10 * i + 1]) : null}</td>
                                <td>{imageList[10  * i + 2] ? imageCard(imageList[10  * i + 2]) : null}</td>
                                <td>{imageList[10  * i + 3] ? imageCard(imageList[10  * i + 3]) : null}</td>
                                <td>{imageList[10  * i + 4] ? imageCard(imageList[10  * i + 4]) : null}</td>
                                <td>{imageList[10  * i + 5] ? imageCard(imageList[10  * i + 5]) : null}</td>
                                <td>{imageList[10  * i + 6] ? imageCard(imageList[10  * i + 6]) : null}</td>
                                <td>{imageList[10  * i + 7] ? imageCard(imageList[10  * i + 7]) : null}</td>
                                <td>{imageList[10  * i + 8] ? imageCard(imageList[10  * i + 8]) : null}</td>
                                <td>{imageList[10  * i + 9] ? imageCard(imageList[10  * i + 9]) : null}</td>
                            </div>                          
                            )}                       
                    </tbody>
                </table>
            </div>
            </>      
    )
}

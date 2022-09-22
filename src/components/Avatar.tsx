import React, { useState,useCallback } from 'react'
import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'
import Dropzone from 'react-dropzone'
import portriatPlaceholder from './portraitPlaceholder.png'
import {useDropzone} from 'react-dropzone';
import Slider from "@mui/material/Slider";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { Box, Card, Grid } from '@mui/material'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import '../styles/Avatar.css'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CROP_AREA_ASPECT = 2 / 2;





interface iAvatarEdit{
  getAvatar : (croppedArea: any, image: any) => void
}
const AvatarEdit = ({getAvatar}: iAvatarEdit) => {

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<any>(null);
  const [image, setImage] = useState<any>(portriatPlaceholder);


 
  const onDrop = ( acceptedFiles : any ) => {
    
    const reader = new FileReader()
    reader.readAsDataURL(acceptedFiles[0])

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      setImage(binaryStr);
    }
  
  }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
      accept: {
        'image/png': ['.png', '.jpg'],
      },
      onDrop})
  


  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      console.log(croppedArea, croppedAreaPixels);
    },
    []
  );
  
  return (
   
  <Grid container spacing={2} sx={{ mb: 4 , mt: 4 }}>
    <Grid position={'relative'} item xs={12}>
    <div className="App">
      <div className="cropper">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={CROP_AREA_ASPECT}
          onCropComplete={
            (croppedArea) => {
              setCroppedArea(croppedArea)
              getAvatar(croppedArea,image)
            }
          }
          cropShape="round"
          onCropChange={setCrop}
          //onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        </div>
        </div>
        </Grid>
   <Grid position={'relative'} item xs={12}> 
        <Slider
          sx={{ ml:2, mr:4}}
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(Number(zoom))}
          classes={{ root: "slider" }}
        />
     
        </Grid>
        <Grid {...getRootProps()} position={'relative'} item xs={12}>
        <Paper>
        <input {...getInputProps()} />
        
        {
        isDragActive ?
          <p><FileUploadIcon />Drop the files here ...</p> :
          <p><FileUploadIcon />Drag and drop your profile picture or click to search on disk</p>
        }


        </Paper>
        

        </Grid>
      
       

        
  </Grid>
  );



}
export default AvatarEdit
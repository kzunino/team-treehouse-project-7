import React from 'react';
import NotFound from './NotFound';
import Photo from './Photo';

const PhotoList = props => {

  const results = props.data;
  let photos;
  if (results.length > 0) {
    photos = results.map(photo =>
      <Photo url={photo.urls.thumb} key={photo.id} />);
  }else{
    photos = <NotFound />
  }

  return (
    <div className="photo-container">
      <h2>{props.title}</h2>
      <ul>
        {photos}
      </ul>
    </div>

  )
}

export default PhotoList;

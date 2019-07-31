import React from 'react';
import NotFound from './NotFound';
import Photo from './Photo';

const PhotoList = props => {

// renders each photo from data passed to PhotoList

  const results = props.data;
  let photos;
  if (results.length > 0) {
    photos = results.map(photo =>
      <Photo url={photo.urls.small} alt={photo.alt_description} key={photo.id} />);
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

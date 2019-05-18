import React from "react";
import { Grid, Segment, Header, Image } from "semantic-ui-react";
import LazyLoad from 'react-lazyload'
import imagesObject from "../../../Images/imagesObject"
const UserDetailedPhotos = ({ photos }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon="image" content="Photos" />

        <Image.Group size="small">
          {photos &&
            photos.map(photo => 
              // offset will wait until we can see 150 pixels to load it. if this property is on here offset = {-150}
            <LazyLoad key={photo.id} height={150}  placeholder={<Image  src={imagesObject.user} />} >
              <Image  src={photo.url} />

            </LazyLoad>
            )}
        </Image.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedPhotos;

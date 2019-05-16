import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux"; // deeply nested function transportion comman seperate higher ordered components (neatier)
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Icon
} from "semantic-ui-react";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { toastr } from "react-redux-toastr";
import { uploadProfileImage, deletePhoto, setMainPhoto } from "../userActions";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ];
};

const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos
});

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: "",
    cropResult: null,
    image: {}
  };

  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    });
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === "undefined") {
      return; //if we do not have an image that we can crop^
    }

    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    // just to use it so I don't get a warning will work in
    //an alternative at some point to the toBlob  called dataURL

    //toBlob will not work for users using internet Explorer

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageURL = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageURL,
        image: blob,
        isIE
      });
    }, "image/jpeg");
  };

  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(
        this.state.image,
        this.state.fileName
      );
      this.cancelCrop(); // remove preview once upload successful
      toastr.success("Success!", "Photo Uploaded!");
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  handlePhotoDelete = photo => async () => {
    try {
      this.props.deletePhoto(photo);
      toastr.success("Success", "Photo deleted!");
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  handleSetMainPhoto = photo => async () => {
    try {
      this.props.setMainPhoto(photo);
      toastr.success("Success", "Main Photo updated!");
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  cancelCrop = () => {
    this.setState({
      files: [],
      image: []
    });
  };

  render() {
    const { photos, profile } = this.props;
    let filteredPhotos = [];
    if (photos) {
      filteredPhotos = photos.filter(photo => {
        return photo.url !== profile.photoURL;
      });
    }
    return (
      <Segment>
        <Header dividing size="large" content="Your Photos" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div style={{ paddingtop: "30px", textAlign: "center" }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop image here or click to add" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            <Cropper
              style={{ height: 200, width: "100%" }}
              ref="cropper"
              src={this.state.files[0] && this.state.files[0].preview}
              aspectRatio={1}
              viewMode={0}
              dragMove="move"
              guides={false}
              scalable={true}
              cropBoxMovable={true}
              cropBoxResizable={true}
              crop={this.cropImage}
            />
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview and Upload" />
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minHeight: "200px", minWidth: "200px" }}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                    onClick={this.uploadImage}
                    style={{ width: "100px" }}
                    positive
                    icon="check"
                  />
                  <Button
                    onClick={this.cancelCrop}
                    style={{ width: "100px" }}
                    icon="close"
                  />
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>

        <Divider />
        <Header sub color="teal" content="All Photos" />

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={profile.photoURL} />
            <Button positive>Main Photo</Button>
          </Card>
          {photos &&
            filteredPhotos.map(photo => (
              <Card key={photo.id}>
                <Image src={photo.url} />
                <div className="ui two buttons">
                  <Button
                    onClick={this.handleSetMainPhoto(photo)}
                    basic
                    color="green"
                  >
                    Main
                  </Button>
                  {/* Double arrow function allows me to place this in here keeps from creating a new function each time */}
                  <Button
                    onClick={this.handlePhotoDelete(photo)}
                    basic
                    icon="trash"
                    color="red"
                  />
                </div>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(auth => query(auth))
)(PhotosPage);

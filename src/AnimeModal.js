import React from 'react'
import {Button,Modal} from 'react-bootstrap'

class AnimeModal extends React.Component {
  
  render(){
    const {show,toggleModal} = this.props
    console.log("modal", show)
    return (
      <>

        <Modal show={show} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button variant="primary" onClick={toggleModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AnimeModal;

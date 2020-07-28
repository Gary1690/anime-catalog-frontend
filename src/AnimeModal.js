import React from 'react'
import {Button,Modal, Form} from 'react-bootstrap'

class AnimeModal extends React.Component {
 
  state = {
    id: "", 
    title:"",
    img_url:"",
    description:"",
    screen:"",
    age_rating:"",
  }


  componentDidUpdate(prevProps){
    if (this.props.id !== prevProps.id){
      const {id,title,img_url,description,screen,age_rating} = this.props
      const newState =  { id:id,
        title:title,
        img_url:img_url,
        description:description,
        screen:screen,
        age_rating:age_rating
      }
      this.setState(newState)
    }
  } 
  
  handleChange = (e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  
  handleClick = ()=>{
    const {id,title,img_url,description,screen,age_rating} = this.state
    fetch(`http://localhost:3000/animes/${id}`,{
      method:"PATCH",
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({
        title,img_url,description,screen,age_rating
      })
    }).then(resp=>resp.json())
    .then(anime =>{
      this.props.toggleModal()
      this.props.updateAnimePage (anime)
      return anime
    }).then( anime=>{
      this.props.updateAnimeList(anime)
    })
  }

  render(){
    const {show,toggleModal} = this.props
    const {title,img_url,description,screen,age_rating} = this.state
    return (
      <>

        <Modal show={show} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Anime Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" name="title" value={title} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="img_url">
                <Form.Label>Image Address</Form.Label>
                <Form.Control type="text" placeholder="Enter image URL" name="img_url" value={img_url} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="screen">
                <Form.Label>Screen (TV/Movie/ONA/ETC...)</Form.Label>
                <Form.Control type="text" placeholder="Enter screen type" name="screen" value={screen} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="age_rating">
                <Form.Label>Age Rating(PG/R/ETC...)</Form.Label>
                <Form.Control type="text" placeholder="Enter age rating" name="age_rating" value={age_rating} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control  as="textarea" rows="3" name="description" value={description} onChange={this.handleChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClick}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AnimeModal;

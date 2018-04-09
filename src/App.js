import React, { Component } from 'react';
import './App.css';
import Accordion from 'react-bootstrap/lib/Accordion'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Panel from 'react-bootstrap/lib/Panel'
import Modal from 'react-bootstrap/lib/Modal'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'

class App extends Component {
  state = {
    recipes:[],
    currentIndex:0,
    showEdit:false,
    show: false,
    newestRecipe : {recipeName:"",ingredients:[]},
  }
  handleClose() {
   if(this.state.show){
     this.setState({show:false});
   }
   else if(this.state.showEdit){
     this.setState({showEdit:false});
   }
 }

 handleShow(state,currentIndex) {
   this.setState({[state]:true});
   this.setState({currentIndex});
 }
 handleInputChange(recipeName, ingredients){
   this.setState({newestRecipe:{recipeName: recipeName, ingredients:ingredients}});
 }
 AddRecipe(){
   let recipes = this.state.recipes.slice();
   recipes.push({recipeName:this.state.newestRecipe.recipeName,ingredients:this.state.newestRecipe.ingredients});
   localStorage.setItem('recipes',JSON.stringify(recipes));
   this.setState({recipes});
   this.handleClose();
 }
  //delete recipe function
  deleteRecipe(index){
      let recipes = this.state.recipes.slice();
      recipes.splice(index,1);
      localStorage.setItem('recipes',JSON.stringify(recipes));
      this.setState({recipes});
    }
    //EditRecipeName
    EditRecipeName(recipeName,currentIndex){
      let recipes = this.state.recipes.slice();
      recipes[currentIndex] = {recipeName:recipeName,ingredients:this.state.recipes[currentIndex].ingredients};
      localStorage.setItem('recipes',JSON.stringify(recipes));
      this.setState({recipes});
      console.log(this.state.recipes);
    }
    //Edite ingrediets
    EditIngredients(ingredients,currentIndex){
      let recipes = this.state.recipes.slice();
      recipes[currentIndex] = {recipeName:this.state.recipes[currentIndex].recipeName,ingredients:ingredients};
      localStorage.setItem('recipes',JSON.stringify(recipes));
      this.setState({recipes});
    }
    componentDidMount(){
      let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
      this.setState({recipes});
    }
  render() {
    const {recipes} = this.state;
    return(
      <div className="container">
      {recipes.length>0 &&(
        <div>
        <PanelGroup accordion>
        {recipes.map((recipe,index)=>(
          <Panel eventKey={index}>
            <Panel.Heading>
              <Panel.Title toggle>{recipe.recipeName}</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
            <ol>
            {recipe.ingredients.map((item,index)=>(
              <li key={index}>{item}</li>
            ))}
            </ol>
            <ButtonToolbar>
            <Button onClick={()=>this.deleteRecipe(index)} bsStyle="danger">Delete</Button>
            <Button onClick={()=>this.handleShow("showEdit",index)} bsStyle="success">Edit</Button>
            </ButtonToolbar>
            </Panel.Body>
          </Panel>
  ))}
  </PanelGroup>
  <Modal show={this.state.showEdit}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Recipe</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <formGroup>
      <ControlLabel>recipe Name</ControlLabel>
      <FormControl type="text" name="recipeName" value={this.state.recipes[this.state.currentIndex].recipeName}
       onChange={(event)=>this.EditRecipeName(event.target.value,this.state.currentIndex)} placeholder="recipe Name"></FormControl>
      <ControlLabel>ingredients</ControlLabel>
      <FormControl type="text" name="ingredients" value={this.state.recipes[this.state.currentIndex].ingredients}
       onChange={(event)=>this.EditIngredients(event.target.value.split(","),this.state.currentIndex)} placeholder="Ingredients"></FormControl>
      <Button onClick={()=>this.AddRecipe()} type="submit">Add Recipe</Button>
      </formGroup>
    </Modal.Body>
    <Modal.Footer>
              <Button onClick={()=>this.handleClose()}>Close</Button>
            </Modal.Footer>
  </Modal>
  </div>
      )}


<Modal show={this.state.show}>
  <Modal.Header closeButton>
    <Modal.Title>Add Recipe</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <formGroup>
    <ControlLabel>recipe Name</ControlLabel>
    <FormControl type="text" name="recipeName" value={this.state.newestRecipe.recipeName}
     onChange={(event)=>this.handleInputChange(event.target.value, this.state.newestRecipe.ingredients)} placeholder="recipe Name"></FormControl>
    <ControlLabel>ingredients</ControlLabel>
    <FormControl type="text" name="ingredients" value={this.state.newestRecipe.ingredients}
     onChange={(event)=>this.handleInputChange(this.state.newestRecipe.recipeName, event.target.value.split(","))} placeholder="Ingredients"></FormControl>
    <Button onClick={()=>this.AddRecipe()} type="submit">Add Recipe</Button>
    </formGroup>
  </Modal.Body>
  <Modal.Footer>
            <Button onClick={()=>this.handleClose()}>Close</Button>
          </Modal.Footer>
</Modal>
<Button bsStyle="primary" bsSize="large" onClick={()=>this.handleShow("show",0)}>
Add Recipe
</Button>
</div>
    );
  }
}

export default App;

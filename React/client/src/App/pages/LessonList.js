import React, { Component } from 'react';

class LessonPresentationSheet extends Component {

  renderInfoBar() {
    return (
      <div className="PresentationSheetInfoBar">
         <ul>
          <li><img src="../assets/img/lessonList/presentationSheet/lessonTime_logo.png" alt=""></img> {this.props.lessonJSON.durée}</li>
          <li><img src="../assets/img/lessonList/presentationSheet/difficulty_logo.png" alt=""></img>{this.props.lessonJSON.niveau}</li>
          <li><img src="../assets/img/lessonList/presentationSheet/madeByAuthor_logo.png" alt=""></img>{this.props.lessonJSON.auteur}</li>
        </ul> 
      </div>
    );
  }

  render() {
    return (
    
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 LessonPresentationSheet_container">
        <div className="LessonPresentationSheet">
          <div className="LessonPresentationSheetTitle">{this.props.lessonJSON.title}</div>
          {this.renderInfoBar()}
          <div className="LessonPresentationSheetIntro">{this.props.lessonJSON.intro}</div>
          <img src={this.props.lessonJSON.imageURL} alt={this.props.lessonJSON.imageURL}></img>
        </div>
      </div>
    );
  }
}

class LessonList extends Component {

	constructor(props){
    super(props);
    this.state = {list: []}
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('/lessonlist')
    .then(response => response.json())
		.then((responseJson) => { this.setState( { list: responseJson });});
		//.catch((error) => { console.error(error); });
  }
  
  renderLessonPresentationSheet(data) {
    return (
      <LessonPresentationSheet
        lessonJSON={data}
      />
    );
  }
  
  render() {
    return (
      <div className="LessonList">
        <h2>Liste des cours :</h2>
        
        <div className="LessonListItems">
          <div className="container-fluid">
            <div className="row">
              <h1>List of Items</h1>
                {/* Check to see if any items are found*/}
                {
                  this.state.list.length ? (
                    <div>
                        {this.state.list.map(lesson_item =>
                          <div key={lesson_item._id}>{this.renderLessonPresentationSheet(lesson_item)}</div>
                        )}
                    </div>
                  ) 
                  : 
                  (
                    <div>
                      <h2>No List Items Found</h2>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default LessonList;

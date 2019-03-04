import React, { Component } from 'react';


class LessonDetailSheet extends Component {
      renderInfoBar() {
        return (
          <div className="DetailSheetInfoBar">
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
        
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 LessonDetailSheet_container">
            <div className="LessonDetailSheet">
              <br/>
                <div className="LessonDetailSheetTitle">{this.props.lessonJSON.title}</div>
              <br/>
                {this.renderInfoBar()}
              <br/>
                <div className="LessonDetailSheetIntro">{this.props.lessonJSON.intro}</div>
                <img src={this.props.lessonJSON.imageURL} alt={this.props.lessonJSON.imageURL}></img>
              <br/>
              <br/>
                <div className="LessonDetailSheetContentTitle">{this.props.lessonJSON['chapitres'][0]['sous-parties'][0].titre}</div>
              <br/>
                <div className="LessonDetailSheetContent">{this.props.lessonJSON['chapitres'][0]['sous-parties'][0].contenu}</div>
            </div>
          </div>
        );
      }
    }
	
  
class LessonDetail extends Component {
	
	constructor(props){
    super(props);
    this.state = {list: []}
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getItem();
  }

  // Retrieves the list from the Express app
  getItem = () => {
    fetch('/lessondetail')
    .then(response => response.json())
		.then((responseJson) => { this.setState( { list: responseJson });});
		//.catch((error) => { console.error(error); });
  }
  
  renderLessonDetailSheet(data) {
    return (
      <LessonDetailSheet
        lessonJSON={data}
      />
    );
  }

  render() {
    return (
      <div className="LessonDetail" >
        <h2>Detail du cours :</h2>
      
        <div className="container-fluid">
        
          <div className="row">
            <h1>List of Items</h1>
              {/* Check to see if any items are found*/}
              {
                this.state.list.length ? (
                  <div>
                    {this.state.list.map(lesson_item =>
                      <div key={lesson_item._id}>{this.renderLessonDetailSheet(lesson_item)}</div>
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
    );
  }
}

export default LessonDetail;

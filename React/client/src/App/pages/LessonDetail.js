import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LessonDetailSheet extends Component {
  
	constructor(props){
    super(props);
    this.previousChapterId = -1;
    this.nextChapterId = -1;
    this.setPreviousAndNextChapterId(this.props.chapter_id);
  }
  
  setPreviousAndNextChapterId(currentChapterId) {
    
    let indexMax = this.props.lessonJSON['chapitres'].length;
    
    if (indexMax !== 1) {
    
      for(var i=0; i<indexMax ; i++) {
        if (currentChapterId === this.props.lessonJSON['chapitres'][i].id_chapitre) {
          if (i!==0) {
            this.previousChapterId = this.props.lessonJSON['chapitres'][i-1].id_chapitre;
          }
          if (i!==indexMax-1) {
            this.nextChapterId = this.props.lessonJSON['chapitres'][i+1].id_chapitre;
          }
        }
      }
    }
  }
  
  renderInfoBar() {
    return (
      <div className="DetailSheetInfoBar">
         <ul>
          <li><img src="/assets/img/lessonList/presentationSheet/lessonTime_logo.png" alt=""></img> {this.props.lessonJSON.durée}</li>
          <li><img src="/assets/img/lessonList/presentationSheet/difficulty_logo.png" alt=""></img>{this.props.lessonJSON.niveau}</li>
          <li><img src="/assets/img/lessonList/presentationSheet/madeByAuthor_logo.png" alt=""></img>{this.props.lessonJSON.auteur}</li>
        </ul> 
      </div>
    );
  }
  
  render() {
    return (
    
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 LessonDetailSheet_container">
        <div className="LessonDetailSheet">
          <br/>
          {
            this.previousChapterId === -1 ? (
                <button id="previous_chapter" type="button" disabled>Chapitre précédent</button>
            ) : (
              <Link to={'/lessondetail/'+this.props.lesson_id+'/'+this.previousChapterId}>
                <button id="previous_chapter" variant="raised">Chapitre précédent</button>
              </Link>
            )
          }
          {
            this.nextChapterId === -1 ? (
                <button id="next_chapter" type="button" disabled>Chapitre suivant</button>
            ) : (
              <Link to={'/lessondetail/'+this.props.lesson_id+'/'+this.nextChapterId}>
                <button id="next_chapter" variant="raised">Chapitre suivant</button>
              </Link>
            )
          }
            
          <br/>
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
    this.state = {list: [], lesson_id : '', chapter_id : ''};
  }

  // Fetch the list on first mount
  componentDidMount() {
    const { lesson_id } = this.props.match.params
    const { chapter_id } = this.props.match.params
    
    this.setState({lesson_id : `${lesson_id}`});
    this.setState({chapter_id : `${chapter_id}`});
    
    // Retrieves the list from the Express app
      fetch(`/lessondetail/${lesson_id}/${chapter_id}`)
      .then(response => response.json())
      .then((responseJson) => { this.setState( { list: responseJson });})
      .catch((error) => { console.error(error); });
  }

  
  renderLessonDetailSheet(data) {
    return (
      <LessonDetailSheet
        lessonJSON={data}
        lesson_id={this.state.lesson_id}
        chapter_id={this.state.chapter_id}
      />
    );
  }

  render() {
    return (
      <div className="LessonDetail" >
        <h2>Chapitre : {this.state.chapter_id}</h2>
        <div className="container-fluid">
          <div className="row">
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

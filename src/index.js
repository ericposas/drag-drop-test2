import './scss/style.scss'
import $ from 'jquery'

$('body').append(`
  <div id="draggable-component-1" class="draggable-component" draggable="true">Draggable</div>
  <div id="drop-zone">Drop Zone</div>
`)
let component1 = document.querySelector('#draggable-component-1')
component1.ondragstart = e=>{
  e.dataTransfer.setData('text/plain', e.target.id)
  e.dataTransfer.dropEffect = 'copy'
}

let drop = document.querySelector('#drop-zone')
drop.ondragover = e=>{
  e.preventDefault()
  $('#drop-zone').text('')
  e.dataTransfer.dropEffect = 'copy'
}
drop.ondrop = e=>{
  e.preventDefault()
  let data = e.dataTransfer.getData('text/plain')
  e.target.appendChild(document.getElementById(data))
  console.log(`${data} dropped into dropzone div`)
}


/*

some React pseudo-code

onDropped(){
  dispatch({ type:'DROP', payload:target.html })
  // dispatch sends the target.html to be rendered via Redux through a state-change
}

//..in some other file..
return {
  ...state,
  htmlContent: action.payload
}

//..in component
import myHtmlDiv from './components/myHtmlDiv'

const {htmlContent} = this.props

<DropZone>
  <myHtmlDiv content={htmlContent}/>
</DropZone>

//..in myHtmlDiv
// this will basically rebuild an html element using text data only
class myHtmlDiv extends Component {
  render(){
    return(
      <div>{this.props.content}</div>
    )
  }
}

*/

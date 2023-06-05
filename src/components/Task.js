import { useState } from "react";
import styled from "styled-components";


const StyledWrap = styled.div`
  background-color: #fafafa;
  margin: 0.8em 0.5em;
  padding-left: 0.5em;
`;

const StyledButton = styled.button`
  background: transparent;
  border: 3px solid #3877ff;
  margin: 0.5em 1em;
  padding: 10px 20px;
  background-color: transparent;
  font-size: 15px;
  color: black;

  &:hover {
    background-color: #3877ff; // <Thing> when hovered
    color: white;
    border-radius: 8px;
  }
`;

// use this component for demo in lecture:
const StyledParagraph = styled.p`
  color: ${(props) => (props.type === "text" ? "black" : "#3877ff")};
  padding: 0.25em 1em;
  font-size: 0.8em;
  font-style: ${(props) => (props.type === "text" ? "normal" : "italic")};
  font-family: ${(props) =>
    (props.type === "code"
      ? "Courier New"
      : "Helvetica")};

  & > a {
    font-size: 1em;
    color: #3877ff;
    text-decoration: none;
  }
  & > a:hover {
    color: #295ac4;
  }
`;

const StyledUl = styled.ul`
  color: #3877ff;
  text-align: left;
  margin-left: 1.2em;
  padding: 1em 1em;
  font-size: 0.8em;
  font-style: "italic";
  font-family: "Helvetica Neue" sans-serif;
`;

const StyledImg= styled.img`
  margin-left: 1.2em;
  width:35%;
`;

const StyledImgSmall= styled.img`
  margin-left: 1.2em;
  width:20%;
`;

/*
* return pure text or provide a link? a list? whatever
* prototype
* TODO: rework the datastructure wrt. to some build in editor
*       for editing tasks
*       adapt the component-generation wrt. the new datastructure or input-mask
* 
*       switch to switch-case
*/
function ItemType({ item }) {

  if (item.type === "url") {
    const link = <a href={item.content}>{item.name}</a>;
    return <StyledParagraph type={item.type}>{link}</StyledParagraph>;
  } else if (item.type === "img") {
    return <StyledImg src={item.content} alt={item.alt}></StyledImg>;
  } else if (item.type === "img-small") {
    return <StyledImgSmall src={item.content} alt={item.alt}></StyledImgSmall>;
  } else if (item.type === "list") {
    const listItems = item.content.map((entry, index) => (
      <li key={"li" + index}>{entry}</li>
    ));
    return <StyledUl>{listItems}</StyledUl>;
  } else {
    return <StyledParagraph type={item.type}>{item.content}</StyledParagraph>;
  }
}




/*
* component-generation wrt. subtask-contents
* to get a specific ItemType wrt. to the subtask contents
*/
function Content({ content }) {
  const listItems = content.map((item, index) => (
    <ItemType item={item} key={index}></ItemType>
  ));

  return <div>{listItems}</div>;
}

/*
* Subtask title + checkbox:
* Sets the checkbox wrt. the state of the data
*
* returns the subtitle wrt. the state of the single subtask
* wrt. the state of the exercise-data propagated from the parent component
* to keep the data consistent: manipulation of the exercise-data is happening in the parent-component
* and the data flows from top to bottom
* PROPS ARE READ ONLY
*
* for more explanation please look into:
* https://beta.reactjs.org/learn/sharing-state-between-components
*/
function H4({ length, task, superTask }) {

  if (length < 2) {
    return (
      <>
        <h5>
          {task.title} 
        </h5>
      </>
    );
  }
  return (
    <>
      <h5>
        {/* Generation of a) b) c) etc. 
        TODO: Strongly depends on task.id, make sure the task-id generation fits this */}
        {String.fromCharCode(97 + task.id)} {task.title} 
      </h5>
    </>
  );
}

/*
* This component represents a subtask
*
* internal state object wrt. hide and show
* this state belongs to each subtask, since this information 
* is specific to the single subtask
*/
function Task({ task, length, superTaskId }) {
  // interactivity and state-managment:
  const [showMore, setShowMore] = useState(false);

  function handleMoreClick() {
    setShowMore(!showMore);
  }
  return (
    <StyledWrap key={task.title + " " + task.id}>
      <H4
        task={task}
        length={length}
        superTask={superTaskId}
      ></H4>
      <StyledButton onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </StyledButton>
      {showMore && (
        <Content
          key={task.title + " " + task.id}
          content={task.content}
        ></Content>
      )}
    </StyledWrap>
  );
}

export default Task;

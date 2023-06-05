
import { useState } from "react";
import styled from "styled-components";

// global styles
import "./App.css";
// (styled) sub components
import Task from ".//components/Task.js";

// data
import { exercises } from ".//data/data.js";


//TODO add ** for next.js

/*
 * To arrange the exercise-boxes at once:
 */
const StyledDiv = styled.div`
  border-radius: 8px;
  background-color: #fafafa;
  margin: 1em 2em;
  padding: 0.5em 1em;
  color: black;
  box-shadow: 0px 5px 15px #c2c2c2;
`;

/*
 * Just a styled version of h4
 */
const StyledH4 = styled.h4`
  color: #3877ff;
  margin-left: 0.5em;
  font-size: 0.8em;
  font-style: "italic";
  font-family: "Helvetica Neue" sans-serif;
`;

/*
 * TaskArea represents content-area
 * and wrt. this app, the contents of a Task are given as
 * subtasks
 *
 * The words superTask and exercise are used interchangeable
 */
function TaskArea({ subtasks, superTaskId }) {
  const listItems = subtasks.map((task) => (
    <Task
      task={task}
      length={subtasks.length}
      superTaskId={superTaskId}
      key={task.id}
    ></Task>
  ));
  return listItems;
}

/*
 * Main component embedded directly at index.js
 * first component in render-root-hierarchy
 */

function App() {
  /*
   * initial value of the exerciseList
   * in a real world application such data would be fetched from a database etc.
   *
   * At this point we work with the mock-data to train the following:
   *  1. propagation of content down to child-components
   *  2. work with hooks
   *  3. reuse of stateful application logic?
   */

  // init the list-state:
  // we'll use that more sensibly later
  const [list, setList] = useState([]);
  if(list.length===0)setList(exercises);


  /*
   * for each exercise we create a title and task-area named TaskArea
   * all wrapped within a styled div
   * TODO: key-id generation: import { nanoid } from "nanoid";
   *
   * Discussion during lecture or exercise:
   * Prop drilling vs. Context: first ask yourself if React-Context is really necessary
   * NOTE: everytime list gets updated, does each child gets rerendered?
   *       how the fiber-recons. is acting here?
   */
  const listItems = list.map((exe) => (
    <StyledDiv key={exe.id}>
      <h2>
        Exercise {exe.id}: {exe.title}{" "}
        {exe.subtasks.every((currentExe) => currentExe.done) && "✔"}
      </h2>
      {exe.subtitle ? <StyledH4>{exe.subtitle}</StyledH4> : ""}

      <TaskArea
        subtasks={exe.subtasks}
        superTaskId={exe.id}
      ></TaskArea>
    </StyledDiv>
  ));
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the exercises of MKG - 2023</h1>
        <p>
          This ExerciseApp is based on the initial project you can get via
          create-react-app and is extended by Christina Mika-Michalski
        </p>
        <p>
          Please note, that this app is still a work in progress. So if you
          don`t like something, feel free to optimize it.
        </p>
        <p>Surprise: some exercises will adress gaps within this version.</p>
      </header>
      <main>{listItems}</main>
    </div>
  );
}

export default App;

import "./App.css";
import React from "react";
import About from "./Modals/About";
import AddTodo from "./Modals/AddTodo";
import TodoDetails from "./Modals/TodoDetails";
const thingsTODO = [
  {
    title: "Get the kids from school",
    description: "The wife will have you feeling sorry for days.",
    category: "Important",
    time: "2023-10-14T13:15:00.000Z",
    completed: false,
    id: 923917346204342,
  },
  {
    title: "100 Push-Ups",
    description: "Breaks your record of 70.",
    category: "Fitness",
    time: "2023-10-17T09:00:00.000Z",
    completed: false,
    id: 942289339826504,
  },
  {
    title: "Say hello to the new neighbors",
    description: "Welcome the new neighbors to the community.",
    category: "Socialise",
    time: "2023-10-18T10:20:00.000Z",
    completed: false,
    id: 456327452864504,
  },
  {
    title: "170 Sit-Ups",
    description: "Break your record of 150.",
    category: "Fitness",
    time: "2023-10-18T10:10:00.000Z",
    completed: false,
    id: 409000230357563,
  },
  {
    title: "Visit Adam",
    description: "You haven't visited Adam for a while.",
    category: "Socialise",
    time: "2023-10-20T11:00:00.000Z",
    completed: false,
    id: 88821504230811,
  },
  {
    title: "Take the kids to visit Sarah",
    description: "The kids haven't seen their aunt in a while. They begged.",
    category: "Socialise",
    time: "2023-10-25T11:00:00.000Z",
    completed: false,
    id: 279568252648479,
  },
  {
    title: "Meet for discussion",
    description: "Your brother wants you to discuss something important with him. You don't know what it is but it seems really important.",
    category: "Important",
    time: "2023-10-27T19:30:00.000Z",
    completed: false,
    id: 984870533753533,
  },
  {
    title: "Buy a new smart watch.",
    description: "You need a new smartwatch as the one you have got damaged. The new Redmi watch 3 active looks good.",
    category: "Gadget",
    time: "2023-10-31T11:40:00.000Z",
    completed: false,
    id: 260294766979495,
  },
  {
    title: "Buy a new HDD",
    description: "You need more storage for your files.",
    category: "Storage",
    time: "2023-11-02T10:45:00.000Z",
    completed: false,
    id: 925992455809737,
  },
  { title: "Plan to work on your smiling.", description: "", category: "Important", time: "2023-11-05T21:30:00.000Z", completed: false, id: 931238659877595 },
];
function App() {
  const [todos, setTodos] = React.useState([]);
  const [currentTodos, setCurrentTodos] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [catOpened, setCatOpened] = React.useState(false);
  const [showAbout, setShowAbout] = React.useState(false);
  const [addTodo, setAddTodo] = React.useState(false);
  const [todoDetails, setTodoDetails] = React.useState(false);
  const [addNew, setAddNew] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [newTodo, setNewTodo] = React.useState({
    heading: "",
    category: "",
    categorySelect: "",
    description: "",
    time: "",
    timeRaw: "",
    done: false,
    index: "",
  });
  const getTodos = async () => {
    return JSON.parse(localStorage.getItem("todos"));
  };
  const deleteTodo = async () => {
    setTodos(() => {
      return todos.filter((item) => {
        return item.id != newTodo.id;
      });
    });
    setCurrentTodos((prev) => prev.filter((item) => item.id != newTodo.id));
    return JSON.parse(localStorage.getItem("todos"));
  };

  React.useEffect(() => {
    if (localStorage.getItem("todos") && localStorage.getItem("todos") != "" && localStorage.getItem("todos") != "[]") {
      setTodos(JSON.parse(localStorage.getItem("todos")));
      setCurrentTodos(JSON.parse(localStorage.getItem("todos")));
      setCategories(() => {
        let a = [...JSON.parse(localStorage.getItem("todos")).map((item) => item.category)];
        let b = a.filter((item, index) => a.indexOf(item) === index);
        let c = JSON.parse(localStorage.getItem("todos")).some((item) => {
          return item.category == "";
        })
          ? [...b, "others"]
          : [...b];
        return c;
      });
    } else {
      setTodos(thingsTODO);
      setCurrentTodos(thingsTODO);
      setCategories(thingsTODO.map((item) => item.category));
      localStorage.setItem("todos", JSON.stringify(thingsTODO));
    }
  }, []);

  return (
    <div style={{ display: "flex", flexFlow: "column", padding: "0px", margin: "0px" }}>
      {addTodo && (
        <AddTodo
          addNew={addNew}
          setAddNew={setAddNew}
          error={error}
          setError={setError}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          categories={categories}
          todos={todos}
          setTodos={setTodos}
          setAddTodo={setAddTodo}
          setCategories={setCategories}
          getTodos={getTodos}
          currentTodos={currentTodos}
          setCurrentTodos={setCurrentTodos}
        />
      )}
      {todoDetails && (
        <TodoDetails
          addNew={addNew}
          setAddNew={setAddNew}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          todos={todos}
          setTodos={setTodos}
          setTodoDetails={setTodoDetails}
          setAddTodo={setAddTodo}
          setError={setError}
          getTodos={getTodos}
          currentTodos={currentTodos}
          setCurrentTodos={setCurrentTodos}
          deleteTodo={deleteTodo}
          setCategories={setCategories}
        />
      )}
      {showAbout && <About setShowAbout={setShowAbout} showAbout={showAbout} />}
      <aside
        id="tab"
        style={{
          position: "fixed",
          height: "100vh",
          width: "20vw",
          backgroundColor: "#009CB8",
          borderTopRightRadius: "3vmin",
          borderBottomRightRadius: "3vmin",
          borderRight: "solid 1vmin #004D5B ",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: "20vw",
            minHeight: "8vh",
            textAlign: "center",
            lineHeight: "8vh",
            fontSize: "4vmin",
            borderBottom: "0.7vmin #004D5B solid",
            display: "flex",
            flexFlow: "column",
          }}
        >
          <span
            onClick={() => {
              setCatOpened(!catOpened);
            }}
            className="tabItem"
            id="categoriesHeading"
            style={{ userSelect: "none", display: "flex", alignItems: "center", paddingLeft: "5.5vmin" }}
          >
            <span style={{ flex: 5 }}> Categories</span>
            <span style={{ fontSize: "3vmin", fontFamily: "cursive", fontWeight: 800, position: "relative", flex: 1, color: "#004e00" }}>
              {catOpened ? `▲` : `▼`}
            </span>
          </span>
          <span
            onClick={() => {
              setTodos(() => {
                let a = [...JSON.parse(localStorage.getItem("todos"))];
                return a;
              });
            }}
            className="catItems"
            style={{ display: catOpened ? "block" : "none" }}
          >
            All
          </span>
          {categories.map((item, index) => {
            return (
              <span
                onClick={() => {
                  setTodos(() => {
                    let a = [...JSON.parse(localStorage.getItem("todos"))];
                    let b = a.filter((itemm) => itemm.category == item);
                    return b;
                  });
                }}
                className="catItems"
                style={{ display: catOpened ? "block" : "none" }}
                key={index}
              >
                {item}
              </span>
            );
          })}
        </div>
        {/* <div
          className="tabItem"
          style={{
            width: "20vw",
            height: "8vh",
            textAlign: "center",
            lineHeight: "8vh",
            fontSize: "4vmin",
            borderBottom: "0.7vmin #004D5B solid",
          }}
        >
          Settings
        </div> */}
        <div
          onClick={() => {
            setShowAbout(true);
          }}
          className="tabItem"
          style={{
            width: "20vw",
            height: "8vh",
            textAlign: "center",
            lineHeight: "8vh",
            fontSize: "4vmin",
            borderBottom: "0.7vmin #004D5B solid",
          }}
        >
          About
        </div>
      </aside>
      <header
        style={{
          marginLeft: "19vw",
          width: "80vw",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          backgroundColor: "#004D5B",
          height: "10vh",
          zIndex: 1,
          marginRight: "0px",
          borderBottom: "0.7vmin #002b33 solid ",
        }}
      >
        <h1 id="heading" style={{ flex: 10, textAlign: "center" }}>
          To-Do App
        </h1>
        <span style={{ flex: 1, alignSelf: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p
            onClick={() => {
              setAddTodo(true);
            }}
            id="add"
          >
            +
          </p>
        </span>
      </header>
      <main
        id="cardContainer"
        style={{
          width: "80vw",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "18.9vw",
          marginTop: "12vh",
          overflow: "scroll",
          overflowX: "hidden",
          paddingBottom: "1vmin",
        }}
      >
        {todos.map((item, index) => {
          const time = new Date(item.time);
          return (
            <div
              key={index}
              className="card"
              onClick={() => {
                setNewTodo({
                  heading: item.title,
                  category: item.category,
                  categorySelect: item.category,
                  description: item.description,
                  time: `${time.getFullYear()}-${time.getMonth() < 9 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1}-${
                    time.getDate() < 10 ? "0" + time.getDate() : time.getDate()
                  }T${time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}`,
                  timeRaw: time,
                  done: item.completed,
                  id: item.id,
                });
                setTodoDetails(true);
                if (item.category != "") {
                  setAddNew(false);
                }
              }}
            >
              <span className="time">
                {`${time.getHours() > 12 ? time.getHours() - 12 : time.getHours()}:${time.getMinutes()}${time.getHours() > 12 ? "PM" : "AM"}`}{" "}
              </span>
              <div className="detail1" style={{ alignItems: item.description ? "flex-start" : "center" }}>
                <div className="detail1-1">
                  <span
                    style={{
                      fontSize: "3.5vmin",
                      fontWeight: 700,
                      color: "hsl(180, 100%, 15%)",
                      textAlign: item.description ? "start" : "center",
                    }}
                    className="title"
                  >
                    {`${item.title.slice(0, 30)}${item.title.length > 30 ? "..." : ""}`}
                    {item.completed && "✔"}
                  </span>
                </div>
                <div className="detail1-2">
                  {item.description && (
                    <span
                      style={{ wordWrap: "break-word", fontSize: "2vmin", fontFamily: "cursive", color: "hsl(210, 100%, 20%)" }}
                      className="description"
                    >{`${item.title.length <= 20 ? item.description.slice(0, 70) : ""}${
                      item.description.length > 70 && item.title.length <= 20 ? "..." : ""
                    }`}</span>
                  )}
                </div>
              </div>
              <div className="detail2" style={{ fontSize: "1.3vmin", fontWeight: 600, fontFamily: "monospace", color: "hsl(159, 100%, 10%)" }}>{`${time
                .toString()
                .slice(0, 3)}, ${time.getDate()}, ${time.toString().slice(4, 7)}, ${time.getFullYear()}`}</div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
export default App;

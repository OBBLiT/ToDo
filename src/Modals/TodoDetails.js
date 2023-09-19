import React from "react";

function TodoDetails({
  todos,
  setTodos,
  categories,
  setCategories,
  setTodoDetails,
  setAddTodo,
  addNew,
  setAddNew,
  error,
  setError,
  newTodo,
  setNewTodo,
  getTodos,
  currentTodos,
  setCurrentTodos,
  deleteTodo,
}) {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 3,
        alignSelf: "center",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <main
        style={{
          position: "fixed",
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(90deg, #aeffb0 10%, #085f6f 90%) ",
          paddingBottom: "5vmin",
          width: "50vw",
          border: "solid #003038 0.7vmin",
          borderRadius: "3vmin",
          gap: "1vmin",
          fontSize: "3.3vmin",
          fontFamily: "fantasy",
          padding: "2vmin",
          fontWeight: "500",
          color: "#00252c",
        }}
        id="addTodo"
      >
        <span
          onClick={() => {
            setTodoDetails(false);
            setError(false);
            setNewTodo({ heading: "", category: "", description: "", time: "", timeRaw: "", categorySelect: "", id: "", done: false });
            setAddNew(true);
          }}
          id="closeANT"
        >
          X
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
            alignSelf: "flex-start",
            marginBottom: "3vmin",
            fontSize: "2vmin",
          }}
        >
          <div id="category" style={{ padding: "0.3vmin", borderRadius: "1vmin", backgroundColor: "#085f6f", color: "#aeffb0 " }}>
            <span style={{ fontWeight: "500", fontSize: "1.4vmin" }}>Category: </span>
            {newTodo.category ? newTodo.category : "none"}
          </div>
          <div id="date" style={{ padding: "0.3vmin", borderRadius: "1vmin", backgroundColor: "#aeffb0", color: "#085f6f" }}>
            <span style={{ fontWeight: "500", fontSize: "1.4vmin" }}> Time: </span>
            {`${newTodo.timeRaw.getDate()}-${newTodo.timeRaw.getMonth() + 1}-${newTodo.timeRaw.getFullYear()}\n${
              newTodo.timeRaw.getHours() > 12 ? newTodo.timeRaw.getHours() - 12 : newTodo.timeRaw.getHours()
            }:${newTodo.timeRaw.getMinutes()}${newTodo.timeRaw.getHours() > 12 ? "PM" : "AM"}`}
          </div>
        </div>
        <div
          style={{
            alignSelf: newTodo.description ? "flex-start" : "center",
            padding: "1vmin",
            borderRadius: "1vmin",
            color: "#003038",
            marginBottom: newTodo.description ? "0px" : "5vmin",
          }}
        >
          <span style={{ fontWeight: "500", fontSize: "1.4vmin", marginRight: "4.4vmin" }}>Title: </span> {newTodo.heading}
        </div>
        {newTodo.description && (
          <div
            style={{
              resize: "none",
              alignSelf: "flex-start",
              padding: "1vmin",
              borderRadius: "1vmin",
              color: "#003038",
              marginBottom: "3vmin",
            }}
            id=""
          >
            <span style={{ fontWeight: "500", fontSize: "1.4vmin" }}>Description: </span>
            {newTodo.description}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%", alignItems: "center" }}>
          <button
            onClick={() => {
              let newItem,
                a = todos.findIndex((item) => item.id == newTodo.id),
                b = [...todos];
              newItem = {
                title: newTodo.heading,
                description: newTodo.description ? newTodo.description : "",
                category: newTodo.category ? newTodo.category : "",
                time: newTodo.timeRaw,
                completed: !newTodo.done,
                id: newTodo.id,
              };
              b[a] = newItem;
              setTodos([...b]);
              localStorage.setItem("todos", JSON.stringify([...b]));
              setNewTodo((prev) => {
                return { ...prev, done: !prev.done };
              });
            }}
            style={{ borderColor: "green", color: "green" }}
          >
            Mark as '{newTodo.done ? "Undone" : "Done"}'
          </button>
          <button
            onClick={() => {
              setAddTodo(true);
              setTodoDetails(false);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteTodo()
                .then((data) => {
                  localStorage.setItem("todos", JSON.stringify(data.filter((item) => item.id != newTodo.id)));
                  return { heading: "", category: "", description: "", time: "", timeRaw: "", categorySelect: "", id: "", done: false };
                })
                .then((data) => {
                  setTodoDetails(false);
                  setError(false);
                  setNewTodo(data);
                  setAddNew(true);
                  return data;
                })
                .then(() => {
                  console.log("Hahahah 123");
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
                });
            }}
            style={{ borderColor: "red", color: "red" }}
          >
            Delete
          </button>
        </div>
      </main>
    </div>
  );
}

export default TodoDetails;

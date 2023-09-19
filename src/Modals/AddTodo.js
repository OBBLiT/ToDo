import React from "react";

function AddTodo({
  todos,
  setTodos,
  categories,
  setCategories,
  setAddTodo,
  addNew,
  setAddNew,
  error,
  setError,
  newTodo,
  setNewTodo,
  getTodos,
  currenTodos,
  setCurrentTodos,
}) {
  const confirmAdd = () => {
    let newItem;
    if (todos.some((item) => item.id == newTodo.id)) {
      if (newTodo.heading && newTodo.time && newTodo.timeRaw) {
        let a = todos.findIndex((item) => item.id == newTodo.id);
        let aa = categories.findIndex((item) => item == newTodo.category);
        newItem = {
          title: newTodo.heading,
          description: newTodo.description ? newTodo.description : "",
          category: newTodo.category ? newTodo.category : "",
          time: newTodo.timeRaw,
          completed: false,
          id: newTodo.id,
        };
        let b = [...todos];
        let ab = [...categories];
        b[a] = newItem;
        ab[aa] = newItem.category;
        setTodos([...b]);
        setNewTodo({ heading: "", category: "", description: "", time: "", timeRaw: "", categorySelect: "" });
        setAddTodo(false);
        setError(false);
        setAddNew(true);
        localStorage.setItem("todos", JSON.stringify([...b]));
        setCategories((prev) => {
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
        setError(true);
      }
    } else {
      if (newTodo.heading && newTodo.time && newTodo.timeRaw) {
        let a = Math.floor(Math.random() * 1000000000000000);
        newItem = {
          title: newTodo.heading,
          description: newTodo.description ? newTodo.description : "",
          category: newTodo.category ? newTodo.category : "",
          time: newTodo.timeRaw,
          completed: false,
          id: todos.some((item) => item.id == a) ? Math.floor(Math.random() * 1000000000000000) : a,
        };
        setTodos([...todos, newItem]);
        setNewTodo({ heading: "", category: "", description: "", time: "", timeRaw: "", categorySelect: "" });
        setAddTodo(false);
        setError(false);
        setAddNew(true);
        getTodos()
          .then((data) => {
            return [...data, newItem];
          })
          .then((data) => {
            localStorage.setItem("todos", JSON.stringify(data));
            return data;
          })
          .then((data) => {
            setCategories((prev) => {
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
      } else {
        setError(true);
      }
    }
  };
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
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          confirmAdd();
        }}
        style={{
          display: "flex",
          position: "fixed",
          flexFlow: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #aeffb0 10%, #085f6f 90%) ",
          paddingBottom: "5vmin",
          width: "50vw",
          border: "solid #003038 0.7vmin",
          borderRadius: "3vmin",
          gap: "1vmin",
        }}
        id="addTodo"
      >
        <span
          onClick={() => {
            setAddTodo(false);
            setError(false);
            setNewTodo({ heading: "", category: "", description: "", time: "", timeRaw: "", categorySelect: "" });
            setAddNew(true);
          }}
          id="closeANT"
        >
          X
        </span>
        <h2 id="ANTHeading">Add New Todo</h2>
        <input
          type="text"
          name="todo-heading"
          value={newTodo.heading}
          style={{ borderColor: error ? "red" : "#00252c" }}
          placeholder="Title/Heading"
          onChange={(e) => {
            setNewTodo({ ...newTodo, heading: e.target.value });
          }}
        />
        <input
          type="datetime-local"
          name="dateTime"
          id="date"
          style={{ borderColor: error ? "red" : "#00252c" }}
          value={newTodo.time}
          onChange={(e) => {
            setNewTodo({ ...newTodo, timeRaw: new Date(e.target.value), time: e.target.value });
          }}
        />
        <div>
          <label htmlFor="catefory" id="catLab">
            Category (optional)
          </label>
          <select
            name="category"
            id="category"
            value={newTodo.categorySelect}
            onChange={(e) => {
              if (e.target.value == "") {
                setAddNew(true);
              } else {
                setAddNew(false);
              }
              setNewTodo({ ...newTodo, category: e.target.value, categorySelect: e.target.value });
            }}
          >
            <option value="">Add New</option>
            {categories.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        {addNew && (
          <input
            type="text"
            name="category"
            value={newTodo.category}
            onChange={(e) => {
              setNewTodo({ ...newTodo, category: e.target.value });
            }}
            placeholder="New Category"
          />
        )}
        <textarea
          style={{ resize: "none" }}
          name="description"
          id=""
          cols="30"
          rows="10"
          placeholder="Description (optional)"
          value={newTodo.description}
          onChange={(e) => {
            setNewTodo({ ...newTodo, description: e.target.value });
          }}
        ></textarea>
        <button>SUBMIT</button>
      </form>
    </div>
  );
}

export default AddTodo;

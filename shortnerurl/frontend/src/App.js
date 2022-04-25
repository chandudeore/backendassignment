import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
  const [urls, getValue] = useState([]);

  const [url, changeUrl] = useState({
    full_url: "",
    short_url: "",
  });
  // console.log(urls)
  // console.log("The usestate url is",url);

  useEffect(() => {
    getData();
  }, [url]);
  const getData = () => {
    console.log("In the getData");
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => getValue(data))
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    // console.log(id,value);
    changeUrl({ ...url, [id]: value });
  };
  const submitData = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/url", {
      method: "POST",
      body: JSON.stringify(url),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    //location.reload();
  };
  const btnUrl = (val) => {
    console.log("In the button url", val);
    fetch(`http://localhost:5000/${val}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("the data is", data[0].full_url);
        window.open(data[0].full_url, "_blank");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <h1>This is heading</h1>
      <form action="" onSubmit={submitData}>
        <input
          type="text"
          placeholder="Enter the url....."
          id="full_url"
          onChange={handleChange}
        />{" "}
        <br /> <br />
        <input
          type="text"
          placeholder="Add the custom url..."
          id="short_url"
          onChange={handleChange}
        />{" "}
        <br /> <br />
        <button id="add_url">Add URL</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Full url</th>
            <th>Short url</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((e) => (
            <tr key={e._id}>
              <td>
                <a href={e.full_url} target="_blank">
                  {e.full_url}
                </a>
              </td>
              <td>
                <button onClick={() => btnUrl(e.short_url)}>
                  {e.short_url}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

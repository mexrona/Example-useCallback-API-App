import React, {useState, useCallback} from "react";
import Child from "./components/Child";

function App() {
    const [id, setId] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");

    const updateOne = () => {
        console.log("Я не мемоизирован");
    };

    const updateTwo = useCallback(() => {
        console.log("Я мемоизирован!");
    }, [postTitle, postBody]);

    const getPost = async () => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const post = await response.json();

        const title = post.title;
        const body = post.body;

        setPostTitle(title);
        setPostBody(body);
    };

    return (
        <div className="App">
            <br />
            <input
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button onClick={getPost}>Получить пост</button>
            <br />
            {postTitle && (
                <p>
                    <b>Название:</b> {postTitle}
                </p>
            )}
            {postBody && (
                <p>
                    <b>Текст:</b> {postBody}
                </p>
            )}
            <Child updateOne={updateOne} updateTwo={updateTwo} />
        </div>
    );
}

export default App;

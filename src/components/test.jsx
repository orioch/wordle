const { useState, useEffect } = React;

const Counter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.addEventListener("keydown", increaseCount);
  }, []);

  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return <div>a</div>;
};

ReactDOM.render(
  <Example title="Example using Hooks:" />,
  document.getElementById("react")
);

import { useEffect } from "react"

function Home() {

  useEffect(() => {
    fetch("http://localhost:5000/", {
      credentials: 'include',
    });
  }, []);
  return (
    <div>
      <h1>Home page</h1>
    </div>
  )
}

export default Home
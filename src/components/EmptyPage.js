import { Link } from "react-router-dom";

function EmptyPage() {
  return (
    <>
      <div>the page doesn't exist</div>
      <Link to="/">go back to home</Link>
    </>
  );
}

export default EmptyPage;

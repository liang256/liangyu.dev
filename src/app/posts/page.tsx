import Container from "@/app/_components/container";
import { NavBar } from "@/app/_components/nav-bar";

export default function PostList() {
  return (
    <Container>
      <NavBar />
      <div>
        <h1>Posts</h1>
        <p>This is the Posts page.</p> 
      </div>
    </Container>
  );
}
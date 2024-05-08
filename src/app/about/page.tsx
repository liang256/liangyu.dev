import Container from "@/app/_components/container";
import { NavBar } from "@/app/_components/nav-bar";
import fs from "fs";
import { join } from "path";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostBody } from "@/app/_components/post-body";


export default async function AboutPage() {
    const fullPath = join(process.cwd(), "_about/about.md");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const markdownContent = await markdownToHtml(fileContents || "");

    return (
        <Container>
            <NavBar />
            <div style={{padding: "41.77% 0 0 0", position: "relative"}}>
                <iframe 
                    src="https://player.vimeo.com/video/412302470?h=d0af2aa869" 
                    style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}} 
                    frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js"></script>
            <PostBody content={markdownContent}/>
        </Container>
    );
}

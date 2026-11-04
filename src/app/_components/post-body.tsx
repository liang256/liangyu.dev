import markdownStyles from "./markdown-styles.module.css";
import { ImageLightbox } from "./image-lightbox";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="mx-auto max-w-[680px]">
      <ImageLightbox>
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </ImageLightbox>
    </div>
  );
}

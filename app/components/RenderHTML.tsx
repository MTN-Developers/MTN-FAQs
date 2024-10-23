import DOMPurify from "dompurify";

export const RenderHTML = ({ htmlContent }: { htmlContent: string }) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

import DOMPurify from "dompurify";

export const RenderHTML = ({ htmlContent }: { htmlContent: string }) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent);

  return (
    <div
      style={{
        fontSize: "18px" /* 18px */,
        lineHeight: "28px" /* 28px */,
        color: "rgb(75 85 99 / var(--tw-text-opacity))",
        paddingBottom: "40px",
        textAlign: "right",
        fontWeight: "400",
        fontFamily: "Poppins, sans-serif",
        direction: "rtl",
      }}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

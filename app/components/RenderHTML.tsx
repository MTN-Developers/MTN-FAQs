export const RenderHTML = ({ htmlContent }: { htmlContent: string }) => {
	return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

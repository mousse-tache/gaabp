import image1 from "@aabp/images/formation2022.webp";

const FrontPageImage = (): React.ReactNode => {
  return (
    <div className="p-4 m-4">
      <img
        className="m-auto rounded-lg"
        src={image1}
        width="600"
        height="450"
        alt="Formation 2022"
      />
    </div>
  );
};

export default FrontPageImage;

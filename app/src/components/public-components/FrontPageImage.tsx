import image1 from "@aabp/images/formation2022.jpeg";

const FrontPageImage = (): React.ReactNode => {
  return (
    <div className="p-4 m-4">
      <img
        className="m-auto rounded-lg"
        src={image1}
        width="600"
        height="338"
        alt="Formation 2022"
        loading="lazy"
      />
    </div>
  );
};

export default FrontPageImage;

import React from "react";
import Layout from "../components/Layout/Layout";
const About = () => {
  return (
    <Layout title={"About us -Pet Shop"}>
      <div className="aboutus">
        <div className="aboutus img">
          <img
            src="images/about.jpg"
            alt="abouts"
            style={{ width: "100%" }}
          ></img>
        </div>
        <div className="aboutus h1">
          <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
          <p className="aboutus p">
            Pet shop là cửa hàng cung cấp các phụ kiện, thức ăn dành cho các
            loại thú cưng tại Việt Nam.
          </p>
          <p className="text-justify mt-2">
            Với slogan “Chúng tôi cũng là những người yêu thú cưng” tiêu chí
            hàng đầu của chúng tôi là về chất lượng sản phẩm
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;

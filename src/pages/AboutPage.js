import Layout from '../components/layout/Layout'

const AboutPage = () => {
  return (
    <Layout>
      <div className="pageNotFound">
        <div className="pnf">
          <div className="pnf-left">
            <h1>About Us</h1>
            {/* <h3>Chhammak Chhallo</h3> */}
            <br />
            <p>Founder & Developer : Prakriti Jha</p>
            <p>
            Welcome to <span style={{color:"#646bd9"}}>Chhammak Chhallo</span>, your ultimate destination for ethnic attire! Our website is proudly created using the MERN Stack by <span style={{color:"#646bd9"}}>Prakriti Jha</span>, ensuring a seamless and modern shopping experience. At <span style={{color:"#646bd9"}}>Chhammak Chhallo</span>, we celebrate the rich diversity of ethnic fashion with a wide range of clothing, footwear, and accessories for women, men, and kids. Whether you're looking for traditional elegance or contemporary ethnic styles, we have something for everyone. Explore our collection and <span style={{color:"#646bd9"}}>embrace the beauty of ethnic fashion with Chhammak Chhallo!</span>
            </p>
          </div>
          <video autoPlay loop muted playsInline>
            <source src="about1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage;

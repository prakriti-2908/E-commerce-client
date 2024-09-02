import Category from '../components/Category';
import Combo from '../components/Combo';
import Hero from '../components/Hero';
import Layout from '../components/layout/Layout'

const HomePage = () => {
  return (
    <Layout>
      <Hero/>
      <Category/>
      <Combo/>
    </Layout>
  )
}

export default HomePage;

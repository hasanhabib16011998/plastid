import { useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const faqItems = [
  {
    question: 'When do I need an Interior Designer?',
    answer: 'You should consider hiring an interior designer whenever you want to enhance the functionality, comfort, or aesthetics of your home or commercial space. Whether you are moving into a new place, renovating, or just looking to refresh your existing space, Plastid Interior and Architecture can help you achieve your vision efficiently and within your budget.',
    open: true,
  },
  {
    question: 'Why do I need an Interior Designer?',
    answer: 'Working with Plastid Interior and Architecture ensures that your space is both beautiful and functional, tailored specifically to your needs and lifestyle. Our professional expertise helps you avoid costly mistakes, maximize your investment, and create a cohesive look. We handle both residential and commercial projects, making the process stress-free and efficient from start to finish.',
  },
  {
    question: 'Why do you have a design fee and purchasing fee on the project?',
    answer: 'At Plastid Interior and Architecture, we charge a design fee of 20 BDT per square foot for our 3D design services. This fee secures your place in our design process and ensures we can dedicate time and resources to your project. If you choose us to execute the project after finalizing the design, we deduct the total design fee from your final project bill as a discount. This way, the design fee acts as a security deposit so we can deliver the best possible design for you.',
  },
  {
    question: 'What should I have at our first meeting for my project?',
    answer: 'You don\'t need to bring anything specific to the first meeting. Just share your vision, requirements, and any ideas you have for your space. Our team at Plastid Interior and Architecture will guide you through the rest of the process and help you clarify your goals.',
  },
  {
    question: 'How much will my interior design project cost?',
    answer: 'The cost depends on the size and complexity of your project. We provide transparent unit pricing based on square footage for different work scopes. After an initial consultation and design proposal, you will receive a detailed quotation. If you proceed with us for the full project, your design fee will be credited back as a discount in the final bill.',
  },
  {
    question: 'How long will it take to design and build my project?',
    answer: 'The timeline for each project varies depending on its volume, complexity, and your specific requirements. We always strive to deliver within agreed deadlines and keep you updated throughout the process with regular progress reports.',
  },
  {
    question: 'Do you provide services throughout Bangladesh?',
    answer: 'Yes, Plastid Interior and Architecture provides interior design and project execution services all across Bangladesh, for both residential and commercial clients.',
  },
  {
    question: 'What makes Plastid Interior and Architecture different?',
    answer: 'We offer flexible, affordable, and premium design solutions tailored to your needs. Our continuous project monitoring and regular client updates ensure transparency and peace of mind throughout your project. Plus, our unique design fee refund policy means you only pay for design if you don\'t choose us for project execution!',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="boxed_wrapper">
      <PIALoader />
      <Header />

      <Breadcrumb
        style="style2"
        title="Find Answers to Your Queries"
        subtitle="Customers FAQ's"
        bgImage="/images/resources/breadcrumb-bg-2.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: "FAQ's" },
        ]}
      />

      <section className="faq-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="faq-content-box">
                <div className="accordion-box">
                  {faqItems.map((item, i) => (
                    <div key={i} className="accordion accordion-block">
                      <div
                        className={`accord-btn${openIndex === i ? ' active' : ''}`}
                        onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                        style={{ cursor: 'pointer' }}
                      >
                        <h4>{item.question}</h4>
                      </div>
                      <div
                        className={`accord-content${openIndex === i ? '' : ' collapsed'}`}
                        style={{
                          maxHeight: openIndex === i ? '500px' : '0',
                          overflow: 'hidden',
                          transition: 'max-height 0.4s ease',
                        }}
                      >
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

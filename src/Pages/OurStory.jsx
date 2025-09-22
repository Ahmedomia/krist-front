import { useState, useEffect } from "react";
import { CheckCircle, Heart, Award, Users } from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function OurStory() {
  const [activeValue, setActiveValue] = useState(0);
  const [visibleMilestones, setVisibleMilestones] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleMilestones((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.3 }
    );

    const milestoneElements = document.querySelectorAll("[data-milestone]");
    milestoneElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Passion for Fashion",
      description:
        "Every piece in our collection is carefully curated with love and attention to detail.",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description:
        "We partner with the finest designers and artisans to bring you exceptional quality.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "Our customers are at the heart of everything we do, building lasting relationships.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Founded",
      description:
        "Krist was born from a vision to make luxury fashion accessible",
    },
    {
      year: "2020",
      title: "First Store",
      description: "Opened our flagship boutique in the fashion district",
    },
    {
      year: "2022",
      title: "Online Launch",
      description:
        "Launched our digital platform to reach fashion lovers worldwide",
    },
    {
      year: "2024",
      title: "Sustainable Future",
      description: "Committed to ethical and sustainable fashion practices",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <section className="bg-gradient-subtle py-20">
        <div className="container-max section-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover the passion, dedication, and vision behind Krist Fashion.
              From humble beginnings to becoming a trusted name in elegant
              fashion.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 p-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Crafting Timeless Elegance
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Founded in 2018, Krist began as a dream to create a fashion
                brand that celebrates the unique beauty and confidence of every
                individual. We believe that fashion is more than just
                clothing—it's a form of self-expression, a way to tell your
                story.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our journey started with a simple mission: to curate collections
                that blend timeless elegance with contemporary style, making
                luxury fashion accessible to everyone who appreciates quality
                and craftsmanship.
              </p>
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">
                  Sustainably sourced materials
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">
                  Ethically made by skilled artisans
                </span>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/download (1).jpg"
                alt="Krist fashion store interior"
                className="w-full h-[500px] object-cover rounded-lg shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-muted/30">
        <div className="container-max section-padding p-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make and every
              relationship we build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`text-center group cursor-pointer transition-all duration-500 ${
                  activeValue === index ? "scale-105" : ""
                }`}
                onMouseEnter={() => setActiveValue(index)}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-300 ${
                    activeValue === index
                      ? "bg-primary text-primary-foreground shadow-elegant"
                      : "bg-primary/10 text-primary group-hover:bg-primary/20"
                  }`}
                >
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-8">
            <div className="relative">
              <img
                src="/assets/download.jpg"
                alt="Our creative team"
                className="w-full h-[400px] object-cover rounded-lg shadow-elegant"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Behind every beautiful piece in our collection is a team of
                passionate individuals who share a love for fashion, creativity,
                and excellence. From our talented designers to our dedicated
                customer service team, everyone at Krist is committed to
                bringing you the best.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our diverse team brings together years of experience in fashion
                design, retail, and customer service, all united by a shared
                vision of making luxury fashion accessible and enjoyable for
                everyone.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">
                    15+ Fashion Experts
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">
                    Global Design Network
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">
                    Customer-Focused Approach
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-muted/30">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key milestones that have shaped Krist into the brand we are today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  visibleMilestones.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                data-milestone
                data-index={index}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full text-xl font-bold mb-4 transform hover:scale-110 transition-transform">
                  {milestone.year.slice(-2)}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {milestone.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

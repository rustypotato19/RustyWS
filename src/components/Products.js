import React, { useState } from "react";

const Products = () => {
  const [showMore, setShowMore] = useState({});
  const [showingMore, setShowingMore] = useState(false);

  const toggleShowMore = (index) => {
    setShowingMore(!showingMore);
    setShowMore((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <section className="mx-auto flex justify-center items-center w-full min-h-[70dvh] h-fit mt-4 mb-10">
      <div className="flex justify-center items-center flex-col gap-6 lg:gap-12 w-[90vw] lg:w-[70vw] h-full">
        <div className="flex justify-center items-center flex-col mb-8">
          <h1 className="text-4xl font-bold text-rws-dark-blue mb-1 text-center">
            Our Products and Services
          </h1>
          <p className="text-xs lg:text-md opacity-85 w-[90dvw] lg:w-4/6 text-center">
            * All displayed prices are a guideline and are likely to decrease or
            increase based on requirements, time constraints, and other factors.
            No additional charges shall be incurred for limitations on our
            behalf such as time taken. If you're unsure about anything please be
            sure to contact us.
          </p>
        </div>

        {/* Products List */}
        {[
          {
            title: "Small Web Development ~ £100+",
            description:
              "A small web development project typically takes less than a week to complete and includes a simple front page, basic hosting, and routing setup. Perfect for small businesses or personal projects looking for a professional online presence without too many complexities. ",
            extra:
              "Default framework used is React.js (frontend) and Node.js (backend). Other frameworks are available and can be discussed upon request.We may provide the hosting at no extra cost and with full customisability. We may provide any additional guidance on setting up your website and processes such as acquiring and managing a domain name - we can also handle this service for you at no extra charge. At a slight additional cost we may provide priority website and server maintenance, however, this regular service is always provided free of charge.",
          },
          {
            title: "Large Web Development ~ £500+",
            description:
              "Large web development projects are more complex, typically taking more than a week. They can include features such as user logins, databases, and dynamic content. ",
            extra:
              "We may provide the hosting at no extra cost and with full customisability. We may provide any additional guidance on setting up your website and processes such as acquiring and managing a domain name - we can also handle this service for you at no extra charge. At a slight additional cost we may provide priority website and server maintenance, however, this regular service is always provided free of charge.Ideal for businesses needing an interactive website or a customized solution tailored to their specific needs. Default framework used is React.js (frontend) and Node.js (backend). Other frameworks are available and can be discussed upon request.",
          },
          {
            title: "Small Plugin Development ~ £50+",
            description:
              "This service is ideal for simple plugin requirements, such as adding basic commands or effects to a Minecraft server. ",
            extra:
              "Development time is typically less than three days, making it perfect for those looking for a quick enhancement to their existing setup.",
          },
          {
            title: "Large Plugin Development ~ £300+",
            description:
              "Large plugin development projects are designed for more advanced features, such as creating custom gameplay mechanics, integrating third-party APIs, or ",
            extra:
              "enhancing server-wide functionality. These projects take more than three days to develop and are perfect for ambitious server owners looking to offer a unique experience.",
          },
          {
            title: "Small Independent Project ~ £50+",
            description:
              "These projects are small in scope and typically completed within three days. Examples include building a simple calculator, a ",
            extra:
              "login system using OOP principles, or small games like Naughts and Crosses. Suitable for clients looking for quick, standalone functionalities.",
          },
          {
            title: "Large Independent Project ~ £500+",
            description:
              "Large independent projects involve complex, custom solutions. Examples include developing a booking system, creating a custom ",
            extra:
              "database solution, or building an advanced application. These projects take more than three days to complete and offer tailored features for unique requirements ",
          },
        ].map((product, index) => (
          <div
            key={index}
            className={`w-[95vw] lg:w-full h-fit text-center lg:text-left gap-4 flex flex-col justify-center items-center lg:justify-start lg:items-start ${
              index % 2 === 0 ? "lg:self-start" : "lg:self-end"
            }`}
          >
            <h1 className="text-3xl font-bold text-rws-dark-blue">
              {product.title}
            </h1>
            <div className="border-rws-dark-blue border-t-2 w-3/6 mb-2"></div>
            <div
              style={{
                maxHeight: showMore[index] ? "1000px" : "137px",
                overflow: "hidden",
                transition: "max-height 0.5s ease-in-out",
              }}
            >
              <p className="text-lg w-full lg:w-4/6">
                {product.description + " " + product.extra}
              </p>
            </div>
            {product.extra && (
              <button
                onClick={() => toggleShowMore(index)}
                className="text-rws-dark-blue font-semibold cursor-pointer hover:opacity-80 transition-all duration-300"
              >
                {showMore[index] ? "Read Less" : "...Read More"}
              </button>
            )}
            <a
              href="/products"
              className="text-rws-dark-blue font-bold disabled cursor-not-allowed pointer-events-none line-through"
            >
              {">"} See Examples {"<"}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;

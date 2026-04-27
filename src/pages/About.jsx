const aboutcard = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1661349604444-3c8416308121?q=80&w=1021&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Limited Seating",
    description: " A small number of tables. A focused experience. Reservations are strongly recommended.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudCUyMGtpdGNoZW58ZW58MHx8MHx8fDA%3D",
    title: "Signatures",
    description:
      "A selection of dishes that define Harlan’s — executed with precision, built on exceptional ingredients, and remembered long after the last bite.",
  },
];

export default function About() {
  return (
    <div>
      <div className="about-container container">
        <h1 className="text-center display-4 fw-bold">Harlan's Pattaya</h1>
        <p className="text-warning text-center">Where Dining Is An Experience</p>

        <div className="about-card-container">
          <div className="row  row-cols-1 row-cols-lg-2">
            {aboutcard.map((item, index) => {
              return (
                <div className="col" key={item.index}>
                  <div className="card h-100">
                    <img src={item.image} alt={item.title} className="card-img-top" style={{ height: "400px", objectFit: "cover" }} />
                    <div className="card-body">
                      <h5 className="text-center">{item.title}</h5>
                      <p className="text-center">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="text-center about-daning my-5">
        <h1 className="display-3 fw-bold text-white">The Dining Experience</h1>
        <p className="text-white fs-5">
          At the heart of Harlan’s lies a refined culinary journey — where every dish is executed with precision and every moment is thoughtfully
          curated. From expertly prepared steaks to elegant accompaniments, each element is designed to deliver a seamless and memorable experience
        </p>
      </div>

      <div className="about-text-container">
        <div className="container">
          <h2 className="text-center my-5 text-warning">Frequently Asked Questions</h2>
          <div className="mb-4">
            <h5 className="text-warning">What type of cuisine do you offer?</h5>
            <p>
              We specialize in a refined steakhouse experience, centered around premium Wagyu Beef and elevated through classical and modern culinary
              techniques.
            </p>
          </div>
          <div className="mb-4">
            <h5 className="text-warning">Do you have vegetarian options?</h5>
            <p>Yes, we provide a variety of vegetarian dishes that reflect the vibrant flavors of our Latin-inspired menu.</p>
          </div>{" "}
          <div className="mb-4">
            <h5 className="text-warning">What payment methods are accepted?</h5>
            <p>We accept cash, Thai bank transfer, and QR code payments.</p>
          </div>{" "}
          <div className="mb-4">
            <h5 className="text-warning">Do you accept reservations?</h5>
            <p>Yes, we highly recommend making a reservation to ensure availability and the best dining experience.</p>
          </div>{" "}
          <div className="mb-4">
            <h5 className="text-warning">What are your opening hours?</h5>
            <p>Tuesday – Saturday: 5 PM – 10 PM</p>
            <p> Sunday: 10 AM – 10 PM</p>
            <p>Closed every Monday.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

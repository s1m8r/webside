import Design from "@/components/layout/design";

const About = () => {
  return (
    <Design>
      <div className="max-w-2xl mx-auto px-4 py-16 text-left">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 leading-relaxed">
          We connect shoppers with trusted stores in one place. Browse products,
          discover new stores, and find what you're looking for — all in one
          simple platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-12 mb-3">
          Our mission
        </h2>
        <p className="text-gray-600 leading-relaxed">
          We built this platform to make shopping simple — one place to explore
          every store, compare products, and shop with confidence.
        </p>
      </div>
    </Design>
  );
};

export default About;

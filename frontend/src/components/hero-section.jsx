import Hero from "../assets/hero.png";

const HeroSection = () => {
  return (
    <section className="mx-auto my-10 max-w-7xl rounded-xl bg-gradient-to-r from-green-200 to-white px-6 py-12 shadow-md md:flex md:items-center md:justify-between md:px-12 lg:px-24 lg:py-20">
      <div className="space-y-4 md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
          Fast Delivery
        </h1>
        <p className="text-gray-600 md:text-lg">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit a
          voluptate reprehenderit neque eius temporibus voluptates ipsam
          tempore! Dolorem, error.
        </p>
        <button className="focus:ring-opacity-50 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none">
          Shop Now
        </button>
      </div>
      <div className="mt-8 md:mt-0 md:w-1/2">
        <img
          src={Hero}
          alt="Fast Delivery"
          className="mx-auto w-full max-w-md"
        />
      </div>
    </section>
  );
};
export default HeroSection;
